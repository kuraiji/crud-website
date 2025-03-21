import type {Metadata} from "next";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {getDBUser, getTransaction} from "@/app/actions";
import TransactionPage from "@/app/transactions/transaction_page"

export const metadata: Metadata = {
    title: "Kuraiji.me: Transaction Page",
    description: "The transaction page",
}

export default async function TransactionServerPage() {
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
    if(!transaction || transaction.length === 0) {
        redirect('/');
    }

    return (
        <TransactionPage initalTransaction={transaction!} />
    );
}