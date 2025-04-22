"use client";
import React, { useState } from "react";
import { Pill, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { logOutUser } from "@/services/AuthService";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/constant";
import { useAppSelector } from "@/redux/hook";
import { useTotalQuantity } from "@/redux/features/cart/cartSlice";
import { FaBars, FaRegUserCircle, FaTimes } from "react-icons/fa";
import NavLink from "./NavLink";
import { Dropdown, MenuProps } from "antd";

const Navbar = () => {
    const { user, setIsLoading, setUser } = useUser();
    const [control, setControl] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const totalCartItem = useAppSelector(useTotalQuantity);

    const handleLogout = () => {
        logOutUser();
        setUser(null);
        setIsLoading(true);
        if (protectedRoutes.some((route) => pathname.match(route))) {
            router.push("/login");
        }
    };
    const items: MenuProps["items"] = [
        {
            label: (
                <Link className='' href={`/profile`}>
                    My Profile
                </Link>
            ),
            key: "profile",
        },
        {
            label: (
                <div className='' onClick={() => handleLogout()}>
                    Log out
                </div>
            ),
            key: "logout",
        },
    ];

    const menuProps = {
        items,
    };
    return (
        <header className=' z-30 bg-white sticky top-0 left-0 py-4'>
            <div className='container'>
                <nav className='flex z-50 lg:grid lg:grid-cols-5 justify-between items-center'>
                    {/* Logo */}
                    <div className='lg:col-span-2 flex-shrink-0 flex items-center'>
                        <Link
                            href='/'
                            className='flex items-center space-x-2 group'>
                            <Pill className='w-7 h-7 text-primary group-hover:rotate-12 transition-transform' />
                            <span className='text-xl font-bold text-gray-900 group-hover:text-primary transition-colors'>
                                MediMart
                            </span>
                        </Link>
                    </div>
                    <div
                        className={`jm_nav ${
                            control ? "w-4/5 md:w-1/2 p-5" : "w-0"
                        }`}>
                        {/* Menu item */}
                        <ul className='flex flex-col lg:flex-row gap-3 lg:gap-x-7'>
                            <li>
                                <NavLink href='/'>Home</NavLink>
                            </li>{" "}
                            <li>
                                <NavLink href='/shop'>Shop</NavLink>
                            </li>
                            <li>
                                <NavLink href='/about'>About</NavLink>
                            </li>
                            {/* {user?.role === "customer" && ( */}
                            <li>
                                <NavLink href={`/orders?userId=${user?.id}`}>
                                    orders
                                </NavLink>
                            </li>
                            {/* )} */}
                            {user?.role === "admin" && (
                                <li>
                                    <NavLink href={`/admin`}>Dashboard</NavLink>
                                </li>
                            )}
                        </ul>
                        <div className='flex-row-reverse flex lg:flex-row justify-end lg:mt-0 mt-5 items-center gap-5'>
                            <Link
                                href='/cart'
                                className='relative mt-2 text-gray-700 hover:text-primary transition-colors'>
                                <ShoppingCart className='w-6 h-6' />
                                <span className='absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                                    {totalCartItem}
                                </span>
                            </Link>
                            {user ? (
                                <Dropdown trigger={["click"]} menu={menuProps}>
                                    <button className='cursor-pointer'>
                                        <FaRegUserCircle className='text-3xl text-primary' />
                                    </button>
                                </Dropdown>
                            ) : (
                                <Link
                                    href={"/login"}
                                    className='button_primary'>
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                    {/* small screen toggle button */}
                    <button
                        onClick={() => setControl(!control)}
                        className='block lg:hidden'>
                        {control ? <FaTimes /> : <FaBars />}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
