"use client"
import dynamic from "next/dynamic";

const VerifyComponent = dynamic(
    () => import("../../../../components/pages/order/verify/index"),
    {
        ssr: false,
    }
);

const OrderVerifyPage = () => {
    return <VerifyComponent />;
};

export default OrderVerifyPage;
