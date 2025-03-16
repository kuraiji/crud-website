import { createClient } from '@/utils/supabase/server'
import SettingsPage from "@/app/account/account";
import {redirect} from "next/navigation";
import AccountForm from "@/app/account/account-form";

export default async function Account() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if(!user) {
        redirect('/');
    }

    //return <SettingsPage user={user}/>
    return <AccountForm user={user}/>
}