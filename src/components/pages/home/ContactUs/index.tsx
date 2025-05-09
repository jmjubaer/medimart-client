/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import image from "@/assets/contactus.jpg";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { sendContactMessage } from "@/services/ContactUs";
import { IContact } from "@/types";
const ContactUs = () => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IContact>();

    const onSubmit: SubmitHandler<IContact> = async (data) => {
        const result = await sendContactMessage(data);
        console.log(result);
        if (result?.success) {
            reset();
            Swal.fire({
                icon: "success",
                title: "Success ",
                text: "Thank you for Contact Us. We will reply soon!",
            });
        }
    };
    return (
        <section className='relative h-[600px] flex -mb-5' id='contact-us'>
            <div className='absolute inset-0 z-0 w-full h-full bg-red-400 top-0 left-0'>
                <Image
                    src={image}
                    alt='Medical Background'
                    fill
                    className='object-cover  brightness-50'
                    priority
                />
            </div>

            <div className='xs:w-[70%] w-[95%] my-auto mx-auto text-white z-20'>
                <h2 className='xs:text-5xl text-4xl text-white text-center z-20 mb-5 xs:mb-16'>
                    Contact Us
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                    <div className='space-y-4 md:space-y-6 w-full text-left'>
                        <div className='grid md:grid-cols-2 gap-2 md:gap-5'>
                            <div>
                                <input
                                    id='name'
                                    className='w-full text-base sm:text-xl text-black outline-none border rounded-md  p-3 px-5 bg-primary placeholder:text-white mt-2 '
                                    {...register("name", {
                                        required: true,
                                    })}
                                    type='text'
                                    placeholder='Enter your name'
                                />
                                {errors.name && (
                                    <span className='text-red-500 text-base'>
                                        This field is required
                                    </span>
                                )}
                            </div>

                            <div>
                                <input
                                    className='w-full text-base sm:text-xl text-black outline-none border rounded-md  p-3 px-5 bg-primary placeholder:text-white mt-2'
                                    {...register("contact", {
                                        required: true,
                                    })}
                                    placeholder='Email or phone'
                                />
                                {errors.contact && (
                                    <span className='text-red-500 text-base'>
                                        This field is required
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className=''>
                            <textarea
                                className='w-full text-base sm:text-xl text-black outline-none border rounded-md p-3 px-5 bg-primary placeholder:text-white xs:min-h-[150px] min-h-[100px]'
                                placeholder='Write message ...'
                                id='message'
                                {...register("message", {
                                    required: true,
                                })}
                            />
                            {errors.message && (
                                <span className='text-red-500 text-base'>
                                    This field is required
                                </span>
                            )}
                        </div>
                        <button
                            type='submit'
                            className='w-1/2 mx-auto block bg-primary text-white py-1 xs:py-2 rounded-lg sm:text-xl font-medium sm:mt-4'>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactUs;
