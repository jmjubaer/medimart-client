/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { IProduct, IMeta } from "@/types";
import { Pagination, Table, TableColumnsType } from "antd";
import { LucideCirclePlus, SearchIcon, Trash2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import defaultImage from "@/assets/defaoult-medicine.avif";
import Image from "next/image";
import { deleteProduct, getAllProducts } from "@/services/Products";
import UpdateInstrumentModal from "./UpdateInstrumentModel";
import { CiCirclePlus } from "react-icons/ci";
type TTableDataType = Pick<
    IProduct,
    | "image"
    | "name"
    | "price"
    | "expiryDate"
    | "quantity"
    | "requiredPrescription"
    | "symptoms"
>;
type IData = {
    result: IProduct[];
    meta: IMeta;
};

const ManageInstrument = () => {
    const [data, setData] = useState<IData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFetch, setIsFetch] = useState<boolean>(false);
    const reFetch = () => {
        setIsFetch(!isFetch);
    };
    useEffect(() => {
        setLoading(true);
        (async () => {
            const { data } = await getAllProducts([
                { name: "page", value: page },
                { name: "limit", value: 10 },
                { name: "sort", value: "-_id" },
                { name: "searchTerm", value: searchTerm },
                { name: "type", value: "instrument" },
            ]);
            if (data) {
                setData(data);
                setLoading(false);
            }
            setLoading(false);
        })();
    }, [searchTerm, page, isFetch]);

    const tableData = data?.result?.map(
        ({
            _id,
            image,
            name,
            price,
            quantity,
            warrantyPeriod,
            brand,
        }: IProduct) => ({
            key: _id,
            image,
            name,
            price,
            quantity,
            warrantyPeriod,
            brand,
        })
    );
    // Manage Product table data
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Product",

            render: (item) => {
                return (
                    <div className='flex items-center gap-3'>
                        <Image
                            width={80}
                            height={80}
                            className='w-16 h-16 rounded-md border border-gray-300'
                            src={item.image || defaultImage}
                            alt=''
                        />
                        <div className=''>
                            <Link
                                href={`/medicine/${item.key}`}
                                className='text-lg font-medium'>
                                {item.name}
                            </Link>
                        </div>
                    </div>
                );
            },
        },
        {
            title: "Brand",
            render: (item) => <p className='min-w-[100px]'>{item.brand}</p>,
        },
        {
            title: "Warranty Period",
            // width: "1%",
            render: (item) => <div className=''>{item?.warrantyPeriod}</div>,
        },
        {
            title: "In Stock",
            render: (item) => <p>{item.quantity || 0} Pcs</p>,
        },
        {
            title: "Price",
            render: (item) => <p className='font-bold'>${item.price}</p>,
            // width: "1%"
        },
        {
            title: "Action",
            key: "role",
            render: (item) => {
                return (
                    <div className='flex items-center gap-3'>
                        <button
                            onClick={() => handleDeleteInstrument(item.key)}
                            className=' cursor-pointer text-red-500 '>
                            <Trash2 />
                        </button>
                        <UpdateInstrumentModal
                            reFetch={reFetch}
                            instrumentId={item.key}
                        />
                    </div>
                );
            },
            width: "1%",
        },
    ];
    // // delete product functionality
    const handleDeleteInstrument = async (id: string) => {
        Swal.fire({
            title: "Are you sure delete instrument?",
            // text: "Not can ",
            showCancelButton: true,
            confirmButtonText: "Confirm",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await deleteProduct(id);
                if (result?.success) {
                    reFetch();
                    Swal.fire("Deleted!", "", "success");
                }
            }
        });
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page, searchTerm]);
    return (
        <div>
            <h2 className='text-center text-3xl xs:text-4xl secondary_font my-5 font-semibold'>
                Manage Instrument
            </h2>
            <div className='flex flex-wrap-reverse gap-4 justify-between my-5'>
                <div className='flex flex-wrap-reverse items-center gap-5'>
                    <div className='relative w-72 xs:w-80 h-fit '>
                        <SearchIcon className='absolute top-1/2 right-2 w-5 text-gray-500 -translate-y-1/2' />
                        <input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type='text'
                            className='outline-0 bg-gray-200 w-full px-5 p-2 rounded-md'
                            placeholder='Search medicine . . . .'
                        />
                    </div>{" "}
                    {/* <div className='relative'>
                        <select
                            className='outline-0 text-base bg-gray-200 w-full px-5 p-2 rounded-md'
                            onChange={(e) => setFilterText(e.target.value)}>
                            <option value='false' className='capitalize'>
                                All Medicine
                            </option>{" "}
                            <option value='true' className=' capitalize'>
                                Low Stock Product
                            </option>
                        </select>
                    </div> */}
                </div>
                <Link
                    className='border-primary border-2 text-base rounded-md px-3 py-1 flex items-center gap-2'
                    href={"/admin/add-instrument"}>
                    <CiCirclePlus className='text-xl' /> Add Instrument
                </Link>
            </div>
            <div className='overflow-auto'>
                <Table<TTableDataType>
                    loading={loading}
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    className='border border-gray-300 min-w-[900px] rounded-lg mb-3'
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

export default ManageInstrument;
