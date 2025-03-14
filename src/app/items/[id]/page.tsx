import { redirect } from 'next/navigation'
import {getItemById} from "./actions";
import RootLayout from "@/app/layout";
import ItemComponent from "./item";

export default async function ItemPage({params,}:{params: Promise<{id: string}>}) {
    const { id } = await params
    const item = await getItemById(id)

    if(item == null) {
        redirect('/error')
    }

    return (
        <RootLayout title={`Kuraiji.me: ${item!.itemname}`}>
            <ItemComponent item={item}/>
        </RootLayout>
    );
}