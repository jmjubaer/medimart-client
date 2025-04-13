import Navbar from "@/components/shered/Navbar";
import Footer from "@/components/shered/Footer";

export default function CommonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            <div className='min-h-screen'>{children}</div>
            <Footer />
        </div>
    );
}
