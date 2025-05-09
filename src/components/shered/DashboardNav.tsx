"use client"
import { protectedRoutes } from "@/constant";
import { useUser } from "@/context/UserContext";
import { logOutUser } from "@/services/AuthService";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";

const DashboardNav = () => {
    const { user, setIsLoading, setUser } = useUser();
    const pathname = usePathname();
    const router = useRouter();
    const handleLogout = () => {
        logOutUser();
        setUser(null);
        setIsLoading(true);
        if (protectedRoutes.some((route) => pathname.match(route))) {
            router.push("/login");
        }
    };
    const UserItems: MenuProps["items"] = [
        {
            label: (
                <Link className='text-xl' href={`/dashboard/manage-profile`}>
                    My Profile
                </Link>
            ),
            key: "profile",
        },
        {
            label: (
                <div className='text-xl' onClick={() => handleLogout()}>
                    Log out
                </div>
            ),
            key: "logout",
        },
    ];
    const userMenuProps = {
        items: UserItems,
    };
    return (
        <div className='w-full sticky z-0 bg-[#001529] py-3 flex justify-end pr-5 '>
            <div className='flex items-center gap-5 '>
                <div className='text-gray-400 '>
                    <h3 className='capitalize font-bold'>{user?.role}</h3>
                    <h3 className='font-semibold z-0'>{user?.email}</h3>
                </div>
                <Dropdown trigger={["click"]} menu={userMenuProps}>
                    <button className='cursor-pointer'>
                        <FaRegUserCircle className='text-5xl text-primary' />
                    </button>
                </Dropdown>
            </div>
        </div>
    );
};

export default DashboardNav;
