import {auth} from "@/auth";
import {Button} from "@heroui/button";
import Link from "next/link";
import LoversIcon from "@/components/svg/LoversIcon";

export default async function Home() {
    const session = await auth();
    return (
        <div className="flex flex-col items-center justify-center gap-6 px-4 text-secondary">
            <LoversIcon className="w-48 h-48 fill-secondary "/>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">Welcome to next
                Match</h1>
            {session ? (
                <Button as={Link} href="/members" size="lg" color="secondary" variant="bordered">
                    Continue
                </Button>
            ) : (
                <div className="flex flex-row gap-4 ">
                    <Button as={Link} href="/login" size="lg" color="secondary" variant="bordered">
                        Login
                    </Button>
                    <Button as={Link} href="/register" size="lg" color="secondary" variant="bordered">
                        Register
                    </Button>
                </div>
            )}
        </div>
    );
}
