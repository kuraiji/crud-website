'use server'
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {SignupFormState, SignupFormSchema} from "@/lib/definitions";

export async function improved_signup(state: SignupFormState, formData: FormData) {
    const validateFields = SignupFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        firstname: formData.get('firstname'),
    });
    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    const supabase = await createClient();
    const inputData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data, error } = await supabase.auth.signUp(inputData)
    if(error) {
        return {
            message: error.message,
        }
    }
    else if(!data.user || !data.user.id) {
        return {
            message: "Error in signing in, please try again later",
        }
    }

    if(!data.user.identities || data.user.identities.length <= 0) {
        revalidatePath('/', 'layout')
        redirect('/')
    }

    try {
        return await fetch(`${process.env.NEXT_PUBLIC_CRUD_URL}/user`,
            {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    "authorizationToken": `${process.env.NEXT_PUBLIC_CRUD_ANON_KEY}`,
                },
                body: JSON.stringify({
                    id: `${data.user.id}`,
                    firstname: formData.get('firstname') as string,
                    role: "user"
                })
            }).then(async function (res) {
            if (res.status === 400) throw new Error(res.statusText);
        });
    }
    catch (fetchError) {
        if(data.user && data.user.id) {
            const elevatedSupabase = await createClient(true)
            await elevatedSupabase.auth.admin.deleteUser(data.user.id)
            return {
                message: `${fetchError}`
            }
        }
    } finally {
        revalidatePath('/', 'layout')
        redirect('/?check_email')
    }
}