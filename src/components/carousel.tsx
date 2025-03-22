"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Carousel as CarouselComponent,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {Item} from "@/app/items/[id]/actions";
import CarouselItem from "@/components/carousel_item"

export function Carousel(props: { items: Item[]}) {
    const [api, setApi] = React.useState<any>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div className="space-y-4">
            <CarouselComponent
                setApi={setApi}
                className="w-full"
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent className="-ml-4">
                    {props.items.map((item) => (
                        <CarouselItem key={item.id} item={item}/>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
            </CarouselComponent>
            <div className="flex items-center justify-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => api?.scrollPrev()}
                    disabled={current === 1}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Previous slide</span>
                </Button>
                <div className="text-sm text-muted-foreground">
                    {current} of {count}
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => api?.scrollNext()}
                    disabled={current === count}
                >
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Next slide</span>
                </Button>
            </div>
        </div>
    )
}

