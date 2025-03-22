"use client"
import { UserRoundX, UserRound, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { User } from '@supabase/supabase-js'
import {signout, deleteAccount, update_user} from "@/app/account/actions";
import {useActionState, useState} from "react";
import {DBUser} from "@/app/actions";
import {TransactionResponseType, TransactionResponseTypeIndividual} from "@/lib/definitions";
import TransactionItem from "@/components/transaction";
import Link from "next/link";

type DeleteErrorType = {
    message: string | undefined,
    disabled: boolean,
}

export default function SettingsPage(props: {user: User, dbUser: DBUser, transactions: TransactionResponseType | null}) {
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
                                {
                                    props.transactions ?
                                    props.transactions.map((transaction: TransactionResponseTypeIndividual, index) => {
                                        return <TransactionItem key={index} transaction={transaction} />
                                    }) : null
                                }
                            </div>
                        </CardContent>
                        <CardFooter className="border-t p-4">

                            <Link className="w-full" aria-disabled={!props.transactions} href={`/transactions`}>
                                <div className="flex justify-center items-center gap-6 font-bold">
                                    <p>View All Transactions</p>
                                </div>
                            </Link>
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
                                    <Button onClick={async () => {
                                        setDeleteError({message: undefined, disabled: true});
                                        await deleteAccount()
                                        setDeleteError({message: "Failed to delete account, please try again later",
                                            disabled: false});
                                    }}
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

