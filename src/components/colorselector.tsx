'use client'
import { Circle } from 'lucide-react'

type ColorSelectorProps = {
    colors: string[];
    selectedIndex: number;
    onClick: (index: number) => void;
}

export default function ColorSelector(props: ColorSelectorProps) {
    return (
        <div>
            <div className="relative">
                <div className="flex gap-2">
                    {props.colors.map((color, index) =>
                        <Circle className="size-10" key={index} strokeWidth={.5} fill={`#${color}`}/>
                    )}
                </div>
                <div className="absolute top-0 flex gap-2">
                    {props.colors.map((_, index) =>
                        <Circle color={index === props.selectedIndex ? "#4169E1" : ""}
                                className="size-10"
                                key={index}
                                strokeWidth={2}
                                onClick={()=>{props.onClick(index)}}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}