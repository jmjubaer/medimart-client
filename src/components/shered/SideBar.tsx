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
            key: "/dashboard/manage-products",
            label: <Link href={`/admin/orders`}>Manage Orders</Link>,
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
