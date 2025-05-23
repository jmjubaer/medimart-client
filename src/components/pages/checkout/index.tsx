"use client";
import { IDeliveryInfo, IOrderCartItem } from "@/types/order.type";
import { Spin } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SHP from "@/assets/shurjoPay-DP4CfkPU.png";
import COD from "@/assets/cod-BP-tEaJX.png";
import { FaCheckCircle } from "react-icons/fa";
import AddPrescriptionModal from "./AddPresctiptionModal";
import { createOrder } from "@/services/OrderServices";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
    clearCart,
    ICartItem,
    useCartItems,
    useTotalPrice,
} from "@/redux/features/cart/cartSlice";

const Checkout = () => {
    const totalPrice = useAppSelector(useTotalPrice);
    const dispatch = useAppDispatch();
    const products = useAppSelector(useCartItems);
    const router = useRouter();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"COD" | "surjopay">(
        "surjopay"
    );
    const [deliveryOptions, setDeliveryOptions] = useState<
        "Standard" | "Express" | "Pickup from Store"
    >("Standard");
    const deliveryCost =
        deliveryOptions === "Express"
            ? 30
            : deliveryOptions === "Standard"
            ? 20
            : 0;
    const [cartItems, setCartItems] = useState<IOrderCartItem[] | []>([]);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IDeliveryInfo>();
    const onSubmit: SubmitHandler<IDeliveryInfo> = async (data) => {
        // setLoading(true);
        try {
            const missingPrescriptions = products?.filter(
                (product: ICartItem) => {
                    if (product?.product?.requiredPrescription) {
                        const cartItem = cartItems?.find(
                            (item) => item?.product === product.product?._id
                        );
                        return !cartItem?.prescription;
                    }
                    return false;
                }
            );

            if (missingPrescriptions.length > 0) {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please upload prescriptions for all required medicines.",
                });
                return;
            }
            const orderData = {
                user: user?._id as string,
                products: cartItems as IOrderCartItem[],
                deliveryInfo: {
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                    localAddress: data.localAddress,
                    city: data.city,
                    district: data.district,
                    thana: data.thana,
                    postalCode: Number(data.postalCode),
                },
                deliveryOptions,
                paymentMethod,
                productNames: products?.map((p) => p.product?.name),
            };
            Swal.fire({
                title: "Please confirm the order.",
                html: `
      <table style="width: 100%; border: 1px solid rgba(0,0,0,0.1); border-collapse: collapse; font-family: sans-serif;">
      <tbody>
        <tr style="background-color: rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.1);">
          <th colspan="2" style="font-size: 18px; text-align: center; padding: 8px 12px; border: 1px solid rgba(0,0,0,0.1);">
            Order Summary
          </th>
        </tr>
        <tr style="border: 1px solid rgba(0,0,0,0.1);">
          <td style="width: 50%;text-align: left; padding: 8px 12px; border: 1px solid rgba(0,0,0,0.1);">
            Quantity
          </td>
          <td style="width: 50%; padding: 8px 12px; border: 1px solid rgba(0,0,0,0.1); font-weight: bold;">
            ${products?.length}
          </td>
        </tr>
        <tr style="border: 1px solid rgba(0,0,0,0.1);">
          <td style="width: 50%;text-align: left; padding: 8px 12px; border: 1px solid rgba(0,0,0,0.1);">
            Shipping
          </td>
          <td style="width: 50%; padding: 8px 12px; border: 1px solid rgba(0,0,0,0.1); font-weight: bold;">
            $${deliveryCost}
          </td>
        </tr>
        <tr style="border: 1px solid rgba(0,0,0,0.1);">
          <td style="width: 50%;text-align: left; padding: 8px 12px; border: 1px solid rgba(0,0,0,0.1); font-weight: bold;">
            Total
          </td>
          <td style="width: 50%; padding: 8px 12px; border: 1px solid rgba(0,0,0,0.1); font-weight: bold;">
            $${(totalPrice + deliveryCost).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
              `,
                showCancelButton: true,
                confirmButtonText: "Confirm",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const result = await createOrder(orderData);
                    if (result?.success) {
                        Swal.fire("Order Placed!", "", "success");
                        reset();
                        dispatch(clearCart());
                        if (result?.data?.paymentUrl) {
                            window.open(result?.data?.paymentUrl, "_self");
                            setLoading(false);
                        } else {
                            setLoading(false);
                            router.push(`/orders?userId=${user?._id}`);
                        }
                    } else if (result?.error) {
                        Swal.fire(
                            `${
                                result?.error?.data?.message ||
                                "Failed to place order"
                            }`,
                            "",
                            "error"
                        );

                        setLoading(false);
                    }
                }
            });
        } catch (error: any) {
            setLoading(false);
            Swal.fire(`${error.message}`, "", "error");
        }
    };
    useEffect(() => {
        setCartItems(
            products?.map((p) => ({
                product: p.product?._id,
                quantity: p.quantity,
            }))
        );
    }, [products]);
    useEffect(() => {
        Swal.fire({
            title: "Are you use profile address, for delivery?",
            // text: "Not can ",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then(async (result) => {
            if (result.isConfirmed) {
                reset({
                    name: user?.name,
                    phoneNumber: user?.phone,
                    city: user?.city,
                    district: user?.district,
                    thana: user?.thana,
                    postalCode: Number(user?.postalCode),
                    localAddress: user?.localAddress,
                });
            }
        });
    }, []);
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
                    {products?.map((product: ICartItem) => (
                        <div
                            key={product?.product?._id}
                            className='mt-4 flex items-center gap-3 xs:gap-5'>
                            <Image
                                width={100}
                                height={100}
                                src={product?.product?.image}
                                alt=''
                                className='w-28 h-28 border border-gray-300 object-cover rounded-md'
                            />
                            <div className=''>
                                <h3 className='text-xl font-semibold secondary_font'>
                                    {product?.product?.name}
                                </h3>
                                <p className='my-1 text-xl font-semibold '>
                                    <span className='font-medium text-lg mr-2'>
                                        {" "}
                                        Price:
                                    </span>
                                    ${product?.product?.price}
                                </p>{" "}
                                <p className='my-1 text-xl font-semibold '>
                                    <span className='font-medium text-lg mr-2'>
                                        {" "}
                                        Quantity:
                                    </span>
                                    {product?.quantity}
                                </p>
                                {product?.product?.requiredPrescription && (
                                    <AddPrescriptionModal
                                        medicineId={product?.product?._id}
                                        cartItems={cartItems!}
                                        setCartItems={setCartItems}
                                    />
                                )}
                            </div>
                        </div>
                    ))}

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
                        onChange={(e) =>
                            setDeliveryOptions(
                                e.target.value as
                                    | "Standard"
                                    | "Express"
                                    | "Pickup from Store"
                            )
                        }>
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
