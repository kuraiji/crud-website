import { createClient } from '@/utils/supabase/server'
import SettingsPage from "@/app/account/account";
import {redirect} from "next/navigation";
import {getDBUser, getTransaction} from "@/app/actions";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Kuraiji.me: Account Page",
    description: "The account page",
}

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

    const transaction = await getTransaction(user.id);

    return <SettingsPage user={user} dbUser={dbUser} transactions={transaction} />
}