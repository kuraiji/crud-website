'use server'
import {createClient} from '@/utils/supabase/server'
import {
    CredentialError,
    ShoppingCartRequestType,
    ShoppingCartResponseType,
    ShoppingCartType, TransactionResponseType,
    TransactionResponseTypeStringed
} from "@/lib/definitions";
import {redirect} from "next/navigation";
import {Item, ItemStringed} from "@/app/items/[id]/actions";

//DynamoDB
export type DBUser = {
    id: string,
    role: string,
    firstname: string
}

export async function getDBUser(props: {userid: string | undefined} | null = null) {
    let id: string;
    if(!props || !props.userid){
        const supabase = await createClient()

        const {
            data: { user },
        } = await supabase.auth.getUser();
        id = user!.id
    }
    else {
        id = props.userid;
    }

    try {
        return await fetch(`${process.env.NEXT_PUBLIC_CRUD_URL}/user/${id}`,
            {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    "authorizationToken": `${process.env.NEXT_PUBLIC_CRUD_ANON_KEY}`,
                }
            }).then(async function (res) {
            const data: DBUser = await res.json();
            return data;
        });
    }
    catch (e) {
        console.log("Error: ", e);
    }
    return null;
}

export async function getShoppingCart(props: {userid: string | undefined} | null = null) {
    let id: string;
    if(!props || !props.userid){
        const supabase = await createClient()

        const {
            data: { user },
            error
        } = await supabase.auth.getUser();
        if(error){
            throw new CredentialError(error.message);
        }
        id = user!.id
    }
    else {
        id = props.userid;
    }

    try {
        return await fetch(`${process.env.NEXT_PUBLIC_CRUD_URL}/shoppingcart/${id}`,
            {
                method: 'GET',
                cache: 'no-store',
                headers: {
                    "authorizationToken": `${process.env.NEXT_PUBLIC_CRUD_ANON_KEY}`,
                },
            }).then(async function (res) {
                if(res.status === 400 || res.status === 502) {
                    return null;
                }
                const json: ShoppingCartResponseType = await res.json();
                const data: ShoppingCartRequestType = {
                    userid: json.userid,
                    cart: json.cart.map((item) => {
                        return {
                            itemid: item.itemid,
                            itemname: item.itemname,
                            price: parseFloat(item.price),
                            imageid: item.imageid,
                            color: item.color,
                        } as ShoppingCartType
                    })
                }
                return data;
        });
    }
    catch (e) {
        console.log("Error: ", e);
    }
    return null;
}

export async function putShoppingCart(props:
                                          {
                                              userid: string | undefined
                                              shoppingCart: ShoppingCartRequestType | undefined
                                          } | null = null
) {
    let id: string;
    if(!props || !props.userid){
        const supabase = await createClient()

        const {
            data: { user },
        } = await supabase.auth.getUser();
        id = user!.id
    }
    else {
        id = props.userid;
    }

    try {
        return await fetch(`${process.env.NEXT_PUBLIC_CRUD_URL}/shoppingcart`,
            {
                method: 'PUT',
                cache: 'no-store',
                headers: {
                    "authorizationToken": `${process.env.NEXT_PUBLIC_CRUD_ANON_KEY}`,
                },
                body: JSON.stringify({
                    userid: id,
                    cart: props?.shoppingCart ? props.shoppingCart.cart : [],
                })
            }).then(async function (res) {
                if(res.status === 400) {
                    throw new Error("Uh oh! Something went wrong");
                }
        });
    }
    catch (e) {
        console.log("Error: ", e);
        redirect('/error')
    }
}

export async function getTransaction(userid: string, page: number = 0) {
    try {
        return await fetch(`${process.env.NEXT_PUBLIC_CRUD_URL}/transactions/${userid}?page=${page}`,
            {
                method: 'GET',
                cache: 'no-store',
                headers: {
                    "authorizationToken": `${process.env.NEXT_PUBLIC_CRUD_ANON_KEY}`,
                },
            }).then(async function (res) {
            if(res.status === 400 || res.status === 502) {
                return null;
            }
            const json_data: TransactionResponseTypeStringed = await res.json();
            const data: TransactionResponseType = json_data.map((transaction) => {
                return {
                    userid: transaction.userid,
                    tax: parseFloat(transaction.tax),
                    shipping: parseFloat(transaction.shipping),
                    subtotal: parseFloat(transaction.subtotal),
                    timestamp: transaction.timestamp,
                    cart: transaction.cart.map((cart) => {
                        return {
                            itemid: cart.itemid,
                            itemname: cart.itemname,
                            imageid: cart.imageid,
                            color: cart.color,
                            price: parseFloat(cart.price),
                        }
                    })
                }
            })
            return data;
        });
    }
    catch (e) {
        console.log("Error: ", e);
    }
    return null;
}

export async function getItems() {
    try {
        return await fetch(`${process.env.NEXT_PUBLIC_CRUD_URL}/items`,
            {
                method: 'GET',
                cache: 'force-cache',
                headers: {
                    "authorizationToken": `${process.env.NEXT_PUBLIC_CRUD_ANON_KEY}`,
                },
                next:{revalidate: 60}
            }).then(async function (res) {
            if(res.status === 400 || res.status === 502) {
                return null;
            }
            const json_data: ItemStringed[] = await res.json();
            const data: Item[] = json_data.map((item) => {
                return {
                    id: item.id,
                    itemname: item.itemname,
                    imageid: item.imageid,
                    description: item.description,
                    category: item.category,
                    subcategory: item.subcategory,
                    color: item.color,
                    price: parseFloat(item.price),
                    ratingnum: parseFloat(item.ratingnum),
                    rating: parseFloat(item.rating)
                }
            });
            return data;
        });
    }
    catch (e) {
        console.log("Error: ", e);
    }
    return null;
}