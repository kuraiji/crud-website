import {Card, CardContent, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import * as React from "react";
import {Item} from "@/app/items/[id]/actions";
import {
    CarouselItem as CarouselItemComponent,
} from "@/components/ui/carousel"
import Link from "next/link";

export default function CarouselItem(props: {item: Item}) {
    const nf = new Intl.NumberFormat('en-US');
    return (
        <CarouselItemComponent className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <div className="p-1">
                <Card className="overflow-hidden">
                    <div className="relative">
                        <Link href={`/items/${props.item.id}`}>
                            <Image
                                src={`/items/${props.item.imageid}${props.item.color
                                    ? "-" + props.item.color[0]
                                    : ""}.jpg`}
                                alt={props.item.itemname}
                                width={300}
                                height={300}
                                className="h-[200px] w-full object-cover transition-all hover:scale-105"
                            />
                        </Link>
                    </div>
                    <CardContent className="p-4">
                        <CardTitle className="line-clamp-1 text-base">{props.item.itemname}</CardTitle>
                        <div className="mt-2 flex items-center">
                            {(
                                <span className="font-bold">${nf.format(props.item.price)}</span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </CarouselItemComponent>
    );
}