// "use client"
import SideBar from "@/components/shered/SideBar";
import { Layout } from "antd";
const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    // const { user, setIsLoading, setUser } = useUser();
    // const handleLogout = () => {
    //     logOutUser();
    //     setUser(null);
    //     setIsLoading(true);
    //     if (protectedRoutes.some((route) => pathname.match(route))) {
    //         router.push("/login");
    //     }
    // };
    // const UserItems: MenuProps["items"] = [
    //     {
    //         label: (
    //             <Link className='text-xl' to={`/dashboard/manage-profile`}>
    //                 My Profile
    //             </Link>
    //         ),
    //         key: "profile",
    //     },
    //     {
    //         label: (
    //             <div className='text-xl' onClick={() => handleLogOut()}>
    //                 Log out
    //             </div>
    //         ),
    //         key: "logout",
    //     },
    // ];
    // const userMenuProps = {
    //     items: UserItems,
    // };
    return (
        <div className=''>
            <Layout className='h-screen'>
                {/* Dashboard Sidebar  */}
                <SideBar />
                <Layout>
                    {/* Dashboard Body  */}
                    <div
                        className='h-screen overflow-auto p-2'
                        style={{ scrollbarWidth: "none" }}>
                        {/* <div className='w-full sticky z-0 bg-[#001529] py-3 flex justify-end pr-5'>
                            <div className='flex items-center gap-5 '>
                                <div className='text-gray-400 '>
                                    <h3 className='capitalize font-bold'>
                                        {user?.role}
                                    </h3>
                                    <h3 className='font-semibold z-0'>
                                        {user?.email}
                                    </h3>
                                </div>
                                <Dropdown
                                    trigger={["click"]}
                                    menu={userMenuProps}>
                                    <button className='cursor-pointer'>
                                        <FaRegUserCircle className='text-5xl text-primary' />
                                    </button>
                                </Dropdown>
                            </div>
                        </div> */}
                        {children}
                    </div>
                </Layout>
            </Layout>
        </div>
    );
};

export default DashboardLayout;
