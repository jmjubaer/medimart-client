"use client";
//eslint-skip-disable
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { IInstrument } from "@/types";
import Link from "next/link";
import { Spin } from "antd";
import InstrumentCard from "@/components/shered/ui/InstrumentCard";
import { getAllProducts } from "@/services/Products";



const HealthInstrumentSection = () => {
    const [data, setData] = useState<IInstrument[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getAllProducts([
                    { name: "limit", value: 8 },
                    { name: "sort", value: "-createdAt" },
                    { name: "type", value: "instrument" },
                    {
                        name: "fields",
                        value: "manufacturerDetails,image,price,quantity,name",
                    },
                ]);
                if (data.success) {
                    setData(data.data?.result);
                }
            } catch (err) {
                console.error("Error fetching instrument:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section className='pb-16 bg-background'>
            <div className='container px-2 sm:px-4 mx-auto'>
                <div className='max-w-3xl mx-auto text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-bold mb-4 tracking-tight'>
                        Essential Health Instruments
                    </h2>
                    <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
                        Explore our range of trusted health instruments designed
                        for everyday care and safety
                    </p>
                </div>
                <Spin
                    spinning={loading}
                    tip='Loading...'
                    size='large'
                    className='w-full container'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {data?.map((instrument, index) => (
                            <InstrumentCard
                                key={index}
                                instrument={instrument}
                            />
                        ))}
                    </div>
                </Spin>
            </div>
            <Link href='/shop'>
                <button className='mt-8 mx-auto flex items-center justify-center gap-2 px-4 py-2 border border-primary rounded-md text-primary hover:text-primary/80 hover:border-primary/80 transition-colors'>
                    View All
                    <ArrowRight className='w-4 h-4' />
                </button>
            </Link>
        </section>
    );
};

export default HealthInstrumentSection;
