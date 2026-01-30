import {Navbar, NavbarBrand, NavbarContent} from "@heroui/navbar";
import {GiMatchTip} from "react-icons/gi";
import Link from "next/link";
import {Button} from "@heroui/button";
import NavLink from "@/components/NavLink";
import {auth} from "@/auth";
import UserMenu from "@/components/navbar/UserMenu";
import {getUserInfoForNav} from "@/app/actions/userActions";
import FiltersWrapper from "@/components/navbar/FiltersWrapper";

const TopNav = async () => {
    const session = await auth();
    const userInfo = session?.user && await getUserInfoForNav();

    const memberLinks = [
        {href: '/members', label: 'Matches'},
        {href: '/lists', label: 'Lists'},
        {href: '/messages', label: 'Messages'},
    ]

    const adminLinks = [
        {href: '/admin/moderation', label: 'Photo Moderation'}
    ];

    const links = session?.user.role === 'ADMIN' ? adminLinks : memberLinks;
    return (
        <>
          <Navbar
            className="sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-purple-500 backdrop-blur-md shadow-md"
            classNames={{
              wrapper: "w-full !px-4 lg:!px-6",
              item: [
                "text-sm",
                "sm:text-base",
                "md:text-xl",
                "text-white",
                "uppercase",
                'data-[active="true"]:text-yellow-200',
              ],
            }}
          >
                <NavbarBrand as={Link} href="/">
                    <GiMatchTip size={50} className="text-gray-200"/>
                    <div className="hidden md:flex font-bold text-3xl">
                        <span className="text-gray-900">My</span>
                        <span className="text-gray-200">Tinder</span>
                    </div>
                </NavbarBrand>
                <NavbarContent justify="center">
                    {session && links.map(link => <NavLink href={link.href} label={link.label} key={link.href}/>)}
                </NavbarContent>
                <NavbarContent justify="end">
                    {userInfo ? (<UserMenu userInfo={userInfo}/>) :
                        (<>
                            <Button as={Link} href="/login" className="text-white" variant="bordered">Login</Button>
                            <Button as={Link} href="/register" className="text-white"
                                    variant="bordered">Register</Button>
                        </>)}
                </NavbarContent>
            </Navbar>
            <FiltersWrapper/>
        </>
    );
};

export default TopNav;