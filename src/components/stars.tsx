import { Star, StarHalf } from 'lucide-react'

type StarProps = {
    rating: number;
}
const DEFAULT_COLOR = "#D2691E";
const CSS_STATEMENT = "size-4.5"

export default function Stars(props: StarProps) {
    return (
        <div>
            <div className="relative">
                <div className="flex gap-0.5">
                    { Array.from({ length: 5 }, (_, index) => (
                        <Star color={DEFAULT_COLOR} key={index} className={`${CSS_STATEMENT}`}/>
                    ))}
                </div>
                <div className="absolute top-0 flex gap-0.5">
                    { Array.from({length: ~~props.rating}, (_, index) => (
                        <Star key={index} className={`${CSS_STATEMENT}`} fill={DEFAULT_COLOR} strokeWidth={0} />
                    ))}
                    {props.rating % 1 !== 0 ? <StarHalf className={`${CSS_STATEMENT}`} fill="#D2691E" strokeWidth={0} /> : null}
                </div>
            </div>
        </div>
    );
}
/*

*/