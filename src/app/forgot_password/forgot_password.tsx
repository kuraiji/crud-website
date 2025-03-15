'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forgot_password } from "./actions";
import { useActionState } from 'react'
import Link from 'next/link'

export function ForgotPasswordForm({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"div">) {
    const [state, action, pending] = useActionState(forgot_password, undefined);
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your email below to get a password reset
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            {state?.errors?.email && <p className="text-red-700">{state.errors.email}</p>}
                            <Button formAction={action} disabled={pending} type="submit" className="w-full">
                                Send Password Reset Email
                            </Button>
                            <div className="text-red-700 flex justify-center items-center">
                                {state?.message && <p>{state.message}</p>}
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Did you remember your password?{" "}
                            <Link className="underline underline-offset-4" href="/login">
                                Login Here
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
