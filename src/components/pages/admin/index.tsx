"use client";
import { useRouter } from "next/navigation";
import CountUp from "react-countup";
import { BsShop } from "react-icons/bs";
import { FaMoneyBillWave, FaUserFriends } from "react-icons/fa";
import { MdAddShoppingCart, MdOutlinePendingActions } from "react-icons/md";
import { PiWarningOctagonLight } from "react-icons/pi";
type IProps = {
    data: {
        orderCount: number;
        pendingOrdersCount: number;
        userCount: number;
        productCount: number;
        lowStockProductCount: number;
        totalRevenue: number;
    };
};
const OverviewPage = ({ data }: IProps) => {
    const router = useRouter();
    return (
        <div>
            <div className='grid overflow-hidden xs:grid-cols-2 md:grid-cols-3 gap-5'>
                {/* Total Orders */}
                <div
                    onClick={() => router.push("/admin/orders")}
                    className='border-2 bg-teal-100 border-gray-300 gap-2 rounded-md hover:shadow-xl flex flex-col items-center justify-center p-5 h-60 cursor-pointer'>
                    <div className='w-16 h-16 rounded-full flex items-center justify-center bg-gray-300'>
                        <MdAddShoppingCart className='text-4xl ' />
                    </div>
                    <h3 className='secondary_font font-bold text-6xl text-gray-600'>
                        <CountUp
                            end={data?.orderCount > 0 ? data?.orderCount : 0}
                        />
                    </h3>
                    <p className='font-medium text-2xl'>Total Orders</p>
                </div>

                {/* Pending order */}
                <div
                    onClick={() => router.push("/admin/orders")}
                    className='border-2 bg-[#fff200]/20 border-gray-300 gap-2 rounded-md hover:shadow-xl flex flex-col items-center justify-center p-5 h-60 cursor-pointer'>
                    <div className='w-16 h-16 rounded-full flex items-center justify-center bg-gray-300'>
                        <MdOutlinePendingActions className='text-4xl ' />
                    </div>
                    <h3 className='secondary_font font-bold text-6xl text-gray-600'>
                        <CountUp
                            end={
                                data?.pendingOrdersCount > 0
                                    ? data?.pendingOrdersCount
                                    : 0
                            }
                        />
                    </h3>
                    <p className='font-medium text-xl'>Pending Order</p>
                </div>

                {/* Total revenue */}
                <div className='border-2 bg-fuchsia-100 border-gray-300 gap-2 rounded-md hover:shadow-xl flex flex-col items-center justify-center p-5 h-60'>
                    <div className='w-16 h-16 rounded-full flex items-center justify-center bg-gray-300'>
                        <FaMoneyBillWave className='text-4xl ' />
                    </div>
                    <h3 className='secondary_font font-bold text-5xl text-gray-600'>
                        $
                        <CountUp
                            end={
                                data?.totalRevenue > 0 ? data?.totalRevenue : 0
                            }
                        />
                    </h3>
                    <p className='font-medium text-xl'>Total Seals</p>
                </div>

                {/* Total Product */}
                <div
                    onClick={() => router.push("/admin/medicines")}
                    className='border-2 bg-sky-100 border-gray-300 gap-2 rounded-md hover:shadow-xl flex flex-col items-center justify-center p-5 h-60 cursor-pointer'>
                    <div className='w-16 h-16 rounded-full flex items-center justify-center bg-gray-300'>
                        <BsShop className='text-4xl ' />
                    </div>
                    <h3 className='secondary_font font-bold text-6xl text-gray-600'>
                        <CountUp
                            end={
                                data?.productCount > 0 ? data?.productCount : 0
                            }
                        />
                    </h3>
                    <p className='font-medium text-xl'>Total Products</p>
                </div>

                {/* Low stock product */}
                <div
                    onClick={() => router.push("/admin/medicines")}
                    className='border-2 bg-[#ff4d4d]/20 border-gray-300 gap-2 rounded-md hover:shadow-xl flex flex-col items-center justify-center p-5 h-60 cursor-pointer'>
                    <div className='w-16 h-16 rounded-full flex items-center justify-center bg-gray-300'>
                        <PiWarningOctagonLight className='text-5xl font-black text-red-500' />
                    </div>
                    <h3 className='secondary_font font-bold text-6xl text-gray-600'>
                        <CountUp
                            end={
                                data?.lowStockProductCount > 0
                                    ? data?.lowStockProductCount
                                    : 0
                            }
                        />
                    </h3>
                    <p className='font-medium text-xl'>Total Orders</p>
                </div>

                {/* Total user */}
                <div
                    onClick={() => router.push("/admin/users")}
                    className='border-2 bg-primary/30 border-gray-300 gap-2 rounded-md hover:shadow-xl flex flex-col items-center justify-center p-5 h-60 cursor-pointer'>
                    <div className='w-16 h-16 rounded-full flex items-center justify-center bg-gray-300'>
                        <FaUserFriends className='text-4xl ' />
                    </div>
                    <h3 className='secondary_font font-bold text-6xl text-gray-600'>
                        <CountUp
                            end={data?.userCount > 0 ? data?.userCount : 0}
                        />
                    </h3>
                    <p className='font-medium text-xl'>Total Users</p>
                </div>
            </div>
        </div>
    );
};

export default OverviewPage;
