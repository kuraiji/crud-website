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
import { reset_password } from './actions'
import { useActionState } from 'react'

export function PasswordResetForm({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"div">) {
    const sessionCode = props.property ? props.property : "";
    const [state, action, pending] = useActionState(reset_password, {code: sessionCode, message: ""});
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Password Reset</CardTitle>
                    <CardDescription>
                        Please enter a new password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
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
                                Reset Password
                            </Button>
                            <div className="text-red-700 flex justify-center items-center">
                                {state?.message && <p>{state.message}</p>}
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
