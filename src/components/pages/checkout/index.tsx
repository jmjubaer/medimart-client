/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { IDeliveryInfo } from "@/types/order.type";
import { Spin } from "antd";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import SHP from "@/assets/shurjoPay-DP4CfkPU.png";
import COD from "@/assets/cod-BP-tEaJX.png";
import { FaCheckCircle } from "react-icons/fa";

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("surjopay");
    const [deliveryOptions, setDeliveryOptions] = useState("Standard");
    const products = [
        {
            medicine: "67fc7515be160cf50dc7613a",
            quantity: 5,
        },
        {
            medicine: "67fc7893ec4c894e6a230092",
            quantity: 1,
        },
    ];
    const totalPrice = 112;
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IDeliveryInfo>();
    const onSubmit: SubmitHandler<IDeliveryInfo> = async (data) => {
        const toastId = toast.loading("Order placing....");
        setLoading(true);
        // try {
        //     if (!paymentMethod) {
        //         return toast.error("Please select a payment method", {
        //             id: toastId,
        //         });
        //     }
        //     const orderData = {
        //         user: currentUser?.data?._id,
        //         product: productId,
        //         quantity,
        //         totalPrice: product?.data?.price * quantity + 5,
        //         paymentMethod,
        //         deliveryInfo: {
        //             name: data.name,
        //             phoneNumber: data.phoneNumber,
        //             localAddress: data.localAddress,
        //             city: data.city,
        //             district: data.district,
        //             thana: data.thana,
        //             postalCode: Number(data.postalCode),
        //         },
        //     };
        //     const result = (await createOrder(
        //         orderData
        //     ));
        //     if (result?.data?.success) {
        //         toast.success("Order placed successfully!", { id: toastId });
        //         reset();
        //         if (result?.data?.data?.paymentUrl) {
        //             window.open(result?.data?.data?.paymentUrl, "_self");
        //             setLoading(false);
        //         } else {
        //             setLoading(false);
        //             navigate("/bicycles");
        //         }
        //     } else if (result?.error) {
        //         toast.error(
        //             result?.error?.data?.message || "Failed to place order",
        //             { id: toastId }
        //         );
        //         setLoading(false);
        //     }
        // } catch (error: any) {
        //     setLoading(false);
        //     toast.error(error.message, { id: toastId });
        // }
    };
    return (
        <Spin
            spinning={loading}
            tip='Loading...'
            size='large'
            className='w-full container'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='container overflow-hidden grid md:grid-cols-2 gap-10 py-5 items-center'>
                {/* Delivery Info section */}
                <div className=' border border-gray-300 rounded-xl p-3 xs:p-5'>
                    <h2 className='secondary_font font-medium text-2xl text-center'>
                        Delivery Address
                    </h2>
                    <div className=''>
                        <label className='label_primary '>Name:*</label>
                        <input
                            placeholder='Enter Your Name'
                            className='input_field'
                            {...register("name", {
                                required: true,
                            })}
                        />
                        {errors.name && (
                            <p className='text-red-500 mt-1'>
                                This field is required
                            </p>
                        )}{" "}
                    </div>
                    <div className=''>
                        <label className='label_primary mt-5'>Phone:*</label>
                        <input
                            placeholder='Enter Your phone           '
                            className='input_field'
                            {...register("phoneNumber", {
                                required: true,
                            })}
                        />
                        {errors.phoneNumber && (
                            <p className='text-red-500 mt-1'>
                                This field is required
                            </p>
                        )}
                    </div>
                    <div className='grid xs:grid-cols-2 xs:gap-3'>
                        <div className=''>
                            <label className=' mt-5 label_primary'>
                                City:*
                            </label>
                            <input
                                placeholder='Enter Your City           '
                                className='input_field'
                                {...register("city", {
                                    required: true,
                                })}
                            />
                            {errors.city && (
                                <p className='text-red-500 mt-1'>
                                    This field is required
                                </p>
                            )}
                        </div>{" "}
                        <div className=''>
                            <label className=' mt-5 label_primary'>
                                District:*
                            </label>
                            <input
                                placeholder='Enter Your District           '
                                className='input_field'
                                {...register("district", {
                                    required: true,
                                })}
                            />
                            {errors.district && (
                                <p className='text-red-500 mt-1'>
                                    This field is required
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='grid xs:grid-cols-2 xs:gap-3'>
                        <div className=''>
                            <label className=' mt-5 label_primary'>
                                Thana/Upazila:*
                            </label>
                            <input
                                placeholder='Enter Thana/Upazila..           '
                                className='input_field'
                                {...register("thana", {
                                    required: true,
                                })}
                            />
                            {errors.thana && (
                                <p className='text-red-500 mt-1'>
                                    This field is required
                                </p>
                            )}
                        </div>{" "}
                        <div className=''>
                            <label className=' mt-5 label_primary'>
                                Postal Code:*
                            </label>
                            <input
                                placeholder='Enter Postal Code           '
                                className='input_field'
                                {...register("postalCode", {
                                    required: true,
                                })}
                            />
                            {errors.city && (
                                <p className='text-red-500 mt-1'>
                                    This field is required
                                </p>
                            )}
                        </div>
                    </div>
                    <div className=''>
                        <label className=' mt-5 label_primary'>
                            Local Address:*
                        </label>
                        <input
                            placeholder='Enter Your Address'
                            className='input_field'
                            {...register("localAddress", {
                                required: true,
                            })}
                        />
                        {errors.localAddress && (
                            <p className='text-red-500 mt-1'>
                                This field is required
                            </p>
                        )}
                    </div>
                </div>
                {/* Product Info section */}

                <div className='w-full mx-auto'>
                    <h2 className='secondary_font font-medium text-2xl text-center'>
                        Product Details
                    </h2>
                    {/* Product Info */}
                    {/* <div
                        className='mt-4 flex items-center gap-3 xs:gap-5'>
                        <img
                            src={product?.data?.image}
                            alt=''
                            className='w-28 h-28 border border-gray-300 object-cover rounded-md'
                        />
                        <div className=''>
                            <h3 className='text-xl font-medium secondary_font'>
                                {product?.data?.name}
                            </h3>
                            <p className='my-1 text-xl font-semibold '>
                                <span className='font-medium text-lg mr-2'>
                                    {" "}
                                    Price:
                                </span>
                                ${product?.data?.price}
                            </p>
                            <div className='flex items-center gap-2'>
                                <button
                                    onClick={() =>
                                        setQuantity(
                                            quantity > 1
                                                ? quantity - 1
                                                : quantity
                                        )
                                    }
                                    type='button'
                                    className='bg-black/10 cursor-pointer p-3 rounded'>
                                    <FaMinus />
                                </button>
                                <input
                                    type='number'
                                    min='1'
                                    onChange={(e) =>
                                        setQuantity(Number(e.target.value))
                                    }
                                    // defaultValue={quantity}
                                    value={quantity || 1}
                                    className='input_field w-40'
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    type='button'
                                    className='bg-black/10 cursor-pointer p-3 rounded'>
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                    </div> */}

                    {/* Order Summery */}
                    {/* <div className='overflow-hidden rounded-lg border mt-5 border-black/10 '>
                        <table className='w-full border border-black/10'>
                            <tbody>
                                <tr className='border border-black/10 bg-black/10'>
                                    <th
                                        colSpan={2}
                                        className='border text-lg border-black/10 secondary_font p-2 px-3'>
                                        Order Summary
                                    </th>
                                </tr>
                                <tr className='border border-black/10'>
                                    <td className='border w-1/2 border-black/10 p-2 px-3'>
                                        Price
                                    </td>
                                    <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                        ${totalPrice}
                                    </td>
                                </tr>
                                <tr className='border border-black/10'>
                                    <td className='border w-1/2 border-black/10 p-2 px-3'>
                                        Quantity
                                    </td>
                                    <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                        {products?.length}
                                    </td>
                                </tr>
                                <tr className='border border-black/10'>
                                    <td className='border w-1/2 border-black/10 p-2 px-3'>
                                        Shipping
                                    </td>
                                    <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                        ${"5"}
                                    </td>
                                </tr>
                                <tr className='border border-black/10'>
                                    <td className='border font-bold w-1/2 border-black/10 p-2 px-3'>
                                        Total
                                    </td>
                                    <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                        ${product?.data?.price * quantity + 5}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}

                    <h2 className='secondary_font font-medium text-2xl mt-4'>
                        Payment Method
                    </h2>

                    <div className='flex items-center gap-3 xs:gap-5 mt-3'>
                        <button
                            type='button'
                            onClick={() => setPaymentMethod("surjopay")}
                            className='border-2 relative cursor-pointer overflow-hidden border-gray-300 rounded-md px-3 py-1'>
                            <Image
                                src={SHP}
                                alt=''
                                className='w-[130px] p-1 h-10'
                            />
                            {paymentMethod === "surjopay" && (
                                <FaCheckCircle className='absolute text-2xl text-green-600 top-1/2 -translate-y-1/2 left-3 bg-white rounded-full' />
                            )}
                        </button>
                        <button
                            type='button'
                            onClick={() => setPaymentMethod("COD")}
                            className='border-2 relative cursor-pointer overflow-hidden border-gray-300 rounded-md px-3 py-1'>
                            <Image
                                src={COD}
                                alt=''
                                className='w-[130px] p-1 h-10'
                            />
                            {paymentMethod === "COD" && (
                                <FaCheckCircle className='absolute text-2xl text-green-600 top-1/2 -translate-y-1/2 left-3 bg-white rounded-full' />
                            )}
                        </button>
                    </div>

                    <h2 className='secondary_font font-medium text-2xl mt-4'>
                        Delivery Options
                    </h2>

                    <select
                        defaultValue={"Standard"}
                        className='outline-0 mt-3 text-base bg-gray-200 w-full px-5 p-2 rounded-md input_field'
                        onChange={(e) => setDeliveryOptions(e.target.value)}>
                        <option value='Standard' className=' capitalize'>
                            Standard Delivery ($20)
                        </option>
                        <option value='Express' className=' capitalize'>
                            Express Delivery ($30)
                        </option>
                        <option
                            value='Pickup from Store'
                            className=' capitalize'>
                            Pickup from Store ($0)
                        </option>
                    </select>
                    <button
                        type='submit'
                        className='button_primary w-full mt-5'>
                        Order Now
                    </button>
                </div>
            </form>
        </Spin>
    );
};

export default Checkout;
