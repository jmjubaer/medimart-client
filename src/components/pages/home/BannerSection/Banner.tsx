/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getAllMedicines } from "@/services/Medicines";
import { IMedicine, IMeta } from "@/types";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

type IData = {
    result: IMedicine[];
    meta: IMeta;
};
const Banner = () => {
    const [data, setData] = useState<IData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!searchTerm) {
            setData(null);
            return;
        }

        setLoading(true);
        (async () => {
            const params = [{ name: "searchTerm", value: searchTerm }];
            const { data } = await getAllMedicines(params);

            if (data) {
                setData(data);
            }
            setLoading(false);
        })();
    }, [searchTerm]);

    return (
        <section className='relative h-[500px] sm:h-[600px] flex'>
            <div className='absolute inset-0 z-0'>
                <Image
                    src='https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2000&auto=format&fit=crop'
                    alt='Medical Background'
                    fill
                    className='object-cover brightness-50'
                    priority
                />
            </div>
            <div className='container flex justify-center items-center px-1 sm:px-4 z-10 '>
                <div className='max-w-2xl text-white'>
                    <h1 className='sm:text-5xl text-3xl font-bold mb-6'>
                        Your Health, Our Priority
                    </h1>
                    <p className='sm:text-xl mb-8'>
                        Get your medicines delivered to your doorstep with just
                        a few clicks. Safe, reliable, and convenient.
                    </p>
                    <div className='relative bg-white rounded-full shadow-lg'>
                        <input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type='text'
                            placeholder='Search for medicines...'
                            className='w-full px-6 py-2 sm:py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary'
                        />
                        <button className='absolute  right-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 sm:p-3 rounded-full hover:bg-primary/90 transition-colors'>
                            <Search className='sm:w-5 sm:h-5 w-4 h-4 bg-black size-5' />
                        </button>

                        {/* search result  */}
                        <div className='w-[93%] left-[3.5%] h-[200px] overflow-auto absolute'>
                            {data?.result?.map((medicine: IMedicine) => (
                                <Link
                                    href={`/medicine/:${medicine._id}`}
                                    key={medicine._id}>
                                    <div className='px-5 py-1 bg-white text-gray-700 border flex  justify-between gap-6'>
                                        <div className='flex item-stretch gap-3'>
                                            <Image
                                                src={medicine.image}
                                                width={50}
                                                height={50}
                                                className='w-12 h-8'
                                                alt={medicine.name}
                                            />
                                            <p className='font-semibold'>
                                                {medicine.name}
                                            </p>
                                        </div>
                                        <CiSearch className='text-2xl' />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
