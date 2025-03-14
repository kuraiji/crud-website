'use client'
import Image from "next/image";
import Stars from "@/components/stars";
import { Separator } from "@/components/ui/separator";
import ColorSelector from "@/components/colorselector";
import { Item } from "./actions"

type ItemProps = {
    item: Item
}

export default function ItemComponent(props: ItemProps) {
    const onColorSelectorClick = (index: number) => {
        console.log("onColorSelectorClick", index)
    }

    return (
        <div>
            <p className="text-xs mt-5 ml-4">{props.item.category} &gt; {props.item.subcategory}</p>
            <div className="flex justify-center gap-4 mt-8">
                <Image src={`/items/${props.item.imageid}${props.item.color !== null ? "-" + props.item.color[0] : ""}.jpg`}
                       alt={`Picture of a ${props.item.itemname}`}
                       width={1155}
                       height={1500}
                       className="w-80 md:w-1/4 h-fit"
                />
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl">{props.item.itemname}</h1>
                    <div className="flex flex-row gap-4 items-center">
                        <Stars rating={props.item.rating}/>
                        <p>{props.item.ratingnum} ratings</p>
                    </div>
                    <Separator className="my-4"/>
                    <h2 className="font-bold text-3xl mb-4">${props.item.price}</h2>
                    <p className="text-sm w-xs md:w-xl md:mr-10">{props.item.description}</p>
                    {props.item.color !== null ?
                        <ColorSelector colors={props.item.color} selectedIndex={0} onClick={onColorSelectorClick}/>
                        : null
                    }
                </div>
            </div>
        </div>
    );
}