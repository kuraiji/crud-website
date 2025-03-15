import {ForgotPasswordForm} from "@/app/forgot_password/forgot_password";
import { headers } from "next/headers";
import type { Metadata } from "next";
import {redirect} from "next/navigation";
import {createClient} from "@/utils/supabase/server";

export const metadata: Metadata = {
    title: "Kuraiji.me: Forgot Password",
    description: "The page to reset your password",
}

export default async function ForgotPasswordPage() {
    const headerList = await headers();
    if(!headerList){
        redirect('/error');
    }
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if(data?.user) {
        redirect('/');
    }

    const fullUrl = headerList.get("x-forwarded-proto") + "://" + headerList.get("host");
    return (
        <div className="flex w-full items-center justify-center p-6 md:p-10"
             style={{"height": "calc(100vh - 80px)"}}
        >
            <div className="w-full max-w-sm">
                <ForgotPasswordForm property={fullUrl}/>
            </div>
        </div>
    )
}