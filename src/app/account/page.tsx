import { createClient } from '@/utils/supabase/server'
import SettingsPage from "@/app/account/account";
import {redirect} from "next/navigation";
import {getDBUser} from "@/app/actions";

export default async function Account() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if(!user || !user.id) {
        redirect('/');
    }

    const dbUser = await getDBUser({userid: user.id});

    if(!dbUser) {
        redirect('/');
    }

    return <SettingsPage user={user} dbUser={dbUser}/>
}