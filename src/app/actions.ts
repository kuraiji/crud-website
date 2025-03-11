'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {createClient} from '@/utils/supabase/server'


//Supabase
export async function signout() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        await supabase.auth.signOut();
    }

    revalidatePath('/', 'layout')
    redirect('/')
}


//DynamoDB
type DBUser = {
    id: string,
    role: string,
}

export async function getDBUser() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        try {
            return await fetch(`${process.env.NEXT_PUBLIC_CRUD_URL}/user/${user.id}`,
                {
                    method: 'GET',
                    cache: 'no-store',
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
    }
    return null;
}