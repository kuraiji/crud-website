import Navbar from "@/components/navbar";
import { createClient } from '@/utils/supabase/server';


export default async function Header() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser()


    return (
        <header className="flex justify-center items-center">
            <Navbar user={data.user} />
        </header>
    );
}