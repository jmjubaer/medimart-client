"use client";

import { Tag, Divider, Row, Col, Image, Spin } from "antd";
import {
    PhoneOutlined,
    EnvironmentOutlined,
    ShopOutlined,
} from "@ant-design/icons";
import Head from "next/head";
import { CircleArrowRight, ShoppingCart } from "lucide-react";
import { IProduct } from "@/types";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { addToCart } from "@/redux/features/cart/cartSlice";
import Link from "next/link";
import { getSingleProduct } from "@/services/Products";
import { IReview } from "@/types/review.type";
import "@smastrom/react-rating/style.css";
import { getProductReview } from "@/services/reviews";
import { FaCircleUser } from "react-icons/fa6";
import { Rating } from "@smastrom/react-rating";
import moment from "moment";

const MedicineDetails = ({ productId }: { productId: string }) => {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [reviews, setReviews] = useState<IReview[] | null>(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    console.log(reviews);
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const data = await getSingleProduct(productId);
                const reviews = await getProductReview(productId);
                setProduct(data?.data);
                setReviews(reviews?.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        getProduct();
    }, [productId]);

    return loading && product ? (
        <div className='flex justify-center items-center'>
            <Spin />
        </div>
    ) : (
        <div className='min-h-screen bg-gray-50'>
            <Spin
                spinning={loading}
                tip='Loading...'
                size='large'
                className='w-full container'>
                <Head>
                    <title>{product?.name} - Medicine Details</title>
                    <meta name='description' content={product?.description} />
                </Head>

                <div className="relative bg-[url('https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2000&auto=format&fit=crop')] bg-linear-to-t from-sky-500 to-indigo-500 text-white py-16">
                    <div className='max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 z-10 relative'>
                        <nav className='mb-4 text-sm text-blue-200'>
                            Home / Medicines / {product?.name}
                        </nav>
                        <h1 className='sm:text-4xl text-2xl font-bold mb-2'>
                            {product?.name}
                        </h1>
                        <div className='flex items-center gap-4'>
                            {product?.requiredPrescription && (
                                <Tag color='red' className='text-base py-1'>
                                    Prescription Required
                                </Tag>
                            )}
                            <Tag
                                color={
                                    (product?.quantity as number) > 0
                                        ? "green"
                                        : "red"
                                }
                                className='text-base py-1'>
                                {(product?.quantity as number) > 0
                                    ? "In Stock"
                                    : "Out of Stock"}
                            </Tag>
                        </div>
                    </div>
                    <div className='bg-linear-to-r from-[#0000007e] to-[#0000007e] absolute inset-0'></div>
                </div>

                <main className='xs:max-w-[90%] mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 py-8'>
                    <div className='bg-white rounded-lg shadow-md p-3 xs:p-6'>
                        <Row gutter={[32, 32]}>
                            <Col xs={24} md={12}>
                                <div className='border border-gray-50 rounded-lg overflow-hidden bg-gray-100 p-3 flex justify-center items-center'>
                                    <Image
                                        src={product?.image}
                                        alt={product?.name}
                                        preview={false}
                                        className='w-full max-h-[500px] xs:min-h-96 rounded-lg object-contain'
                                    />
                                </div>
                            </Col>

                            <Col xs={24} md={12}>
                                <div className='space-y-6'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-3xl font-bold text-primary'>
                                            ${product?.price.toFixed(2)}
                                        </span>
                                        <Link href={"/cart"}>
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        addToCart({
                                                            product: product!,
                                                            quantity: 1,
                                                            type: "medicine",
                                                        })
                                                    )
                                                }
                                                disabled={
                                                    (product?.quantity as number) <
                                                    1
                                                }
                                                className='flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-all font-medium text-sm cursor-pointer'>
                                                <ShoppingCart size={18} />
                                                Add to Cart
                                            </button>
                                        </Link>
                                    </div>

                                    <Divider />

                                    <div className='space-y-4'>
                                        <div>
                                            <h3 className='text-lg font-semibold mb-2'>
                                                Description
                                            </h3>
                                            <p className='text-gray-600'>
                                                {product?.description}
                                            </p>
                                        </div>

                                        {product?.symptoms && (
                                            <div>
                                                <h3 className='text-lg font-semibold mb-2'>
                                                    Symptoms Treated
                                                </h3>
                                                <div className='flex flex-wrap gap-2'>
                                                    {product?.symptoms &&
                                                        product?.symptoms
                                                            .split(",")
                                                            .map(
                                                                (
                                                                    symptom,
                                                                    index
                                                                ) => (
                                                                    <Tag
                                                                        key={
                                                                            index
                                                                        }
                                                                        color='blue'
                                                                        className='text-sm'>
                                                                        {symptom.trim()}
                                                                    </Tag>
                                                                )
                                                            )}
                                                </div>
                                            </div>
                                        )}
                                        {product?.expiryDate && (
                                            <div>
                                                <h3 className='text-lg font-semibold mb-2'>
                                                    Expiry Date
                                                </h3>
                                                <p className='text-gray-600'>
                                                    {product?.expiryDate &&
                                                        new Date(
                                                            product.expiryDate
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            }
                                                        )}
                                                </p>
                                            </div>
                                        )}

                                        {product?.features &&
                                            product?.features?.length > 0 && (
                                                <div>
                                                    <h3 className='text-lg font-semibold mb-2'>
                                                        Features
                                                    </h3>
                                                    <div className='flex flex-wrap gap-2'>
                                                        {product?.features
                                                            ?.length > 0 &&
                                                            product?.features?.map(
                                                                (
                                                                    feature,
                                                                    index
                                                                ) => (
                                                                    <Tag
                                                                        key={
                                                                            index
                                                                        }
                                                                        color='blue'
                                                                        className='text-sm'>
                                                                        {feature.trim()}
                                                                    </Tag>
                                                                )
                                                            )}
                                                    </div>
                                                </div>
                                            )}
                                        {product?.brand && (
                                            <div>
                                                <h3 className='text-lg font-semibold mb-2'>
                                                    Brand
                                                </h3>
                                                <div className='flex flex-wrap gap-2'>
                                                    {product?.brand}
                                                </div>
                                            </div>
                                        )}
                                        {product?.warrantyPeriod && (
                                            <div>
                                                <h3 className='text-lg font-semibold mb-2'>
                                                    Warranty Period
                                                </h3>
                                                <div className='flex flex-wrap gap-2'>
                                                    {product?.warrantyPeriod}
                                                </div>
                                            </div>
                                        )}

                                        <Divider />

                                        <div>
                                            <h3 className='text-lg font-semibold mb-3'>
                                                Manufacturer Details
                                            </h3>
                                            <div className='space-y-2 text-gray-600'>
                                                <div className='flex items-center gap-2'>
                                                    <ShopOutlined />
                                                    <span>
                                                        {
                                                            product
                                                                ?.manufacturerDetails
                                                                .name
                                                        }
                                                    </span>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <PhoneOutlined />
                                                    <span>
                                                        {
                                                            product
                                                                ?.manufacturerDetails
                                                                .contact
                                                        }
                                                    </span>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <EnvironmentOutlined />
                                                    <span>
                                                        {
                                                            product
                                                                ?.manufacturerDetails
                                                                .location
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        {/* TODO: user tab for review and info */}
                        <section className='mt-8 pt-8 border-t border-t-gray-100'>
                            <h2 className='text-2xl font-semibold mb-4'>
                                Important Information
                            </h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600'>
                                <div>
                                    <h3 className='font-semibold mb-2'>
                                        Safety Information
                                    </h3>
                                    <ul className='space-y-2'>
                                        <li className='flex items-center gap-3'>
                                            <CircleArrowRight size={16} /> Read
                                            the label carefully before use
                                        </li>
                                        <li className='flex items-center gap-3'>
                                            <CircleArrowRight size={16} /> Keep
                                            out of reach of children
                                        </li>
                                        <li className='flex items-center gap-3'>
                                            <CircleArrowRight size={16} /> Store
                                            in a cool dry place
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className='font-semibold mb-2'>
                                        Dosage Instructions
                                    </h3>
                                    <ul className='space-y-2'>
                                        <li className='flex items-center gap-3'>
                                            <CircleArrowRight size={16} />
                                            Consult your doctor for proper
                                            dosage
                                        </li>
                                        <li className='flex items-center gap-3'>
                                            <CircleArrowRight size={16} />
                                            Do not exceed recommended dose
                                        </li>
                                        <li className='flex items-center gap-3'>
                                            <CircleArrowRight size={16} />
                                            Take with food if stomach upset
                                            occurs
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {reviews && reviews?.length > 0 && (
                            <div className=''>
                                <h2 className='text-2xl mt-10 font-semibold'>
                                    Reviews
                                </h2>
                                <div className=''>
                                    {reviews?.map((review, idx) => (
                                        <div
                                            key={review?._id}
                                            className='md:my-5 my-4'>
                                            <div className='flex gap-3 '>
                                                <div className='w-12'>
                                                    <FaCircleUser className='text-5xl text-gray-300' />
                                                </div>
                                                <div className=''>
                                                    <Rating
                                                        style={{
                                                            maxWidth: 110,
                                                        }}
                                                        readOnly
                                                        orientation='horizontal'
                                                        value={review.rating}
                                                    />
                                                    <div className='flex items-center gap-3'>
                                                        <p className='capitalize secondary_font font-medium text-xl'>
                                                            {
                                                                review.reviewer
                                                                    .name
                                                            }
                                                        </p>
                                                        <p className='text-gray-400'>
                                                            {moment(
                                                                review?.createdAt
                                                            ).format(
                                                                "MMMM DD, YYYY"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                data-aos='fade-up'
                                                key={idx}
                                                className='flex gap-3 '>
                                                <div className='w-12 md:block hidden'></div>
                                                <div className='w-full'>
                                                    <p className='xs:text-lg text-base mt-3 text-gray-500'>
                                                        {review.comment}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </Spin>
        </div>
    );
};

export default MedicineDetails;
