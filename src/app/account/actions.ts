'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function deleteAccount() {
    const supabase = await createClient(true)

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        const userid = user.id
        await supabase.auth.signOut();
        await supabase.auth.admin.deleteUser(userid)
    }

    revalidatePath('/', 'layout')
    redirect('/')
}