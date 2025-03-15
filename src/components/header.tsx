import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";

const HOME_URL = "/";
const LOGIN_URL = "/login";

const Navbar = () => {
    return (
        <Card className="container py-3 px-4 border-0 flex flex-row items-center
            justify-between gap-6 rounded-2xl mt-5"
        >
            <ul className="hidden md:flex items-center gap-10 text-card-foreground">
                <li className="text-primary font-medium">
                    <a href={HOME_URL}>Home</a>
                </li>
            </ul>
            <div className="flex items-center">
                <Button className="hidden md:block ml-2 mr-2 cursor-pointer">
                    <a href={LOGIN_URL}>Get Started</a>
                </Button>
                <div className="flex md:hidden mr-2 items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5 rotate-0 scale-100" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <a href={HOME_URL}>Home</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button className="w-full text-sm">
                                    <a href={LOGIN_URL}>Get Started</a>
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </Card>
    );
};

export default function Header() {
    return (
        <header className="flex justify-center items-center">
            <Navbar />
        </header>
    );
}