import Navbar from "@/components/shered/Navbar";
import Footer from "@/components/shered/Footer";
import { Suspense } from "react";
import { Spin } from "antd";

export default function CommonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Suspense
            fallback={
                <Spin
                    size='large'
                    className='w-full container'></Spin>
            }>
            <div>
                <Navbar />
                <div className='min-h-screen'>{children}</div>
                <Footer />
            </div>
        </Suspense>
    );
}
