'use client'
import Image from "next/image";
import Stars from "@/components/stars";
import { Separator } from "@/components/ui/separator";
import ColorSelector from "@/components/colorselector";
import { Item } from "./actions"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import {LOCAL_STORAGE_KEY, ShoppingCartTypeWithoutUser, ADD_TO_CART_EVENT} from "@/lib/definitions";
import {useRouter} from "next/navigation";


type ItemProps = {
    item: Item;
    selectedColor?: number;
    user?: User | null;
}

export default function ItemComponent(props: ItemProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedColor, setSelectedColor] = useState(props.selectedColor);
    const nf = new Intl.NumberFormat('en-US');

    const onColorSelectorClick = (index: number) => {
        window.history.pushState(null, '', `/items/${props.item.id}?color=${props.item.color![index]}`);
        setSelectedColor(index);
    }

    const onAddToCart = () => {
        if(!props.user) {
            router.push("/login");
            return;
        }
        const color = props.item.color ?
            searchParams.get("color") ?
                searchParams.get("color") :
                props.item.color[0] : null;
        const localstorageitem = localStorage.getItem(LOCAL_STORAGE_KEY);
        const shoppingcart: ShoppingCartTypeWithoutUser = localstorageitem ? JSON.parse(localstorageitem) : [];
        shoppingcart.push({
            itemid: props.item.id,
            itemname: props.item.itemname,
            price: props.item.price,
            imageid: props.item.imageid,
            color: color ? color : undefined,
        });
        if(shoppingcart.length > 50) return;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(shoppingcart));
        window.dispatchEvent(new CustomEvent(ADD_TO_CART_EVENT, {detail: shoppingcart}));
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
                       priority={true}
                />
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl">{props.item.itemname}</h1>
                    <div className="flex flex-row gap-1 items-center">
                        <p>{props.item.rating}</p>
                        <Stars rating={props.item.rating}/>
                        <p className="ml-4">{nf.format(props.item.ratingnum)} ratings</p>
                    </div>
                    <Separator className="my-4"/>
                    <h2 className="font-bold text-3xl mb-4">${nf.format(props.item.price)}</h2>
                    <p className="text-sm w-xs md:w-xl md:mr-10 mb-2">{props.item.description}</p>
                    {props.item.color !== null ?
                        <ColorSelector colors={props.item.color}
                                       selectedIndex={selectedColor!}
                                       onClick={onColorSelectorClick}
                                       className="mb-2"
                        />

                        : null
                    }
                    <Button onClick={onAddToCart}
                        className="bg-amber-300 text-black hover:bg-amber-400 cursor-pointer w-50"
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}