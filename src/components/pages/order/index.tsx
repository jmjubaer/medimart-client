"use client";
import ViewOrderDetails from "@/components/shered/ViewOrderDetails";
import { IOrder, IProduct } from "@/types/order.type";
import { Spin } from "antd";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type IProps = {
    data: IOrder[];
};
const ManageOrder = ({ data }: IProps) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    
    const reFetch = () => {
      
    };
    if(data?.length> 0){
        setLoading(false)
    }
    return (
        <div className='container'>
            <Spin
                spinning={loading}
                tip='Loading...'
                size='large'
                className='w-full container'>
                <div className='grid grid-cols-2 gap-5'>
                    {data?.map((order) => (
                        <div
                            key={order?._id}
                            className='border-2 rounded-xl p-2 md:p-4 border-gray-200'>
                            <div className='flex flex-col xs:flex-row sm:items-center gap-3'>
                                {order?.products?.map((product: IProduct) => (
                                    <div
                                        key={product?.medicine?._id}
                                        className='mt-4 flex items-center gap-3 xs:gap-5'>
                                        <Image
                                            width={100}
                                            height={100}
                                            src={product?.medicine?.image}
                                            alt=''
                                            className='w-28 h-28 border border-gray-300 object-cover rounded-md'
                                        />
                                        <div className=''>
                                            <h3 className='text-xl font-semibold secondary_font'>
                                                {product?.medicine?.name}
                                            </h3>
                                            <p className='my-1 text-xl font-semibold '>
                                                <span className='font-medium text-lg mr-2'>
                                                    {" "}
                                                    Price:
                                                </span>
                                                ${product?.medicine?.price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='bg-primary/20 rounded-md p-3 mt-3'>
                                <div className='grid grid-cols-2 justify-between gap-5 items-center '>
                                    <p className='text-lg'>Total: </p>
                                    <p className='text-lg font-medium'>
                                        ${order.totalPrice}
                                    </p>
                                </div>{" "}
                                <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                    <p className='text-lg'>Payment Status: </p>
                                    <p className='text-lg font-medium capitalize'>
                                        {order.paymentStatus}
                                    </p>
                                </div>
                                <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                    <p className='text-lg'>Order Status: </p>
                                    <p className='text-lg font-medium capitalize'>
                                        {order.status}
                                    </p>
                                </div>
                                <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                    <p className='text-lg'>Order Date: </p>
                                    <p className='text-lg font-medium capitalize'>
                                        {moment(order.createdAt).format(
                                            "DD MMM YYYY"
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className=' grid grid-cols-2 gap-5 mt-3'>
                                <ViewOrderDetails
                                    reFetch={reFetch}
                                    item={order}
                                />
                                <button
                                    onClick={() =>
                                        router.push(`/`)
                                    }
                                    className='w-full bg-primary hover:bg-primary  font-medium cursor-pointer py-2 px-4 rounded whitespace-nowrap'>
                                    Buy Again
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Spin>
        </div>
    );
};

export default ManageOrder;
