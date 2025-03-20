import { createClient } from '@/utils/supabase/server'
import {redirect} from "next/navigation";
import ShoppingCart from "@/app/shopping_cart/shopping_cart";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Kuraiji.me: Checkout",
    description: "The checkout page",
}

export default async function ShoppingCartPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if(!user || !user.id) {
        redirect('/');
    }

    return (
        <ShoppingCart User={user} />
    );
}