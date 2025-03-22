import type {Metadata} from "next";
import {HeroSection} from "@/components/hero-section";
import {Carousel} from "@/components/carousel";
import {getItems} from "@/app/actions";
import {redirect} from "next/navigation";
import {FloatingMessage} from "@/components/floating-message";

export const metadata: Metadata = {
  title: "Kuraiji.me: Home Page",
  description: "The home page",
}

type ItemPageProps = {
  searchParams: Promise<{ purchase_success?: string; check_email?: string }>
}

export default async function Home(
    {searchParams}: ItemPageProps) {

  const items = await getItems();
  if(!items)
  {
    redirect("/error");
  }

  const { purchase_success, check_email } = await searchParams;
  const children = purchase_success !== undefined ?
      <>
        <p>Thank you for your purchase!</p>
        <p>You can view the transaction in the account page.</p>
      </>
      : check_email !== undefined ?
          <p>Please check your email to complete sign-up process!</p>
          : null

  return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <HeroSection />
          {children ? <FloatingMessage>{children}</FloatingMessage> : null}
          <section className="container py-8 md:py-12 ml-26">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Products</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our latest collection of premium products
              </p>
            </div>
            <div className="mt-8">
              <Carousel items={items!} />
            </div>
          </section>
        </main>
      </div>
  )
}