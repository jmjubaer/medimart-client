// "use client"
import SideBar from "@/components/shered/SideBar";
import { Layout } from "antd";
const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className=''>
            
            <Layout className='h-[calc(100vh-68px)]'>
                {/* Dashboard Sidebar  */}
                <SideBar />
                <Layout>
                    {/* Dashboard Body  */}
                    <div
                        className='h-[calc(100vh-69px)] overflow-auto p-2'
                        style={{ scrollbarWidth: "none" }}>
                        {children}
                    </div>
                </Layout>
            </Layout>
        </div>
    );
};

export default DashboardLayout;
