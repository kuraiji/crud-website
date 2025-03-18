"use client"
import { ArrowDown, ArrowUp, UserRoundX, UserRound, LogOut } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { User } from '@supabase/supabase-js'
import {signout, deleteAccount, update_user} from "@/app/account/actions";
import {useActionState, useState} from "react";
import {DBUser} from "@/app/actions";

const transactions = [
    {
        id: "1",
        amount: 499.99,
        status: "completed",
        date: new Date("2023-06-23"),
        description: "Annual Subscription",
        type: "expense",
    },
    {
        id: "2",
        amount: 29.99,
        status: "completed",
        date: new Date("2023-06-15"),
        description: "Monthly Premium",
        type: "expense",
    },
    {
        id: "3",
        amount: 750.0,
        status: "pending",
        date: new Date("2023-06-10"),
        description: "Client Payment",
        type: "income",
    },
    {
        id: "4",
        amount: 19.99,
        status: "failed",
        date: new Date("2023-06-05"),
        description: "Add-on Purchase",
        type: "expense",
    },
    {
        id: "5",
        amount: 250.0,
        status: "completed",
        date: new Date("2023-05-28"),
        description: "Referral Bonus",
        type: "income",
    },
]

type DeleteErrorType = {
    message: string | undefined,
    disabled: boolean,
}

export default function SettingsPage(props: {user: User, dbUser: DBUser}) {
    const [deleteError, setDeleteError] = useState<DeleteErrorType>({message: undefined, disabled: false});
    // @ts-ignore
    const [updateUserState, updateUserAction, updateUserPending] = useActionState(update_user, undefined);
    return (
        <div className="container mx-auto py-6 space-y-8">
            <h1 className="font-bold">Welcome {props.dbUser.firstname}!</h1>
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="w-full md:w-1/3 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Transactions</CardTitle>
                            <CardDescription>Your recent payment history</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="space-y-4">
                                {transactions.map((transaction) => (
                                    <div key={transaction.id} className="flex items-center p-4 border-b last:border-0">
                                        <div
                                            className={cn(
                                                "flex items-center justify-center w-10 h-10 rounded-full mr-4",
                                                transaction.type === "expense" ? "bg-red-100" : "bg-green-100",
                                            )}
                                        >
                                            {transaction.type === "expense" ? (
                                                <ArrowUp className={cn("h-5 w-5 text-red-600")} />
                                            ) : (
                                                <ArrowDown className={cn("h-5 w-5 text-green-600")} />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium">{transaction.description}</p>
                                            <p className="text-xs text-muted-foreground">{format(transaction.date, "MMM dd, yyyy")}</p>
                                        </div>
                                        <div className="text-right">
                                            <p
                                                className={cn(
                                                    "text-sm font-medium",
                                                    transaction.type === "expense" ? "text-red-600" : "text-green-600",
                                                )}
                                            >
                                                {transaction.type === "expense" ? "-" : "+"}${transaction.amount.toFixed(2)}
                                            </p>
                                            <Badge
                                                variant={
                                                    transaction.status === "completed"
                                                        ? "default"
                                                        : transaction.status === "pending"
                                                            ? "outline"
                                                            : "destructive"
                                                }
                                                className="text-xs"
                                            >
                                                {transaction.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="border-t p-4">
                            <Button variant="outline" className="w-full">
                                View All Transactions
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="w-full md:w-2/3 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-full bg-primary/10">
                                    <UserRound className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>Update your personal details</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <form>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstname">First name</Label>
                                        <Input id="firstname" type="text" name="firstname"  defaultValue={props.dbUser.firstname} required />
                                        <p className="text-red-700">{updateUserState?.errors?.firstname}</p>
                                        <p className="text-red-700">{updateUserState?.message}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button formAction={updateUserAction} disabled={updateUserPending} type="submit"
                                    className="cursor-pointer"
                                >
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-full bg-primary/10">
                                    <LogOut className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Sign Out</CardTitle>
                                    <CardDescription>Sign out from the website</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardFooter>
                            <Button onClick={async () => await signout()}
                                    className="cursor-pointer">
                                Sign out
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-full bg-primary/10">
                                    <UserRoundX className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Delete Account</CardTitle>
                                    <CardDescription>Delete your account with all data being wiped</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardFooter>
                            <div className="flex flex-col">
                                <div>
                                    <Button onClick={async () => await deleteAccount(setDeleteError)}
                                            className="cursor-pointer" variant="destructive"
                                            disabled={deleteError.disabled}
                                    >
                                        Delete Account
                                    </Button>
                                </div>
                                <p className="text-red-700">{deleteError.message}</p>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

