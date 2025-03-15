'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import {FormState, LoginFormSchema } from "@/lib/definitions";

export async function improved_login(state: FormState, formData: FormData) {
    const validateFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });
    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
        }
    }

    const supabase = await createClient()
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return {
                message: error.message
            }
    }
    else {
        revalidatePath('/', 'layout')
        redirect('/')
    }
}