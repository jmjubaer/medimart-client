"use client";
import { IMeta } from "@/types";
import { IOrder, IOrderProduct } from "@/types/order.type";
import { Pagination, Table, TableColumnsType } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import COD from "@/assets/cod-BP-tEaJX.png";
import SHP from "@/assets/shurjoPay-DP4CfkPU.png";
import ViewOrderDetails from "@/components/shered/ui/ViewOrderDetails";
import ChangeStatusModal from "./ChangeStatusModal";
import { getAllOrders } from "@/services/OrderServices";
type IData = {
    result: IOrder[];
    meta: IMeta;
};
type TTableDataType = Pick<
    IOrder,
    | "products"
    | "user"
    | "deliveryOptions"
    | "paymentMethod"
    | "status"
    | "paymentStatus"
    | "totalPrice"
    | "deliveryInfo"
    | "rejectNotes"
>;
// TODO: Show user order history
const ManageCustomerOrder = () => {
    const [data, setData] = useState<IData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("");
    const [deliveryOptions, setDeliveryOptions] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [isFetch, setIsFetch] = useState<boolean>(false);

    const tableData = data?.result?.map(
        ({
            _id,
            user,
            status,
            products,
            totalPrice,
            rejectNotes,
            deliveryInfo,
            paymentStatus,
            paymentMethod,
            deliveryOptions,
        }: IOrder) => ({
            key: _id,
            user,
            status,
            products,
            totalPrice,
            rejectNotes,
            deliveryInfo,
            paymentMethod,
            deliveryOptions,
            paymentStatus,
        })
    );
    const reFetch = () => {
        setIsFetch(!isFetch);
    };
    useEffect(() => {
        setLoading(true);
        (async () => {
            const { data } = await getAllOrders([
                { name: "page", value: page },
                { name: "limit", value: 10 },
                { name: "sort", value: "_id" },
                ...(status ? [{ name: "status", value: status }] : []),
                ...(deliveryOptions
                    ? [{ name: "deliveryOptions", value: deliveryOptions }]
                    : []),
                ...(paymentStatus
                    ? [{ name: "paymentStatus", value: paymentStatus }]
                    : []),
            ]);
            if (data) {
                setData(data);
                setLoading(false);
            }
            setLoading(false);
        })();
    }, [page, status, isFetch, deliveryOptions, paymentStatus]);
    // Manage Product table data
    console.log(data);
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Product Name",
            render: (item) => (
                <div className={`capitalize `}>
                    {item?.products?.map((p: IOrderProduct) => (
                        <Link
                            className='block text-lg'
                            key={p?.product?._id}
                            href={`/medicine/${item?.key}`}>
                            {p?.product?.name}
                            <span className='text-gray-500 text-base ml-2'>
                                x{p?.quantity}
                            </span>
                        </Link>
                    ))}
                </div>
            ),
        },
        {
            title: "User Name",
            width: "10%",
            render: (item) => (
                <p className={`capitalize w-[100px]`}>{item?.user?.name}</p>
            ),
        },
        {
            title: "Delivery Options",
            width: "10%",

            render: (item) => (
                <p className={` capitalize}`}>{item?.deliveryOptions}</p>
            ),
        },
        {
            title: "Payment Method",
            render: (item) => (
                <div className={` capitalize `}>
                    {item?.paymentMethod === "COD" ? (
                        <Image width={80} src={COD} alt='Payment method' />
                    ) : (
                        <Image width={100} src={SHP} alt='Payment method' />
                    )}
                </div>
            ),
        },
        {
            title: "Order Status",
            width: "10%",

            render: (item) => <p className={`capitalize}`}>{item?.status}</p>,
        },
        {
            title: "Payment Status",
            width: "10%",

            render: (item) => (
                <p className='capitalize'>{item?.paymentStatus}</p>
            ),
        },
        {
            title: "Total Price",
            render: (item) => (
                <p className='w-24 capitalize font-bold text-lg'>
                    ${item?.totalPrice.toFixed(2)}
                </p>
            ),
            width: "1%",
        },
        {
            title: "Action",
            key: "role",
            render: (item) => {
                return (
                    <div className='flex items-center gap-3'>
                        <ChangeStatusModal
                            reFetch={reFetch}
                            status={item?.status}
                            id={item?.key}
                        />

                        <ViewOrderDetails
                            isDashboard={true}
                            reFetch={reFetch}
                            item={item}
                        />
                    </div>
                );
            },
            width: "1%",
        },
    ];

    return (
        <div>
            <h2 className='text-center text-3xl xs:text-4xl secondary_font my-5 font-semibold'>
                Manage Orders
            </h2>
            <div className='flex justify-center xs:justify-normal flex-wrap-reverse gap-5 my-5'>
                <div className='relative'>
                    <select
                        className='outline-0 text-base bg-gray-200 w-full px-5 p-2 rounded-md'
                        onChange={(e) => setStatus(e.target.value)}>
                        <option value='' className='capitalize'>
                            All Order
                        </option>{" "}
                        <option value='Pending' className=' capitalize'>
                            Pending Order
                        </option>
                        <option value='Reject' className=' capitalize'>
                            Reject Order
                        </option>
                        <option value='Processing' className=' capitalize'>
                            Processing Order
                        </option>
                        <option value='Shipped' className=' capitalize'>
                            Shipped Order
                        </option>
                        <option value='Delivered' className=' capitalize'>
                            Delivered Order
                        </option>
                    </select>
                </div>
                <div className='relative'>
                    <select
                        className='outline-0 text-base bg-gray-200 w-full px-5 p-2 rounded-md'
                        onChange={(e) => setDeliveryOptions(e.target.value)}>
                        <option value='' className='capitalize'>
                            All Order
                        </option>{" "}
                        <option value='Standard' className=' capitalize'>
                            Standard Delivery
                        </option>
                        <option value='Express' className=' capitalize'>
                            Express Delivery
                        </option>
                        <option
                            value='Pickup from Store'
                            className=' capitalize'>
                            Pickup from Store
                        </option>
                    </select>
                </div>
                <div className='relative'>
                    <select
                        className='outline-0 text-base bg-gray-200 w-full px-5 p-2 rounded-md'
                        onChange={(e) => setPaymentStatus(e.target.value)}>
                        <option value='' className='capitalize'>
                            All Order
                        </option>{" "}
                        <option value='paid' className=' capitalize'>
                            Payment Paid
                        </option>
                        <option value='unpaid' className=' capitalize'>
                            Payment Unpaid
                        </option>
                    </select>
                </div>
            </div>
            <div className='overflow-auto'>
                <Table<TTableDataType>
                    loading={loading}
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    className='border border-gray-300 min-w-[950px] rounded-lg mb-3'
                />
            </div>
            <Pagination
                onChange={(value) => setPage(value)}
                total={data?.meta?.total}
                pageSize={10}
                current={page}
            />
        </div>
    );
};

export default ManageCustomerOrder;
