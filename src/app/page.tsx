import {auth, signOut} from "@/auth";
import {Button} from "@heroui/button";
import {BiExit} from "react-icons/bi";

export default async function Home() {
    const session = await auth();
    const userData = JSON.stringify(session, null, 2);
    return (
        <>
            <h1>Hello app</h1>
            <h3 className="text-3xl">User Session Data</h3>
            <div>
                {session ? <pre>{userData}</pre> : <p>There is no signed user</p>}
            </div>
            <form action={async () => {
                "use server"
                await signOut()
            }}>
                <Button startContent={<BiExit/>} type="submit" variant="bordered"
                        color="secondary">{session ? 'Sign out' : 'Sign In'}</Button>
            </form>
        </>

    );
}
