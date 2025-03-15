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
import {improved_signup} from './actions'
import { useActionState } from 'react'
import Link from 'next/link'

export function SignupForm({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"div">) {
    // @ts-ignore
    const [state, action, pending] = useActionState(improved_signup, undefined);
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Sign up</CardTitle>
                    <CardDescription>
                        Please enter an email, password and firstname
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
                            <div className="grid gap-2">
                                <Label htmlFor="email">First Name</Label>
                                <Input
                                    id="firstname"
                                    type="text"
                                    name="firstname"
                                    placeholder="Bob"
                                    required
                                />
                            </div>
                            {state?.errors?.firstname && <p className="text-red-700">{state.errors.firstname}</p>}
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" name="password" required />
                            </div>
                            {state?.errors?.password && (
                                <div className="text-red-700">
                                    <p>Password must:</p>
                                    <ul>
                                        {state.errors.password.map((error) => (
                                            <li key={error}>- {error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <Button formAction={action} disabled={pending} type="submit" className="w-full">
                                Signup
                            </Button>
                            <div className="text-red-700 flex justify-center items-center">
                                {state?.message && <p>{state.message}</p>}
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Did you remember you have account?{" "}
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
