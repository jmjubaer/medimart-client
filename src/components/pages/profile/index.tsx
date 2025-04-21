"use client";
import { FaUser } from "react-icons/fa";
import { Spin } from "antd";
import { IUser } from "@/types";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { getSingleUser } from "@/services/UserServices";
import { FiLogOut } from "react-icons/fi";
import UpdateProfileModal from "./UpdateProfileModal";
import { logOutUser } from "@/services/AuthService";
import { protectedRoutes } from "@/constant";
import { usePathname, useRouter } from "next/navigation";
const ManageProfiles = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, setUser, setIsLoading } = useUser();
    const [userData, setUserData] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isFetch, setIsFetch] = useState<boolean>(false);
    const { email, name, phone, role, status } = (userData as IUser) || {};
    const reFetch = () => {
        setIsFetch(!isFetch);
    };
    useEffect(() => {
        (async () => {
            setLoading(true);
            const data = await getSingleUser(user?.id as string);
            console.log(data);
            if (data) {
                setUserData(data?.data);
                setLoading(false);
            }
            setLoading(false);
        })();
    }, [user,isFetch]);
    const handleLogout = () => {
        logOutUser();
        setUser(null);
        setIsLoading(true);
        if (protectedRoutes.some((route) => pathname.match(route))) {
            router.push("/login");
        }
    };
    return (
        <div className='flex items-center justify-center '>
            <div className='border border-gray-300 my-16 p-8 w-full md:w-1/2 max-w-[500px] rounded-2xl shadow-2xl relative '>
                <Spin
                    spinning={loading}
                    tip='Loading...'
                    size='large'
                    className='w-full'>
                    {status === "deactivated" && (
                        <span className='absolute top-5 right-5 bg-primary px-2 py-1 font-semibold rounded'>
                            Blocked
                        </span>
                    )}
                    <div
                        className={`text-center ${
                            status === "deactivated" && "opacity-50"
                        }`}>
                        <div className='bg-gray-300 mx-auto text-gray-500 p-8 rounded-full w-fit flex justify-center items-center'>
                            <FaUser className='xs:text-8xl text-7xl' />
                        </div>
                        <h2 className='text-3xl font-bold mt-3'>{name}</h2>
                        <div className='flex w-full text-xl my-5 justify-between items-center'>
                            <h3 className=' text-gray-500'>Role</h3>
                            <p className='text-black font-medium capitalize'>
                                {role}
                            </p>
                        </div>{" "}
                        <div className='flex w-full text-xl my-5 justify-between items-center'>
                            <h3 className=' text-gray-500'>Phone</h3>
                            <p className='text-black font-medium '>{phone}</p>
                        </div>{" "}
                        <div className='flex w-full text-xl my-5 justify-between items-center'>
                            <h3 className=' text-gray-500'>Email</h3>
                            <p className='text-black font-medium '>{email}</p>
                        </div>
                        <div className='border-y-2 py-4 mt-8 border-gray-300'>
                            <UpdateProfileModal
                                userData={userData!}
                                reFetch={reFetch}
                            />
                        </div>
                        <button
                            onClick={() => handleLogout()}
                            className='border-b-2 py-4 w-full cursor-pointer flex gap-2 items-center border-gray-300'>
                            <FiLogOut className='text-3xl rotate-180' />
                            <span className='text-xl font-semibold'>
                                Log Out
                            </span>
                        </button>
                    </div>
                </Spin>
            </div>
        </div>
    );
};

export default ManageProfiles;
