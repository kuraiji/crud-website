'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Dispatch, SetStateAction } from "react";
import { NameFormSchema, NameFormState } from "@/lib/definitions";

export async function update_user(state: NameFormState, formData: FormData) {
    const validateFields = NameFormSchema.safeParse({
        firstname: formData.get('firstname'),
    });
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    const supabase = await createClient();
    const {data, error} = await supabase.auth.getUser();
    if (error || !data || !data.user) {
        return {
            message: "Failed to validate user, please try again later.",
        }
    }

    try {
        return await fetch(`${process.env.NEXT_PUBLIC_CRUD_URL}/user`,
            {
                method: 'PATCH',
                cache: 'no-cache',
                headers: {
                    "authorizationToken": `${process.env.NEXT_PUBLIC_CRUD_ANON_KEY}`,
                },
                body: JSON.stringify({
                    id: data.user.id,
                    firstname: formData.get('firstname') as string,
                })
            }).then(async function (res) {
            if (res.status === 400) throw new Error(res.statusText);
        });
    }
    catch (fetchError) {
        return {
            message: "Failed to update user, please try again later.",
        }
    } finally {
        revalidatePath('/account', 'layout')
        redirect('/account')
    }
}
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

export async function deleteAccount(onError: Dispatch<SetStateAction<{
    message: string | undefined,
    disabled: boolean,
}>>) {
    onError({
        message: "",
        disabled: true
    });

    const supabase = await createClient(true)

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        onError({
            message: "Error in checking user status, please try again later",
            disabled: false
        });
        return;
    }

    const userid = user.id;
    await supabase.auth.signOut();
    const supaRes = await supabase.auth.admin.deleteUser(userid, true);

    if(supaRes.error) {
        onError({
            message: `${supaRes.error.message}, please try again later`,
            disabled: false
        });
        return;
    }

    try {
        return await fetch(`${process.env.NEXT_PUBLIC_CRUD_URL}/user/${userid}`,
            {
                method: 'DELETE',
                cache: 'no-store',
                headers: {
                    "authorizationToken": `${process.env.CRUD_SERVICE_ROLE_KEY}`,
                }
            }).then(async function(res) {
                if (res.status === 400) throw new Error(res.statusText);
                await supabase.auth.admin.deleteUser(userid);
            });
    }
    catch (fetchError) {
        await supabase.from('users').update({deleted_at: null}).eq('id', userid);
        onError({
            message: `${fetchError}, please try again later`,
            disabled: false
        });
        return;
    }
    finally {
        revalidatePath('/', 'layout')
        redirect('/')
    }
}