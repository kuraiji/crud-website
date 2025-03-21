'use client'
import type { User } from '@supabase/supabase-js'
import Link from "next/link"
import { ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLocalStorage } from "usehooks-ts";
import {ADD_TO_CART_EVENT, LOCAL_STORAGE_KEY, ShoppingCartType, ShoppingCartTypeWithoutUser} from "@/lib/definitions";
import CartItem from "@/components/cart_item";
import Nossr from "@/components/nossr";
import { useRouter } from "next/navigation";
import {useCallback, useState} from "react";
import {putTransaction} from "@/app/shopping_cart/actions";

export default function ShoppingCart(props: {User: User}) {
    const router = useRouter();
    const [cart, setCart] = useLocalStorage(LOCAL_STORAGE_KEY, []);
    const [shipping, setShipping] = useState("standard");
    const [busy, setBusy] = useState<boolean>(false);
    const shippingPrice = shipping === "standard" ? 4.99 :
        shipping === "express" ? 14.99 : 0.00;
    const tax = 7.50;
    const CalculateTotal = useCallback(() => {
        let total = 0;
        cart.forEach((item: ShoppingCartType) => {
            const price = typeof item.price === "number" ? item.price : parseFloat(item.price);
            total += price
        })
        return total;
    }, [cart]);

    const OnDelete = (index: number) => {
        const temp = cart.filter((_, i) => {
            return i !== index;
        });
        setCart(temp);
        window.dispatchEvent(new CustomEvent(ADD_TO_CART_EVENT, {detail: temp}));
    }
    const OnDeleteAll = () => {
        setCart([]);
        window.dispatchEvent(new CustomEvent(ADD_TO_CART_EVENT, {detail: []}));
    }
    const OnPurchase = async ()  => {
        setBusy(true);
        const subtotal = CalculateTotal();
        const tempcart = cart as ShoppingCartTypeWithoutUser;
        const res = await putTransaction({
            userid: props.User.id,
            cart: tempcart,
            shipping: shippingPrice as number,
            tax: tax,
            subtotal: subtotal
        });
        if(res === 200) {
            OnDeleteAll();
            await new Promise(f => setTimeout(f, 60));
            router.push("/?purchase_success");
        }
        setBusy(false);
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-4">
                            <Nossr>
                                <h2 className="text-xl font-semibold">Cart Items ({cart.length})</h2>
                                <Button onClick={OnDeleteAll}
                                        variant="ghost"
                                        size="sm"
                                        className="text-muted-foreground"
                                        disabled={cart.length === 0}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Clear cart
                                </Button>
                            </Nossr>
                            </div>
                            <Separator className="my-4" />
                            <Nossr>
                                {
                                    cart.map((cartItem: ShoppingCartType, index) =>
                                        <CartItem key={index} Item={cartItem} OnClick={OnDelete} Index={index}/>
                                    )
                                }
                            </Nossr>
                        </CardContent>
                    </Card>
                    <div className="flex justify-between items-center mt-6">
                        <Button variant="outline" asChild>
                            <Link href="/">Continue Shopping</Link>
                        </Button>
                        <Button onClick={router.refresh}
                            variant="outline"
                        >
                            Update Cart
                        </Button>
                    </div>
                </div>
                <div className="lg:col-span-1 space-y-4">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <Nossr>
                                        <span>${CalculateTotal()}</span>
                                    </Nossr>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label htmlFor="shipping">Shipping</Label>
                                    <Nossr>
                                        <Select defaultValue={shipping} onValueChange={setShipping}>
                                            <SelectTrigger id="shipping">
                                                <SelectValue placeholder="Select shipping method" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="standard">Standard Shipping - $4.99</SelectItem>
                                                <SelectItem value="express">Express Shipping - $14.99</SelectItem>
                                                <SelectItem disabled={CalculateTotal() < 100} value="free">Free Shipping (orders over $100)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </Nossr>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>${shippingPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <Nossr>
                                        <span>${
                                            typeof (CalculateTotal() + shippingPrice + tax) === "number" ? (CalculateTotal() + shippingPrice + tax).toFixed(2) : 0
                                        }</span>
                                    </Nossr>
                                </div>
                                <Button onClick={OnPurchase}
                                    className="w-full"
                                    size="lg"
                                    disabled={busy || cart.length === 0}
                                >
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    Purchase
                                </Button>
                                <div className="text-center text-sm text-muted-foreground mt-4">
                                    <p>Secure Checkout</p>
                                    <p>Free returns within 1 second of ordering</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}