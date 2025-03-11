import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { getDBUser } from "@/app/actions";

export default async function PrivatePage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }
    const dbUser = await getDBUser();
    if(dbUser == null || dbUser.role !== 'admin') {
        redirect('/');
    }

    return <p>Hello {data.user.email}</p>
}