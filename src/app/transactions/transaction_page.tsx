'use client'
import {ShoppingCartType, TransactionResponseType, TransactionResponseTypeIndividual} from "@/lib/definitions";
import {useEffect, useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image"
import {format} from "date-fns";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight, Circle, } from "lucide-react";
import Nossr from "@/components/nossr";
import {Separator} from "@/components/ui/separator";
import { useIsMount } from "@/lib/refs";
import {getTransaction} from "@/app/actions";
import {useRouter} from "next/navigation";

export default function TransactionPage(props: {initalTransaction: TransactionResponseType}) {
    const isMount = useIsMount();
    const userId = props.initalTransaction[0].userid;
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [currentTransactions, setCurrentTransactions] = useState<TransactionResponseType>(props.initalTransaction);
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionResponseTypeIndividual>(props.initalTransaction[0]);
    const [isFinalPage, setIsFinalPage] = useState<boolean>(false);

    useEffect(()=>{
        if(isMount) return;
        getTransaction(userId, currentPage).then((response) => {
            if(response === null) useRouter().replace("/error");
            setCurrentTransactions(response!);
            setSelectedTransaction(response![0]);
            getTransaction(userId, currentPage + 1).then((inner_response) => {
                if(inner_response === null) useRouter().replace("/error");
                if(inner_response!.length === 0){
                    setIsFinalPage(true);
                }
                else setIsFinalPage(false);
            })
        });
    },[currentPage])

    const createTransactionCard = (transaction: TransactionResponseTypeIndividual) => {
        return(
            <Card
                key={transaction.timestamp}
                className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedTransaction.timestamp === transaction.timestamp ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedTransaction(transaction)}
            >
                <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                                src={`/items/${transaction.cart[0].imageid}${transaction.cart[0].color ? "-" + transaction.cart[0].color
                                    : ""}.jpg`}
                                alt={`Picture of a ${transaction.cart[0].itemname}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-medium">{transaction.cart.length} items</h3>
                            <p className="line-clamp-1 text-sm text-muted-foreground">{
                                format((new Date(`${transaction.timestamp}Z`)), "MMM dd, yyyy HH:mm:ss")
                            }</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    const createCartItemCard = (cartItem: ShoppingCartType, index: number) => {
        return (
            <div key={index} className="flex flex-col sm:flex-row gap-4 py-4 border-b">
                <div className="flex-shrink-0">
                    <Image
                        src={`/items/${cartItem.imageid}${cartItem.color ? "-" + cartItem.color
                            : ""}.jpg`}
                        alt={`Picture of a ${cartItem.itemname}`}
                        width={120}
                        height={120}
                        className="rounded-md object-cover"
                    />
                </div>
                <div className="flex-grow space-y-2">
                    <div className="flex justify-between">
                        <h3 className="font-medium">{cartItem.itemname}</h3>
                        <p className="font-semibold">${cartItem.price}</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        {
                            cartItem.color ?
                                <div className="flex">
                                    <p className="mr-2">Color:</p>
                                    <Circle strokeWidth={1} fill={`#${cartItem.color}`} />
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row">
            {/* Left panel - Selection */}
            <div className="w-full border-b md:w-1/3 md:border-b-0 md:border-r">
                <div className="p-4">
                    <h2 className="mb-4 text-2xl font-bold">Select a Transaction</h2>
                    <div className="flex items-center justify-center gap-4 mb-4 mr-5">
                        <Button variant="outline" size="icon" disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" disabled={isFinalPage} onClick={() => setCurrentPage(currentPage + 1)}>
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="grid gap-4 pr-4">
                        {currentTransactions.map(createTransactionCard)}
                    </div>
                </div>
            </div>

            {/* Right panel - Detail view */}
            <div className="flex w-full flex-1 flex-col md:w-2/3">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-center gap-4 mb-4 mr-5">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <p className="font-semibold mb-4">-</p>
                            <h3 className="text-xl font-semibold mb-4">
                                {format((new Date(`${selectedTransaction.timestamp}Z`)), "MMM dd, yyyy HH:mm:ss")}
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <Nossr>
                                    <span>${selectedTransaction.subtotal}</span>
                                </Nossr>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>${selectedTransaction.shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tax</span>
                                <span>${selectedTransaction.tax.toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <Nossr>
                                        <span>${
                                            (selectedTransaction.subtotal + selectedTransaction.shipping + selectedTransaction.tax).toFixed(2)
                                        }</span>
                                </Nossr>
                            </div>
                        </div>
                        <Separator className="mt-5"/>
                    </CardContent>
                    <CardContent className="pl-6 pr-6">
                        <ScrollArea className="">
                            {
                                selectedTransaction.cart.map(createCartItemCard)
                            }
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}