import {Button} from "@heroui/button";
import {FaRegSmile} from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      Hello!
        <p>
            <Button as={Link} href="/members" color="primary" variant="shadow" startContent={<FaRegSmile />}>Click me</Button>
        </p>
    </div>
  );
}
