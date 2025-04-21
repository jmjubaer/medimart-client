/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, Empty, Spin } from "antd";
import { IMedicine, IMeta } from "@/types";
import { getAllMedicines } from "@/services/Medicines";
import { SearchIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hook";
import { addToCart } from "@/redux/features/cart/cartSlice";

type IData = {
    result: IMedicine[];
    meta: IMeta;
};

const ShopComponent = () => {
    const [data, setData] = useState<IData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [requiredPrescription, setRequiredPrescription] =
        useState<boolean>(false);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        setLoading(true);
        (async () => {
            const params = [
                { name: "page", value: page },
                { name: "limit", value: 10 },
                { name: "sort", value: "_id" },
                { name: "searchTerm", value: searchTerm },
                { name: "requiredPrescription", value: requiredPrescription },
            ];

            if (minPrice > 0) {
                params.push({ name: "minPrice", value: minPrice });
            }
            if (maxPrice > 0) {
                params.push({ name: "maxPrice", value: maxPrice });
            }

            const { data } = await getAllMedicines(params);

            if (data) {
                setData(data);
                setLoading(false);
            }
            setLoading(false);
        })();
    }, [searchTerm, page, requiredPrescription, minPrice, maxPrice]);
    return (
        <div className='bg-gray-50'>
            <div className='container min-h-screen py-10'>
                <h1 className='text-3xl font-bold text-gray-800 mb-6'>
                    Medicine Shop
                </h1>

                <div className='flex gap-5 flex-wrap relative'>
                    {/* filters */}
                    <div className='w-full sm:max-w-[250px] sticky top-[10%] max-h-screen'>
                        <h3 className='text-xl font-bold text-[#383546] mb-5'>
                            Filters
                        </h3>

                        <div className='border p-3 border-gray-100 shadow-xs rounded-xl bg-white'>
                            <h3 className='text-base font-bold text-[#383546] mb-5 pb-2 border-b border-b-gray-200'>
                                Search
                            </h3>
                            <div className='relative w-full h-fit mb-8'>
                                <SearchIcon className='absolute top-1/2 right-2 w-5 text-gray-500 -translate-y-1/2' />
                                <input
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    type='text'
                                    className='outline-0 bg-gray-200 w-full px-5 p-2 rounded-md'
                                    placeholder='Search medicine . . . .'
                                />
                            </div>

                            <label className='flex items-center justify-between mb-8 cursor-pointer'>
                                <input
                                    onChange={(e) =>
                                        setRequiredPrescription(
                                            !requiredPrescription
                                        )
                                    }
                                    type='checkbox'
                                    className='sr-only peer'
                                    checked={requiredPrescription}
                                />
                                <span className='text-sm font-medium text-gray-900'>
                                    Required Prescription
                                </span>
                                <div className="relative w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>

                            <h3 className='text-base font-bold text-[#383546] mb-5 pb-2 border-b border-b-gray-200'>
                                Price Range
                            </h3>
                            <div className='flex items-center gap-2'>
                                <input
                                    onChange={(e) =>
                                        setMinPrice(Number(e.target.value))
                                    }
                                    type='number'
                                    min='0'
                                    className='outline-0 bg-gray-200 w-full px-5 p-2 rounded-md'
                                    placeholder='Min'
                                />
                                to
                                <input
                                    onChange={(e) =>
                                        setMaxPrice(Number(e.target.value))
                                    }
                                    type='number'
                                    min='0'
                                    className='outline-0 bg-gray-200 w-full px-5 p-2 rounded-md'
                                    placeholder='Max'
                                />
                            </div>
                        </div>
                    </div>

                    {/* products */}
                    <div className='flex-1'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {loading ? (
                                <div className='flex justify-center items-center sm:col-span-2 lg:col-span-3 h-[50vh]'>
                                    <Spin size='large' />
                                </div>
                            ) : !data?.result?.length ? (
                                <div className='flex justify-center items-center sm:col-span-2 lg:col-span-3 h-[50vh]'>
                                    <Empty />
                                </div>
                            ) : (
                                data?.result?.map((medicine: IMedicine) => (
                                    <Card
                                        loading={loading}
                                        key={medicine._id}
                                        hoverable
                                        cover={
                                            <div className='h-48 bg-gray-100 flex items-center justify-center'>
                                                <Image
                                                    alt={medicine.name}
                                                    src={medicine.image}
                                                    width={500}
                                                    height={500}
                                                    className='object-cover w-full h-full'
                                                />
                                            </div>
                                        }
                                        className='h-full flex flex-col overflow-hidden'>
                                        <div className='flex-grow'>
                                            <div className='flex justify-between items-start mb-2'>
                                                <Link
                                                    href={`/medicine/${medicine._id}`}
                                                    className='font-semibold text-lg'>
                                                    {medicine.name}
                                                </Link>
                                                <span className='font-bold text-blue-600'>
                                                    ${medicine.price.toFixed(2)}
                                                </span>
                                            </div>

                                            <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                                                {medicine.description}
                                            </p>

                                            <div className='text-sm text-gray-500 space-y-1'>
                                                <p>
                                                    Manufacturer:{" "}
                                                    {
                                                        medicine
                                                            .manufacturerDetails
                                                            .name
                                                    }
                                                </p>
                                                <p
                                                    className={
                                                        medicine.quantity > 0
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }>
                                                    {medicine.quantity > 0
                                                        ? `In Stock (${medicine.quantity})`
                                                        : "Out of Stock"}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    addToCart({
                                                        product: medicine,
                                                        quantity: 1,
                                                    })
                                                )
                                            }
                                            className='flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-all font-medium text-sm mt-5 w-full cursor-pointer hover:gap-3'
                                            disabled={medicine.quantity <= 0}>
                                            <ShoppingCart size={18} />
                                            Add to Cart
                                        </button>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopComponent;
