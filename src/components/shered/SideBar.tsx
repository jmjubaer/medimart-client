"use client";
import { Layout, Menu } from "antd";
import { Pill } from "lucide-react";
import Link from "next/link";
const { Sider } = Layout;
const SideBar = () => {
    const sidebarItems = [
        {
            key: "/admin",
            label: <Link href={`/admin`}>Dashboard</Link>,
        },
        {
            key: "/admin/medicines",
            label: <Link href={`/admin/medicines`}>Manage Medicines</Link>,
        },
        {
            key: "/admin/add-medicine",
            label: <Link href={`/admin/add-medicine`}>Add Medicine</Link>,
        },
        {
            key: "/admin/instrument",
            label: <Link href={`/admin/instrument`}>Manage Instrument</Link>,
        },
        {
            key: "/admin/add-instrument",
            label: <Link href={`/admin/add-instrument`}>Add Instrument</Link>,
        },
        {
            key: "/dashboard/manage-products",
            label: <Link href={`/admin/orders`}>Manage Orders</Link>,
        },
        {
            key: "/admin/contact",
            label: <Link href={`/admin/contact`}>Contact Message </Link>,
        },
        {
            key: "/admin/users",
            label: <Link href={`/admin/users`}>Manage Users </Link>,
        },
    ];
    return (
        <Sider
            className='pt-5 h-screen'
            breakpoint='lg'
            collapsedWidth='0'>
            <div className='lg:col-span-2 ml-5 z-20 border-b border-gray-500 pb-5 flex gap-2'>
                <Link href='/' className='flex items-center space-x-2 group'>
                    <Pill className='w-7 h-7 text-primary group-hover:rotate-12 transition-transform' />
                    <span className='text-xl font-bold text-primary transition-colors'>
                        Pharma Nest
                    </span>
                </Link>
            </div>
            <Menu
                theme='dark'
                mode='inline'
                defaultSelectedKeys={["Dashboard"]}
                items={sidebarItems}
            />
        </Sider>
    );
};

export default SideBar;
