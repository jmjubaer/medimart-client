"use client";
import React from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./registerValidation";
import { getCurrentUser, registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface IFormInput {
    name: string;
    phone: string;
    email: string;
    password: string;
    city: string;
    district: string;
    thana: string;
    postalCode: string;
    localAddress: string;
}

const RegisterForm = () => {
    const { setUser, setIsLoading } = useUser();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirectPath");
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<IFormInput>({ resolver: zodResolver(registerSchema) });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const res = await registerUser({
                ...data,
                postalCode: Number(data?.postalCode),
            });
            if (res?.success) {
                toast.success(res?.message);
                reset();
                // const decoded = jwtDecode(res.data.accessToken) as IAuthUser;
                const user = await getCurrentUser();
                setIsLoading(false);
                setUser(user?.data);
                if (redirect) {
                    if (redirect === "orders") {
                        router.push(`${redirect}?userId=${user?._id}`);
                    } else {
                        router.push(redirect);
                    }
                } else {
                    router.push("/");
                }
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section className=' items-center justify-between container  w-full pb-20'>
            <h1 className='text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-center'>
                Create an account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className=' mt-8'>
                <div className='grid md:grid-cols-2 md:gap-10 lg:gap-20'>
                    <div className='space-y-3 md:space-y-3  '>
                        <div>
                            <label
                                htmlFor='name'
                                className='text-lg font-medium'>
                                Name
                            </label>
                            <input
                                className='input_field mt-2'
                                {...register("name", {
                                    required: "Name is Required!",
                                })}
                                type='text'
                                placeholder='Your Name'
                            />
                            {errors.name && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor='email'
                                className='text-lg font-medium'>
                                Email
                            </label>
                            <input
                                className='input_field mt-2'
                                {...register("email", {
                                    required: "Email is Required!",
                                })}
                                type='email'
                                placeholder='Your Email'
                            />
                            {errors.email && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor='phone'
                                className='text-lg font-medium'>
                                Phone Number
                            </label>
                            <input
                                className='input_field mt-2'
                                {...register("phone", {
                                    required: "Phone is Required!",
                                })}
                                type='text'
                                placeholder='Your Phone Number'
                            />
                            {errors.phone && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor='password'
                                className='text-lg font-medium'>
                                Password
                            </label>
                            <input
                                className='input_field mt-2'
                                {...register("password", {
                                    required: "Password is Required!",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 character",
                                    },
                                })}
                                type='password'
                                placeholder='Password ****'
                            />
                            {errors.password && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='space-y-3 md:space-y-3  mt-3 md:mt-0'>
                        <div>
                            <label
                                htmlFor='city'
                                className='text-lg font-medium'>
                                City
                            </label>
                            <input
                                className='input_field mt-2'
                                {...register("city", {
                                    required: "City is Required!",
                                })}
                                type='text'
                                placeholder='Your district'
                            />
                            {errors.city && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.city.message}
                                </p>
                            )}
                        </div>{" "}
                        <div>
                            <label
                                htmlFor='district'
                                className='text-lg font-medium'>
                                District
                            </label>
                            <input
                                className='input_field mt-2'
                                {...register("district", {
                                    required: "District is Required!",
                                })}
                                type='text'
                                placeholder='Your district'
                            />
                            {errors.district && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.district.message}
                                </p>
                            )}
                        </div>
                        <div className='grid xs:grid-cols-2 xs:gap-2'>
                            <div>
                                <label
                                    htmlFor='thana'
                                    className='text-lg font-medium'>
                                    Thana
                                </label>
                                <input
                                    className='input_field mt-2'
                                    {...register("thana", {
                                        required: "Thana is Required!",
                                    })}
                                    placeholder='Your Thana'
                                />
                                {errors.thana && (
                                    <p className='text-red-500 text-sm mt-1'>
                                        {errors.thana.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor='postalCode'
                                    className='text-lg font-medium'>
                                    Postal Code
                                </label>
                                <input
                                    className='input_field mt-2'
                                    {...register("postalCode", {
                                        required: "Postal Code is Required!",
                                    })}
                                    type='number'
                                    placeholder='Your Postal Code'
                                />
                                {errors.postalCode && (
                                    <p className='text-red-500 text-sm mt-1'>
                                        {errors.postalCode.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='localAddress'
                                className='text-lg font-medium'>
                                Local Address
                            </label>
                            <input
                                className='input_field mt-2'
                                {...register("localAddress", {
                                    required: "Local address is Required!",
                                })}
                                placeholder='Your Local address'
                            />
                            {errors.localAddress && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.localAddress.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className='xs:w-1/2 mx-auto mt-5'>
                    <button
                        type='submit'
                        className='w-full bg-primary text-white py-1 xs:py-2 rounded-lg sm:text-xl font-medium mt-4'>
                        {isSubmitting ? "Loading..." : "Sign Up"}
                    </button>

                    <Link href={"/login"}>
                        <p className='text-sm font-light text-gray-500 dark:text-gray-400 mt-3'>
                            Already have an account?{" "}
                            <span className='font-medium hover:underline text-blue-500 '>
                                Sign In
                            </span>
                        </p>
                    </Link>
                </div>
            </form>
        </section>
    );
};

export default RegisterForm;
