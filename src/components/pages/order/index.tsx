"use client";
import ViewOrderDetails from "@/components/shered/ui/ViewOrderDetails";
import { IOrder, IOrderProduct } from "@/types/order.type";
import { Spin } from "antd";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddReviewModal from "./AddReviewModal";

type IProps = {
    data: IOrder[];
};
const ManageOrder = ({ data }: IProps) => {
    console.log(data);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
 
    const reFetch: () => void = () => {};
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <div className='container my-10'>
            <Spin
                spinning={loading}
                tip='Loading...'
                size='large'
                className='w-full container'>
                {data?.length > 0 ? (
                    <div className='grid md:grid-cols-2 gap-5'>
                        {data?.map((order) => (
                            <div
                                key={order?._id}
                                className='border-2 flex flex-col justify-between rounded-xl p-2 md:p-4 border-gray-200'>
                                <div
                                    className={`grid  gap-3 ${
                                        order?.products?.length > 1
                                            ? "lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2"
                                            : "grid-cols-1"
                                    }`}>
                                    {order?.products?.map(
                                        (product: IOrderProduct) => (
                                            <div
                                                key={product?.product?._id}
                                                className='mt-4 flex items-center gap-1 xs:gap-3'>
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src={
                                                        product?.product?.image
                                                    }
                                                    alt=''
                                                    className='w-24 h-24 border border-gray-300 object-cover rounded-md'
                                                />
                                                <div className=''>
                                                    <Link
                                                        href={`/medicine/${product.product?._id}`}
                                                        className='text-lg font-semibold secondary_font'>
                                                        {product?.product?.name
                                                            ?.length > 13 &&
                                                        order?.products
                                                            ?.length > 1 ? (
                                                            <>
                                                                {product?.product?.name?.slice(
                                                                    0,
                                                                    13
                                                                )}
                                                                {"...."}
                                                            </>
                                                        ) : (
                                                            product?.product
                                                                ?.name
                                                        )}
                                                    </Link>
                                                    <p className='my-1 text-lg font-semibold '>
                                                        <span className='font-medium text-lg mr-2'>
                                                            {" "}
                                                            Price:
                                                        </span>
                                                        $
                                                        {
                                                            product?.product
                                                                ?.price
                                                        }
                                                    </p>
                                                    {order?.status ===
                                                    "Delivered" ? (
                                                        <AddReviewModal
                                                            product={
                                                                product.product
                                                            }
                                                        />
                                                    ) : (
                                                        <p className='my-1 text-lg font-semibold '>
                                                            <span className='font-medium text-lg mr-2'>
                                                                {" "}
                                                                Quantity:
                                                            </span>
                                                            {product?.quantity}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className=''>
                                    <div className='bg-primary/20 rounded-md p-3 mt-3'>
                                        <div className='grid grid-cols-2 justify-between gap-5 items-center '>
                                            <p className='text-lg'>Total: </p>
                                            <p className='text-lg font-medium'>
                                                ${order.totalPrice.toFixed(2)}
                                            </p>
                                        </div>{" "}
                                        <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                            <p className='text-lg'>
                                                Payment Status:{" "}
                                            </p>
                                            <p className='text-lg font-medium capitalize'>
                                                {order.paymentStatus}
                                            </p>
                                        </div>
                                        <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                            <p className='text-lg'>
                                                Order Status:{" "}
                                            </p>
                                            <p className='text-lg font-medium capitalize'>
                                                {order.status}
                                            </p>
                                        </div>
                                        <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                            <p className='text-lg'>
                                                Delivery Options:{" "}
                                            </p>
                                            <p className='text-lg font-medium capitalize'>
                                                {order.deliveryOptions}
                                            </p>
                                        </div>
                                        <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                            <p className='text-lg'>
                                                Order Date:{" "}
                                            </p>
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
                                            onClick={() => router.push("/shop")}
                                            className='w-full bg-primary hover:bg-primary  font-medium cursor-pointer py-2 px-4 rounded whitespace-nowrap'>
                                            Shop More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-center text-4xl py-20 text-gray-400'>
                        No order data available
                    </p>
                )}
            </Spin>
        </div>
    );
};

export default ManageOrder;
