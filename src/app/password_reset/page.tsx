import { PasswordResetForm } from "@/app/password_reset/password_reset";
import { redirect } from 'next/navigation'
import type {Metadata} from "next";
import {createClient} from "@/utils/supabase/server";

export const metadata: Metadata = {
    title: "Kuraiji.me: Password Reset",
    description: "The password reset page",
}

type PasswordResetPageProps = {
    searchParams: Promise<{code?: string}>
}

export default async function PasswordResetPage({searchParams}: PasswordResetPageProps) {
    const { code } = await searchParams;
    const supabase = await createClient()

    const { data } = await supabase.auth.getUser();
    if(data?.user) {
        redirect('/');
    }
    if(!code) {
        redirect('/error')
    }

    return (
        <div className="flex w-full items-center justify-center p-6 md:p-10"
             style={{"height": "calc(100vh - 80px)"}}
        >
            <div className="w-full max-w-sm">
                <PasswordResetForm property={code}/>
            </div>
        </div>
    );
}