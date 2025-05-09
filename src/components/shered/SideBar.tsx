"use client";
import { Layout, Menu } from "antd";
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
            className='pt-5 h-[calc(100vh-68px)]'
            breakpoint='lg'
            collapsedWidth='0'>
            <div className='lg:col-span-2 ml-5 z-20 border-b border-gray-500 pb-5 flex gap-2'>
                <Link to={"/"}>
                    {/* <img
                        src={logo}
                        alt='Logo'
                        className='object-cover w-40 -mt-1 h-14'
                    /> */}
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
