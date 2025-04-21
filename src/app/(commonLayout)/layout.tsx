import Navbar from "@/components/shered/Navbar";
import Footer from "@/components/shered/Footer";
import { Suspense } from "react";

export default function CommonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <Navbar />
                <div className='min-h-screen'>{children}</div>
                <Footer />
            </div>
        </Suspense>
    );
}
