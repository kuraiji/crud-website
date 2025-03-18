'use server'
import {createClient} from '@/utils/supabase/server'
import {ShoppingCartType} from "@/lib/definitions";
import {redirect} from "next/navigation";

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
        } = await supabase.auth.getUser();
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
                if(res.status === 400) {
                    return null;
                }
                const data: ShoppingCartType = await res.json();
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
                                              shoppingCart: ShoppingCartType | undefined
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