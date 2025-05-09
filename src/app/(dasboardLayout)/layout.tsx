// "use client"
import DashboardNav from "@/components/shered/DashboardNav";
import SideBar from "@/components/shered/SideBar";
import { Layout } from "antd";
const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className=''>
            <Layout className='h-screen'>
                {/* Dashboard Sidebar  */}
                <SideBar />
                <Layout>
                    {/* Dashboard Body  */}
                    <div
                        className='h-screen overflow-auto'
                        style={{ scrollbarWidth: "none" }}>
                        <DashboardNav />
                        <div className='p-5'>{children}</div>
                    </div>
                </Layout>
            </Layout>
        </div>
    );
};

export default DashboardLayout;
