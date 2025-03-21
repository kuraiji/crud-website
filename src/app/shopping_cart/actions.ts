'use server'
import { TransactionRequestType } from "@/lib/definitions";
import { redirect } from "next/navigation";

export async function putTransaction(transaction: TransactionRequestType) {
    try {
        return await fetch(`${process.env.NEXT_PUBLIC_CRUD_URL}/transaction`,
            {
                method: 'POST',
                cache: 'no-store',
                headers: {
                    "authorizationToken": `${process.env.NEXT_PUBLIC_CRUD_ANON_KEY}`,
                },
                body: JSON.stringify(transaction)
            }).then(async function (res) {
            if(res.status === 400 || res.status === 501) {
                throw new Error("Uh oh! Something went wrong");
            }
            return res.status;
        });
    }
    catch (e) {
        console.log("Error: ", e);
        redirect('/error')
    }
}