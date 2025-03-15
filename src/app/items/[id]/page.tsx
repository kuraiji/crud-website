import { redirect } from 'next/navigation'
import {getItemById} from "./actions";
import ItemComponent from "./item";
import { cache } from 'react';
import type { Metadata, ResolvingMetadata } from 'next'

type ItemPageProps = {
    params: Promise<{id: string}>;
    searchParams: Promise<{ color?: string }>
}

export async function generateMetadata(
    {params}: ItemPageProps)
    : Promise<Metadata> {
    const { id } = await params;
    const item = await getItemById(id)

    if(item == null) {
        return {}
    }
    return {title: `Kuraiji.me: ${item!.itemname}`,
        description: `The item page for ${item!.itemname}!`,}
}

export default async function ItemPage(
    {params, searchParams}: ItemPageProps) {
    const { id } = await params;
    const { color } = await searchParams;
    const item = await getItemById(id)

    if(item == null) {
        redirect('/error')
    }

    let selectedColor: number | undefined = undefined;
    if(item!.color)
    {
        if(color == undefined){
            selectedColor = 0;
        }
        else
        {
            selectedColor = item!.color.findIndex((element) => element === color)
        }
    }

    return (
        <ItemComponent item={item} selectedColor={selectedColor}/>
    );
}