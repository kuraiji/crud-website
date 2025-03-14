import {LoginForm} from "@/app/login/login";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Kuraiji.me: Login",
    description: "The login page",
}

export default function LoginPage() {
    return (
        <div className="flex w-full items-center justify-center p-6 md:p-10"
             style={{"height": "calc(100vh - 80px)"}}
        >
            <div className="w-full max-w-sm">
                <LoginForm/>
            </div>
        </div>
    )
}