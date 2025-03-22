'use client'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Circle, Trash2} from "lucide-react";
import {ShoppingCartType} from "@/lib/definitions";

export default function CartItem({Item, OnClick, Index}:
{
    Item: ShoppingCartType,
    OnClick:  (index: number) => void,
    Index: number;
}) {
    let nf = new Intl.NumberFormat('en-US');
    return (
        <div className="flex flex-col sm:flex-row gap-4 py-4 border-b">
            <div className="flex-shrink-0">
                <Image
                    src={`/items/${Item.imageid}${Item.color ? "-" + Item.color
                        : ""}.jpg`}
                    alt={`Picture of a ${Item.itemname}`}
                    width={120}
                    height={120}
                    className="rounded-md object-cover"
                />
            </div>
            <div className="flex-grow space-y-2">
                <div className="flex justify-between">
                    <h3 className="font-medium">{Item.itemname}</h3>
                    <p className="font-semibold">${nf.format(Item.price)}</p>
                </div>
                <div className="flex justify-between items-center pt-2">
                    {
                        Item.color ?
                            <div className="flex">
                                <p className="mr-2">Color:</p>
                                <Circle strokeWidth={1} fill={`#${Item.color}`} />
                            </div>
                        : null
                    }
                    <Button onClick={() => OnClick(Index)}
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground h-8 ml-auto"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}