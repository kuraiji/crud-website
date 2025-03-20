import Navbar from "@/components/navbar";
import { createClient } from '@/utils/supabase/server';
import {ShoppingCartRequestType} from "@/lib/definitions";

export default async function Header(props: {shoppingcart: ShoppingCartRequestType| null}) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser()
    return (
        <header className="flex justify-center items-center">
            <Navbar user={data.user} shoppingCart={props.shoppingcart} />
        </header>
    );
}