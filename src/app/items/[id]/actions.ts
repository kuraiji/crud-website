'use server'

export type Item = {
    id: string,
    itemname: string,
    description: string,
    price: number,
    rating: number,
    ratingnum: number,
    category: string,
    subcategory: string,
    imageid: string,
    color: string[] | null
}

export type ItemStringed = {
    id: string,
    itemname: string,
    description: string,
    price: string,
    rating: string,
    ratingnum: string,
    category: string,
    subcategory: string,
    imageid: string,
    color: string[] | null
}

export async function getItemById(id: string) {
    try {
        return await fetch(`${process.env.NEXT_PUBLIC_CRUD_URL}/item/${id}`,
            {
                method: 'GET',
                cache: 'force-cache',
                headers: {
                    "authorizationToken": `${process.env.NEXT_PUBLIC_CRUD_ANON_KEY}`,
                },
                next: { revalidate: 60}
            }).then(async function (res) {
                if (res.status === 400) throw new Error(res.statusText);
                const data: Item  = await res.json();
                return data;
            });
    }
    catch (e) {
        console.log("Error: ", e);
    }
    return null;
}

