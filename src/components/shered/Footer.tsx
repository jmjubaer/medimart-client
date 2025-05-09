"use client";
import { useUser } from "@/context/UserContext";
import { Pill } from "lucide-react";
import Link from "next/link";
const Footer = () => {
    const { user } = useUser();
    return (
        <footer className='bg-black/90 h-fit pt-8 xs:pt-14 md:pt-20 text-white'>
            <div className='container sm:flex gap-8 md:gap-20'>
                <div className='sm:w-3/5'>
                    <Link
                        href='/'
                        className='flex items-center text-white space-x-2 group'>
                        <Pill className='w-7 h-7 text-primary group-hover:rotate-12 transition-transform' />
                        <span className='text-xl font-bold text-white  transition-colors'>
                        Pharma Nest
                        </span>
                    </Link>
                    <p className='text-gray-400 mt-3'>
                        Your trusted online pharmacy for all your medical needs.
                    </p>

                    <div className='mt-8'>
                        <h3 className='text-lg font-semibold mb-4'>
                            Contact Us
                        </h3>
                        <ul className='space-y-2 text-gray-400'>
                            <li>Email: support@pharmanest.com</li>
                            <li>Phone: (123) 456-7890</li>
                            <li>Address: 123 Health Street</li>
                        </ul>
                    </div>
                </div>
                <div className='flex sm:gap-8 md:gap-20 gap-10 mt-8 sm:mt-0'>
                    <div className=''>
                        <h3 className='text-primary text-2xl secondary_font font-semibold mb-7'>
                            Quick Links
                        </h3>
                        <ul className='flex flex-col gap-5'>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_CLIENT_API}`}>
                                Home
                            </Link>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_CLIENT_API}/shop`}>
                                Shop
                            </Link>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_CLIENT_API}/orders?userId=${user?._id}`}>
                                Orders
                            </Link>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_CLIENT_API}/login`}>
                                Login
                            </Link>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_CLIENT_API}/register`}>
                                Sign Up
                            </Link>
                        </ul>
                    </div>
                    <div className=''>
                        <h3 className='text-primary text-2xl secondary_font font-semibold mb-7'>
                            Services
                        </h3>
                        <ul className='flex flex-col gap-5'>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_CLIENT_API}/about`}>
                                About Us
                            </Link>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_CLIENT_API}#contact-us`}>
                                Contact Us
                            </Link>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_CLIENT_API}/about#mission`}>
                                Our Mission
                            </Link>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_CLIENT_API}/about#vision`}>
                                Our Vision
                            </Link>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_CLIENT_API}/about#team`}>
                                Out Team
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='py-8 text-sm text-center border-y mt-6 border-gray-700 text-gray-500'>
                <p>© 2024 Pharma Nest. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
