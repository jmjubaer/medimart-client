/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { IMedicine, IMeta, IUser } from "@/types";
import { Pagination, Table, TableColumnsType } from "antd";
import { ClipboardList, SearchIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getSingleMedicine } from "@/services/Medicines";
import UpdateMedicineModal from "../madicine/UpdateMedicineModal";
import AddMedicineModal from "../madicine/AddMedicineModal";
import {
    changeUserStatus,
    deleteUser,
    getAllUsers,
} from "@/services/UserServices";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
type TTableDataType = Pick<
    IUser,
    "name" | "email" | "phone" | "role" | "status"
>;
type IData = {
    result: IUser[];
    meta: IMeta;
};
const ManageUsers = () => {
    const [users, setUsers] = useState<IData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isFetch, setIsFetch] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const reFetch = () => {
        setIsFetch(!isFetch);
    };

    useEffect(() => {
        setLoading(true);
        (async () => {
            const { data } = await getAllUsers([
                { name: "page", value: page },
                { name: "limit", value: 10 },
                { name: "sort", value: "_id" },
                { name: "searchTerm", value: searchTerm },
            ]);
            if (data) {
                setUsers(data);
                setLoading(false);
            }
            setLoading(false);
        })();
    }, [searchTerm, page, isFetch]);
    const tableData = users?.result?.map(
        ({ _id, name, email, phone, role, status }: IUser) => ({
            key: _id,
            name,
            email,
            phone,
            role,
            status,
        })
    );
    // Manage Product table data
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Status",
            // width: "1%",
            render: (item) => (
                <p
                    className={`px-3 capitalize py-1 text-gray-500 w-fit rounded-md font-semibold ${
                        item?.status === "active"
                            ? "bg-green-200"
                            : "bg-red-200"
                    }`}>
                    {item?.status}
                </p>
            ),
        },
        {
            title: "Role",
            // width: "1%",
            render: (item) => <p className={` capitalize `}>{item?.role}</p>,
        },
        {
            title: "Action",
            key: "role",
            render: (item) => {
                return (
                    <div className='flex items-center gap-3'>
                        <button
                            title={
                                item?.status === "active"
                                    ? "BLock the user"
                                    : "Unblock the user"
                            }
                            onClick={() =>
                                handleChangeStatus(item.key, item?.status)
                            }
                            className=' cursor-pointer  '>
                            {item?.status === "active" ? (
                                <MdBlock className='text-2xl mt-px text-red-500' />
                            ) : (
                                <CgUnblock className='text-3xl text-green-600' />
                            )}
                        </button>

                        <Link
                            title='Show order history'
                            href={`/order?userId=${item?.key}`}
                            className=' cursor-pointer '>
                            <ClipboardList className='text-primary' />
                        </Link>

                        <button
                            title='Delete the user'
                            onClick={() => handleDeleteUser(item.key)}
                            className=' cursor-pointer text-red-500 '>
                            <Trash2 />
                        </button>
                    </div>
                );
            },
            width: "1%",
        },
    ];
    // // delete product functionality
    const handleDeleteUser = async (id: string) => {
        Swal.fire({
            title: "Are you sure delete the user?",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await deleteUser(id);
                if (result?.success) {
                    reFetch();
                    Swal.fire("Deleted!", "", "success");
                }
            }
        });
    };
    const handleChangeStatus = async (id: string, status: string) => {
        Swal.fire({
            title: `${
                status === "active"
                    ? "Are you sure block the user"
                    : "Are you sure unblock the user"
            }`,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updatedStatus =
                    status == "active" ? "deactivated" : "active";
                const result = await changeUserStatus(id, updatedStatus);
                console.log(updatedStatus);
                console.log(result);
                if (result?.success) {
                    reFetch();
                    Swal.fire("Updated!", "", "success");
                }
            }
        });
    };
    return (
        <div>
            <h2 className='text-center text-3xl xs:text-4xl secondary_font my-5 font-semibold'>
                Manage Users
            </h2>
            <div className='flex flex-wrap-reverse gap-4 justify-between my-5'>
                <div className='relative w-80 h-fit '>
                    <SearchIcon className='absolute top-1/2 right-2 w-5 text-gray-500 -translate-y-1/2' />
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type='text'
                        className='outline-0 bg-gray-200 w-full px-5 p-2 rounded-md'
                        placeholder='Search by name or email . . . .'
                    />
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
                total={users?.meta?.total}
                pageSize={10}
                current={page}
            />
        </div>
    );
};

export default ManageUsers;
