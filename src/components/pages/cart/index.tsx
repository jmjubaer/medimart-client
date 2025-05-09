"use client";
import { RxCross2 } from "react-icons/rx";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
    addToCart,
    clearCart,
    decreaseQuantity,
    ICartItem,
    removeFromCart,
    useCartItems,
    useTotalPrice,
} from "@/redux/features/cart/cartSlice";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Cart = () => {
    const [cartItems, setCartItems] = useState<ICartItem[] | null>(null);
    const [total, setTotal] = useState<number>(0);
    const dispatch = useAppDispatch();
    const totalPrice = useAppSelector(useTotalPrice);
    const cart = useAppSelector(useCartItems);
    useEffect(() => {
        setCartItems(cart);
    }, [cart]);
    useEffect(() => {
        setTotal(totalPrice);
    }, [totalPrice]);
    return (
        <div className='container mx-auto lg:gap-10 mb-10 justify-between items-center mt-6 grid grid-cols-1 lg:grid-cols-3'>
            {/* order overview section */}
            <section className='col-span-2 '>
                <div className='flex justify-between gap-5 item-center mb-10'>
                    <h3 className='font-bold text-xl sm:text-2xl lg:text-3xl'>
                        An overview of your order
                    </h3>
                    <button
                        onClick={() => dispatch(clearCart())}
                        className='bg-blue-50 px-5 h-fit py-2 rounded-full whitespace-nowrap border active:scale-95'>
                        Clear All
                    </button>
                </div>
                <div>
                    {cartItems && cartItems.length === 0 ? (
                        <div className='text-center mt-36'>
                            No Cart items available yet.
                        </div>
                    ) : (
                        <div>
                            {cartItems?.map((item: ICartItem, idx: number) => {
                                return (
                                    <div
                                        key={idx}
                                        className='py-7 border-b flex justify-between lg:bg-slate-50 px-2 sm:px-8 gap-3 mb-3'>
                                        <div className='flex gap-2 w-full justify-between items-center flex-wrap sm:flex-nowrap'>
                                            <div className='flex h-fit order-1'>
                                                <button
                                                    onClick={() =>
                                                        dispatch(
                                                            decreaseQuantity(
                                                                item?.product
                                                                    ?._id as string
                                                            )
                                                        )
                                                    }
                                                    className='w-10 text-3xl active:scale-95 cursor-pointer bg-gray-100'>
                                                    -
                                                </button>
                                                <span className=' text-xl flex items-center justify-center w-10  bg-gray-100'>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        dispatch(
                                                            addToCart({
                                                                product:
                                                                    item?.product,
                                                                quantity: 1,
                                                                type: item?.type,
                                                            })
                                                        )
                                                    }
                                                    className='w-10 text-3xl active:scale-95 bg-gray-100 flex justify-center cursor-pointer items-center'>
                                                    <span>+</span>
                                                </button>
                                            </div>
                                            <div className='flex items-center sm:order-2 gap-5 order-3 w-full'>
                                                <Image
                                                    src={item?.product?.image}
                                                    height={20}
                                                    width={20}
                                                    alt={item.product?.name}
                                                    className='w-20 h-20  rounded-2xl'
                                                />
                                                <div className='flex flex-col justify-start item-start'>
                                                    <p className='font-semibold '>
                                                        {item.product?.name}
                                                    </p>
                                                    {item?.type ===
                                                    "medicine" ? (
                                                        <p className='text-sm'>
                                                            <span className='font-medium'>
                                                                expiry date:
                                                            </span>{" "}
                                                            {item?.product
                                                                ?.expiryDate
                                                                ? new Date(
                                                                      item?.product?.expiryDate
                                                                  ).toLocaleDateString()
                                                                : ""}
                                                        </p>
                                                    ) : (
                                                        <p>
                                                            {
                                                                item?.product
                                                                    ?.brand
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='flex order-2 sm:order-3 flex-col justify-between items-end'>
                                                <span
                                                    onClick={() =>
                                                        dispatch(
                                                            removeFromCart(
                                                                item.product
                                                                    ?._id as string
                                                            )
                                                        )
                                                    }
                                                    className='hover:scale-110 text-xl active:scale-95'>
                                                    <RxCross2 />
                                                </span>
                                                <span className='font-bold'>
                                                    <span className='text-3xl font-bold'>
                                                        $
                                                    </span>
                                                    {item.product?.price *
                                                        item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* order details section    */}
            <section className='w-full'>
                <h3 className='font-bold text-2xl mb-10'>Order Details</h3>
                <div className='lg:max-w-[400px] max-w-[600px] mx-auto border-2 rounded-2xl p-6 bg-slate-50'>
                    <div className='flex justify-between text-xl text-gray-500 '>
                        <span>Subtotal</span>${total?.toFixed(2)}
                    </div>
                    <div className='flex justify-between text-xl text-gray-500 mt-1'>
                        <span>Quantity </span>
                        <span>{cartItems?.length}</span>
                    </div>
                    <div className='flex justify-between text-xl text-gray-500 mt-1'>
                        <span>
                            Shipping{" "}
                            <span className='text-base'>(Standard)</span>{" "}
                        </span>
                        <span>$20</span>
                    </div>
                    <div className='flex justify-between text-xl text-gray-500 pb-3 mt-1'>
                        <span className='flex items-center gap-2'>
                            Estimated Tax <IoMdInformationCircleOutline />
                        </span>
                        <span>$-</span>
                    </div>

                    <div className='flex justify-between text-xl font-bold text-black border-t-2 py-3'>
                        <span>Total</span>${(total + 20).toFixed(2)}
                    </div>
                    <Link href={"/checkout"}>
                        <button className='w-full active:scale-95 bg-primary text-white font-semibold py-2 px-4 rounded-lg mt-5 hover:bg-sky-700'>
                            PROCEED TO CHECKOUT
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Cart;
