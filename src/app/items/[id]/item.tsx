'use client'
import Image from "next/image";
import Stars from "@/components/stars";
import { Separator } from "@/components/ui/separator";
import ColorSelector from "@/components/colorselector";
import { Item } from "./actions"
import { useState } from "react";
import { Button } from "@/components/ui/button";

type ItemProps = {
    item: Item;
    selectedColor?: number;
}

export default function ItemComponent(props: ItemProps) {
    const [selectedColor, setSelectedColor] = useState(props.selectedColor);

    const onColorSelectorClick = (index: number) => {
        console.log("onColorSelectorClick", index);
        window.history.pushState(null, '', `/items/${props.item.id}?color=${props.item.color![index]}`);
        setSelectedColor(index);
     }

    return (
        <div>
            <p className="text-xs mt-5 ml-4">{props.item.category} &gt; {props.item.subcategory}</p>
            <div className="flex justify-center gap-30 mt-8">
                <Image src={`/items/${props.item.imageid}${props.selectedColor !== undefined && props.item.color 
                        ? "-" + props.item.color[selectedColor!] 
                        : ""}.jpg`}
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
                    <p className="text-sm w-xs md:w-xl md:mr-10 mb-2">{props.item.description}</p>
                    {props.item.color !== null ?
                        <ColorSelector colors={props.item.color}
                                       selectedIndex={selectedColor!}
                                       onClick={onColorSelectorClick}
                                       className="mb-2"
                        />

                        : null
                    }
                    <Button className="bg-amber-300 text-black hover:bg-amber-400 cursor-pointer w-50">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}