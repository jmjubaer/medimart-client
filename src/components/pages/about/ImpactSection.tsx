import {
    TrophyIcon,
    PillIcon,
    UsersIcon,
    BuildingIcon,
    ShieldCheckIcon,
    CheckCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ImpactSection() {
    const goals = [
        {
            icon: <UsersIcon className='w-8 h-8 text-white' />,
            value: "500,000+",
            label: "Customers Target",
        },
        {
            icon: <PillIcon className='w-8 h-8 text-white' />,
            value: "10,000+",
            label: "Products Available",
        },
        {
            icon: <BuildingIcon className='w-8 h-8 text-white' />,
            value: "200+",
            label: "Cities Planned",
        },
        {
            icon: <TrophyIcon className='w-8 h-8 text-white' />,
            value: "24/7",
            label: "Customer Support",
        },
    ];

    const certifications = [
        {
            title: "ISO 9001:2015",
            description: "Quality Management System",
        },
        {
            title: "NABP Verified",
            description: "National Association of Boards of Pharmacy",
        },
        {
            title: "LegitScript",
            description: "Certified Internet Pharmacy",
        },
    ];

    return (
        <section className='relative py-24 overflow-hidden'>
            <div className='absolute inset-0 z-0'>
                <Image
                    src='https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop'
                    alt='Pharmacy background'
                    width={100}
                    height={100}
                    className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-r from-cyan-900/95 to-cyan-700/95'></div>
            </div>

            <div className='absolute inset-0 z-[1] opacity-10'>
                <div className='absolute top-20 left-20 w-64 h-64 rounded-full bg-white blur-3xl'></div>
                <div className='absolute bottom-20 right-20 w-80 h-80 rounded-full bg-cyan-200 blur-3xl'></div>
            </div>

            <div className='container mx-auto px-4 relative z-10 text-white'>
                <div className='text-center mb-20'>
                    <h2 className='text-4xl md:text-5xl font-bold mb-6'>
                        Our Vision
                    </h2>
                    <p className='text-xl text-white/80 max-w-3xl mx-auto'>
                        Setting new standards in healthcare delivery
                    </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-24'>
                    {goals.map((goal, index) => (
                        <div
                            key={index}
                            className='bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-colors duration-300 border border-white/10 group'>
                            <div className='w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                {goal.icon}
                            </div>
                            <div className='text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent'>
                                {goal.value}
                            </div>
                            <div className='text-white/90 text-lg'>
                                {goal.label}
                            </div>
                        </div>
                    ))}
                </div>

                <div className='text-center mb-20'>
                    <h3 className='text-3xl md:text-4xl font-bold mb-12'>
                        Certifications We are Pursuing
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                        {certifications.map((cert, index) => (
                            <div
                                key={index}
                                className='bg-white/10 backdrop-blur-sm rounded-2xl lg:p-8 p-4 text-center border border-white/10 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 group'>
                                <div className='w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                    <ShieldCheckIcon className='w-8 h-8 text-white' />
                                </div>
                                <h4 className='text-2xl font-bold mb-3 text-white'>
                                    {cert.title}
                                </h4>
                                <p className='text-white/80'>
                                    {cert.description}
                                </p>
                                <div className='mt-6 inline-flex items-center justify-center gap-2 text-cyan-300 font-medium'>
                                    <CheckCircleIcon className='w-5 h-5' />
                                    <span>In Progress</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='text-center mt-24'>
                    <h3 className='text-3xl md:text-4xl font-bold mb-6'>
                        Join Our Mission
                    </h3>
                    <p className='text-xl text-white/80 max-w-3xl mx-auto mb-10'>
                        Be part of our journey to revolutionize healthcare
                        delivery from day one
                    </p>
                    <Link
                        href={`${process.env.NEXT_PUBLIC_CLIENT_API}#contact-us`}
                        className='inline-block px-10 py-5 bg-white text-cyan-600 rounded-full font-medium hover:bg-cyan-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg'>
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    );
}
