"use client";
import { IMeta } from "@/types";
import { IOrder, IProduct } from "@/types/order.type";
import { Pagination, Table, TableColumnsType } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import COD from "@/assets/cod-BP-tEaJX.png";
import SHP from "@/assets/shurjoPay-DP4CfkPU.png";
import ViewOrderDetails from "@/components/shered/ViewOrderDetails";
import { LuRepeat } from "react-icons/lu";
type IProps = {
    data: {
        result: IOrder[];
        meta: IMeta;
    };
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
const ManageCustomerOrder = ({ data }: IProps) => {
    const [page, setPage] = useState(1);
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
    // Manage Product table data
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Product Name",
            render: (item) => (
                <div className={`capitalize `}>
                    {item?.products?.map((p: IProduct) => (
                        <Link
                            className='block text-lg'
                            key={p?.medicine?._id}
                            href={`/medicine/${item?.key}`}>
                            {p?.medicine?.name}
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
            render: (item) => (
                <p className={`capitalize `}>{item?.user?.name}</p>
            ),
        },
        {
            title: "Delivery Options",
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
            render: (item) => <p className={`capitalize}`}>{item?.status}</p>,
        },
        {
            title: "Payment Status",
            render: (item) => (
                <p className='capitalize'>{item?.paymentStatus}</p>
            ),
        },
        {
            title: "Total Price",
            render: (item) => (
                <p className='capitalize font-bold text-lg'>
                    ${item?.totalPrice}
                </p>
            ),
        },
        {
            title: "Action",
            key: "role",
            render: (item) => {
                return (
                    <div className='flex items-center gap-3'>
                        <button
                            // onClick={() => setOpen(true)}
                            title='Change Status'
                            className='cursor-pointer text-2xl text-green-600'>
                            <LuRepeat />
                        </button>
                        <ViewOrderDetails item={item} />
                    </div>
                );
            },
            width: "1%",
        },
    ];

    return (
        <div>
            <h2 className='text-center text-3xl xs:text-4xl secondary_font my-5 font-semibold'>
                Manage Users
            </h2>

            <div className='overflow-auto'>
                <Table<TTableDataType>
                    // loading={loading}
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    className='border border-gray-300 min-w-[800px] rounded-lg mb-3'
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
