import {cn} from "@/lib/utils";
import {ShoppingBag} from "lucide-react";
import {format} from "date-fns";
import {Badge} from "@/components/ui/badge";
import {TransactionResponseTypeIndividual} from "@/lib/definitions";

export default function TransactionItem({transaction}: {transaction: TransactionResponseTypeIndividual}) {
    return (
        <div className="flex items-center p-4 border-b last:border-0">
            <div
                className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full mr-4",
                    "bg-amber-50",
                )}
            >
                <ShoppingBag className={cn("h-5 w-5 text-red-600")} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{transaction.cart.length} items</p>
                <p className="text-xs text-muted-foreground">{format((new Date(`${transaction.timestamp}Z`)), "MMM dd, yyyy HH:mm:ss")}</p>
            </div>
            <div className="text-right">
                <p
                    className={cn(
                        "text-sm font-medium",
                        "bg-amber-50",
                    )}
                >
                    {"-"}${(transaction.tax + transaction.subtotal + transaction.shipping).toFixed(2)}
                </p>
                <Badge
                    variant={"default"}
                    className="text-xs"
                >
                    completed
                </Badge>
            </div>
        </div>
    );
}