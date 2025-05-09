"use client";
import { IContact, IMeta } from "@/types";
import { Pagination, Table, TableColumnsType } from "antd";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllContactMessage } from "@/services/ContactUs";
type TTableDataType = Pick<IContact, "name" | "contact" | "message">;
type IData = {
    result: IContact[];
    meta: IMeta;
};
const ManageContact = () => {
    const [message, setMessage] = useState<IData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    console.log(message);
    useEffect(() => {
        setLoading(true);
        (async () => {
            const data = await getAllContactMessage([
                { name: "page", value: page },
                { name: "limit", value: 10 },
                { name: "sort", value: "-createdAt" },
                { name: "searchTerm", value: searchTerm },
            ]);
            console.log(data);
            if (data) {
                setMessage({ result: data.data, meta: data.meta });
                setLoading(false);
            }
            setLoading(false);
        })();
    }, [searchTerm, page]);
    const tableData = message?.result?.map(
        ({ _id, name, contact, message }: IContact) => ({
            key: _id,
            name,
            contact,
            message,
        })
    );
    // Manage Product table data
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Name",
            render: (item) => <p className={`capitalize `}>{item?.name}</p>,
        },
        {
            title: "Contact Info",
            dataIndex: "contact",
        },
        {
            title: "Message",
            dataIndex: "message",
            width: "50%"
        },
    ];

    return (
        <div>
            <h2 className='text-center text-3xl xs:text-4xl secondary_font my-5 font-semibold'>
                Contact Message
            </h2>
            <div className='flex flex-wrap-reverse gap-5 my-5'>
                <div className='relative w-80 h-fit '>
                    <SearchIcon className='absolute top-1/2 right-2 w-5 text-gray-500 -translate-y-1/2' />
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type='text'
                        className='outline-0 bg-gray-200 w-full px-5 p-2 rounded-md'
                        placeholder='Search by name or email . . . .'
                    />
                </div>
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
                total={message?.meta?.total}
                pageSize={10}
                current={page}
            />
        </div>
    );
};

export default ManageContact;
