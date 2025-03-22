import { Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-muted py-12 mt-20">
            <div className="ml-20 container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Kuraiji.me</h3>
                    <p className="text-sm text-muted-foreground">
                        Your destination for premium tech products and accessories. Quality you can trust.
                    </p>
                    <h2 className="text-lg font-medium">
                        Created by Payman Ahmadpour
                    </h2>
                    <div className="flex space-x-4">
                        <Button variant="ghost" size="icon">
                            <Link href="https://github.com/kuraiji">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">Github</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Link href="https://www.linkedin.com/in/paymanahmadpour">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">Linkedin</span>
                            </Link>
                        </Button>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">
                        Frontend powered by Next.js, React, Tailwind, Shadcn.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Backend powered and secured with API Gateway, AWS Lambda, and DynamoDB.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Website is actually a portfolio piece and you can&apos;t actually buy any of the products listed.
                    </p>
                </div>
            </div>

            <div className="container mt-8 ml-20">
                <Separator className="mb-8" />
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Kuraiji.me. All rights reserved.</p>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                        <p>
                            Privacy Policy
                        </p>
                        <p>
                            Terms of Service
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

