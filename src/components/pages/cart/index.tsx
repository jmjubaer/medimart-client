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

const Cart = () => {
    const dispatch = useAppDispatch();
    const total = useAppSelector(useTotalPrice);
    const cartItems = useAppSelector(useCartItems);
    return (
        <div className='min-h-screen  mx-auto lg:gap-36 flex flex-col lg:flex-row mb-16 px-6 justify-between items-center lg:items-start mt-6'>
            {/* order overview section */}
            <section className='lg:w-3/5 w-full '>
                <div className='flex justify-between item-center  mb-10'>
                    <h3 className='font-bold text-2xl lg:text-3xl'>
                        An overview of your order
                    </h3>
                    <button
                        onClick={() => dispatch(clearCart())}
                        className='bg-blue-50 px-5 rounded-full border active:scale-95'>
                        Clear All
                    </button>
                </div>
                <div>
                    {cartItems.length === 0 ? (
                        <div className='text-center mt-36'>
                            No Cart items available yet.
                        </div>
                    ) : (
                        <div>
                            {cartItems?.map(
                                (product: ICartItem, idx: number) => {
                                    return (
                                        <div
                                            key={idx}
                                            className='py-10 border-b flex justify-between lg:bg-slate-50 px-8 gap-3 mb-3'>
                                            <div className='flex gap-2'>
                                                <div className='flex justify-center items-center gap-8'>
                                                    <div className='flex '>
                                                        <button
                                                            onClick={() =>
                                                                dispatch(
                                                                    decreaseQuantity(
                                                                        product?._id as string
                                                                    )
                                                                )
                                                            }
                                                            className='w-10 text-3xl active:scale-95 bg-gray-100'>
                                                            -
                                                        </button>
                                                        <span className=' text-xl flex items-center justify-center w-10  bg-gray-100'>
                                                            {product.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                dispatch(
                                                                    addToCart({
                                                                        product,
                                                                    })
                                                                )
                                                            }
                                                            className='w-10 text-3xl active:scale-95 bg-gray-100 flex justify-center items-center'>
                                                            <span>+</span>
                                                        </button>
                                                    </div>
                                                    <Image
                                                        src={product.image}
                                                        height={20}
                                                        width={20}
                                                        alt={product.name}
                                                        className='md:w-20 md:h-20 w-10 h-10 rounded-2xl'
                                                    />
                                                </div>
                                                <div className='flex flex-col justify-start item-start'>
                                                    <p className='font-semibold ml-8'>
                                                        {product.name}
                                                    </p>
                                                    <p className='text-sm ml-8'>
                                                        <span className='font-medium'>
                                                            expiry date:
                                                        </span>{" "}
                                                        {new Date(
                                                            product.expiryDate
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col justify-between items-end'>
                                                <span
                                                    onClick={() =>
                                                        dispatch(
                                                            removeFromCart(
                                                                product._id as string
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
                                                    {product.price *
                                                        product.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* order details section    */}
            <section className='w-full lg:w-2/5'>
                <h3 className='font-bold text-2xl mb-10'>Order Details</h3>
                <div className='max-w-[400px] border-2 rounded-2xl p-6 bg-slate-50'>
                    <div className='flex justify-between text-xl text-gray-500 '>
                        <span>Subtotal</span>${total.toFixed(2)}
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
                        <span>Total</span>
                        ${total + 20}
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
