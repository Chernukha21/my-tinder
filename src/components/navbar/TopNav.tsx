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
            <Navbar maxWidth="xl" className="bg-gradient-to-r from-blue-500 to-purple-500" classNames={{
                item: [
                    "text-xl", "text-white", "uppercase", 'data-[active="true"]:text-yellow-200'
                ]
            }}>
                <NavbarBrand as={Link} href="/">
                    <GiMatchTip size={40} className="text-gray-200"/>
                    <div className="font-bold text-3xl flex">
                        <span className="text-gray-900">My</span>
                        <span className="text-gray-200">Tinder</span>
                    </div>
                </NavbarBrand>
                <NavbarContent justify="center">
                    {links.map(link => <NavLink href={link.href} label={link.label} key={link.href}/>)}
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