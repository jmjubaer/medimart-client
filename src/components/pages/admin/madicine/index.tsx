/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { IMedicine, IMeta } from "@/types";
import { Pagination, Table, TableColumnsType } from "antd";
import { LucideCirclePlus, SearchIcon, Trash2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import defaultImage from "@/assets/defaoult-medicine.avif";
import Image from "next/image";
import { getSingleMedicine, getAllMedicines } from "@/services/Medicines";
import AddMedicineModal from "./AddMedicineModal";
import UpdateMedicineModal from "./UpdateMedicineModal";
type TTableDataType = Pick<
    IMedicine,
    | "image"
    | "name"
    | "price"
    | "expiryDate"
    | "quantity"
    | "requiredPrescription"
    | "symptoms"
>;
type IData = {
    result: IMedicine[];
    meta: IMeta;
};
const ManageMedicines = () => {
    const [data, setData] = useState<IData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isFetch, setIsFetch] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [filterText, setFilterText] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const reFetch = () => {
        setIsFetch(!isFetch);
    };
    useEffect(() => {
        setLoading(true);
        (async () => {
            const { data } = await getAllMedicines([
                { name: "page", value: page },
                { name: "limit", value: 10 },
                { name: "sort", value: "_id" },
                { name: "searchTerm", value: searchTerm },
                ...(filterText === "true" ? [{ name: "lowStock", value: "true" }] : []),
            ]);
            if (data) {
                setData(data);
                setLoading(false);
            }
            setLoading(false);
        })();
    }, [searchTerm, page, isFetch, filterText]);

    const tableData = data?.result?.map(
        ({
            _id,
            image,
            name,
            price,
            quantity,
            requiredPrescription,
            expiryDate,
            symptoms,
        }: IMedicine) => ({
            key: _id,
            image,
            name,
            price,
            quantity,
            symptoms,
            requiredPrescription,
            expiryDate,
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
            title: "Expiry Date",
            render: (item) => (
                <p>{moment(item.expiryDate).format("DD-MM-YYYY")}</p>
            ),
        },
        {
            title: "Prescription Required",
            // width: "1%",
            render: (item) => (
                <div className=''>
                    {item?.requiredPrescription ? (
                        <p className='px-3 py-1 bg-green-200 text-gray-500 w-fit rounded-md font-semibold'>
                            True
                        </p>
                    ) : (
                        <p className='px-3 py-1 bg-red-200  w-fit rounded-md font-semibold'>
                            False
                        </p>
                    )}
                </div>
            ),
        },
        {
            title: "Symptoms",
            dataIndex: "symptoms",
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
                            onClick={() => handleDeleteMedicine(item.key)}
                            className=' cursor-pointer text-red-500 '>
                            <Trash2 />
                        </button>
                        <UpdateMedicineModal
                            reFetch={reFetch}
                            medicineId={item.key}
                        />
                    </div>
                );
            },
            width: "1%",
        },
    ];
    // // delete product functionality
    const handleDeleteMedicine = async (id: string) => {
        Swal.fire({
            title: "Are you sure delete medicine?",
            // text: "Not can ",
            showCancelButton: true,
            confirmButtonText: "Confirm",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await getSingleMedicine(id);
                if (result?.success) {
                    reFetch();
                    Swal.fire("Deleted!", "", "success");
                }
            }
        });
    };
    return (
        <div>
            <h2 className='text-center text-3xl xs:text-4xl secondary_font my-5 font-semibold'>
                Manage Medicine
            </h2>
            <div className='flex flex-wrap-reverse gap-4 justify-between my-5'>
                <div className='flex items-center gap-5'>
                    <div className='relative w-80 h-fit '>
                        <SearchIcon className='absolute top-1/2 right-2 w-5 text-gray-500 -translate-y-1/2' />
                        <input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type='text'
                            className='outline-0 bg-gray-200 w-full px-5 p-2 rounded-md'
                            placeholder='Search medicine . . . .'
                        />
                    </div>{" "}
                    <div className='relative'>
                        <select
                            className='outline-0 text-base bg-gray-200 w-full px-5 p-2 rounded-md'
                            onChange={(e) => setFilterText(e.target.value)}>
                            <option value='false' className='capitalize'>
                                All Medicine
                            </option>{" "}
                            <option
                                value='true'
                                className=' capitalize'>
                                Low Stock Medicine
                            </option>
                        </select>
                    </div>
                </div>
                <AddMedicineModal reFetch={reFetch} />
            </div>
            <div className='overflow-auto'>
                <Table<TTableDataType>
                    loading={loading}
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

export default ManageMedicines;
