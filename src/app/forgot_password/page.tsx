import {ForgotPasswordForm} from "@/app/forgot_password/forgot_password";
import type {Metadata} from "next";
export const metadata: Metadata = {
    title: "Kuraiji.me: Forgot Password",
    description: "The page to reset your password",
}

export default function ForgotPasswordPage() {
    return (
        <div className="flex w-full items-center justify-center p-6 md:p-10"
             style={{"height": "calc(100vh - 80px)"}}
        >
            <div className="w-full max-w-sm">
                <ForgotPasswordForm/>
            </div>
        </div>
    )
}