import {Button} from "@heroui/button";
import {FaRegSmile} from "react-icons/fa";
import Link from "next/link";

export default async function Home() {
    return (
        <div>
            <Button as={Link} href="/members" className="border-2 rounded-xl p-2" color="secondary" variant="bordered" startContent={<FaRegSmile size={20}/>}>Click me</Button>
        </div>
    );
}
