"use client";
import Lottie from "lottie-react";
import pending from "@/assets/animation/pending.json";
import failed from "@/assets/animation/failed.json";
import success from "@/assets/animation/success.json";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifiedPayment } from "@/services/OrderServices";
const VerifyPaymentPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const order_id = searchParams.get("order_id");

    // Verify payment query
    useEffect(() => {
        (async () => {
            setLoading(true);
            const data = await verifiedPayment(order_id as string);
            if (data?.success) {
                setData(data);
                setLoading(false);
            }
            setLoading(false);
        })();
    }, [order_id]);

    // Navigate after verify payment
    if (!loading) {
        setTimeout(() => {
            router.push("/orders");
        }, 1000);
    }
    return (
        <div className='flex items-center justify-center overflow-hidden h-[calc(100vh-70px)]'>
            <div className='md:w-1/2'>
                {loading ? (
                    <Lottie animationData={pending} loop={true} />
                ) : data?.success ? (
                    <Lottie animationData={success} loop={false} />
                ) : (
                    <Lottie animationData={failed} loop={false} />
                )}
            </div>
        </div>
    );
};

export default VerifyPaymentPage;
