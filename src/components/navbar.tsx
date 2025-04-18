'use client'
import { ShoppingCart } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { User } from '@supabase/supabase-js'
import {LOCAL_STORAGE_KEY, ADD_TO_CART_EVENT, ShoppingCartRequestType, ShoppingCartTypeWithoutUser} from "@/lib/definitions";
import { useEffect, useState } from "react";
import {putShoppingCart} from "@/app/actions";
import Link from "next/link";

const HOME_URL = "/";
const LOGIN_URL = "/login";
const ACCOUNT_URL = "/account";
const SHOPPING_CART_URL = "/shopping_cart";

declare global {
    interface WindowEventMap {
        'addToCart': CustomEvent
    }
}

export default function Navbar(props: {
    user: User | null
    shoppingCart: ShoppingCartRequestType | null
}) {
    const [length, setLength] = useState(0);

    useEffect(() => {
        setLength(props.shoppingCart && props.shoppingCart?.cart.length ? props.shoppingCart.cart.length : 0);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(props.shoppingCart?.cart ? props.shoppingCart?.cart  : []))
        const handleStorage = async (event: CustomEvent<ShoppingCartTypeWithoutUser>) => {
            setLength(event.detail.length);
            if(!props.user?.id) return;
            await putShoppingCart({
                userid: props.user?.id,
                shoppingCart: {
                    userid: props.user?.id,
                    cart: event.detail
                }
            });
        }
        const handleNotFocusedTabUpdateAmount = (event: StorageEvent) => {
            if(!event.newValue) {
                return;
            }
            setLength(JSON.parse(event.newValue).length);
        }
        window.addEventListener(ADD_TO_CART_EVENT, handleStorage);
        window.addEventListener("storage", handleNotFocusedTabUpdateAmount);
        return () => {
            window.removeEventListener(ADD_TO_CART_EVENT, handleStorage);
            window.removeEventListener("storage", handleNotFocusedTabUpdateAmount);
        }
    }, [props.shoppingCart]);

    return (
        <Card className="container py-3 px-4 border-0 flex flex-row items-center
            justify-between gap-6 rounded-2xl mt-5"
        >
            <ul className="hidden md:flex items-center gap-10 text-card-foreground">
                <li className="text-primary font-medium">
                    <Link className="hover:underline" href={HOME_URL}>Kuraiji.me</Link>
                </li>
            </ul>
            <div className="flex items-center">

                    {props.user ?
                        <Link href={ACCOUNT_URL}>
                            <Button className="hidden md:block ml-2 mr-2 cursor-pointer">
                                Account
                            </Button>
                        </Link> :
                        <Link href={LOGIN_URL}>
                            <Button className="hidden md:block ml-2 mr-2 cursor-pointer">
                                Get Started
                            </Button>
                        </Link>}

                {props.user ?
                    <Link href={SHOPPING_CART_URL}>
                        <Button className="hidden md:block ml-2 mr-2 cursor-pointer">
                                <div className="relative inline-block">
                                    <ShoppingCart className="w-6 h-6" />
                                    {length > 0 && (
                                        <Badge
                                            variant="destructive"
                                            className="absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center p-0 text-xs"
                                        >
                                            {length}
                                        </Badge>
                                    )}
                                </div>
                        </Button>
                    </Link>
                    : null
                }
                <div className="flex md:hidden mr-2 items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5 rotate-0 scale-100" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Link href={HOME_URL}>Home</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <div className="flex flex-col gap-2">
                                        {props.user ? 
                                            <Link href={ACCOUNT_URL}>
                                                <Button className="w-full text-sm">
                                                    Account
                                                </Button>
                                            </Link> : 
                                            <Link href={LOGIN_URL}>
                                                <Button className="w-full text-sm">
                                                    Get Started
                                                </Button>
                                            </Link>}
                                    {props.user ?
                                        <Link href={SHOPPING_CART_URL}>
                                            <Button className="w-full text-sm">
                                                    <div className="relative inline-block">
                                                        <ShoppingCart className="w-6 h-6" />
                                                        {length > 0 && (
                                                            <Badge
                                                                variant="destructive"
                                                                className="absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center p-0 text-xs"
                                                            >
                                                                {length}
                                                            </Badge>
                                                        )}
                                                    </div>
                                            </Button>
                                        </Link>
                                        : null
                                    }
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </Card>
    );
}