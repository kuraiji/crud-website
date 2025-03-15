'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import {ResetPasswordFormState, ResetPasswordFormSchema } from "@/lib/definitions";

export async function reset_password(state: ResetPasswordFormState, formData: FormData) {
    const validateFields = ResetPasswordFormSchema.safeParse({
        password: formData.get('password'),
    });
    if(!validateFields.success)
    {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            code: state ? state.code : "",
        }
    }

    const supabase = await createClient();
    const authRes = await supabase.auth.exchangeCodeForSession(state!.code)
    if(authRes.error) {
        return {
            message: authRes.error.message,
            code: state ? state.code : "",
        }
    }
    const data = {password: formData.get('password') as string};
    const { error } = await supabase.auth.updateUser(data);

    if(error) {
        return {
            message: error.message,
            code: state ? state.code : "",
        }
    }
    else {
        revalidatePath('/', 'layout')
        redirect('/')
    }
}