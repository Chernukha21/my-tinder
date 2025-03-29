import {Button} from "@heroui/button";
import { PiSignOutThin } from "react-icons/pi";
import {auth, signOut} from "@/auth";

export default async function Home() {
    const session = await auth();
    return (
    <div>
      <h1 className="text-3xl">Hello</h1>
        <h3 className="text-2xl font-semibold">User session data</h3>
        {session ? (
            <div>
                <pre>{JSON.stringify(session, null, 2)}</pre>
                <form action={async () => {
                    "use server"
                    await signOut();
                }}>
                    <Button type="submit" color="primary" variant="shadow" startContent={<PiSignOutThin />}>Sign Out</Button>
                </form>
            </div>
        ) : (
            <div>Not signed in</div>
        )}

    </div>
    );
}
