"use client";
import "@smastrom/react-rating/style.css";
import { IReview } from "@/types/review.type";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

// import required modules
import { EffectCoverflow } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import moment from "moment";
import { FaCircleUser } from "react-icons/fa6";
import { Spin } from "antd";
import Image from "next/image";
import Link from "next/link";

const ReviewSection = ({ reviews }: { reviews: IReview[] }) => {
    return (
        <section className='py-16 bg-gray-50 '>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold mb-8 text-center'>
                    What Our Customers Say
                </h2>
            </div>

            {/* Full width marquee outside the container */}
            <Spin
                className='min-h-[100px] block'
                spinning={false}
                tip='Loading...'
                size='large'>
                {/* Review cover flow swiper */}
                <Swiper
                    effect={"coverflow"}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    initialSlide={1}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    // pagination={true}
                    modules={[EffectCoverflow]}
                    className='review-swiper mt-5 xs:mt-9 md:mt-14'>
                    {Array(3)
                        .fill(reviews[0])
                        .map((review: IReview) => (
                            // Review Card
                            <SwiperSlide key={review?._id} className='slide'>
                                <div className='shadow-md cursor-move rounded-xl h-full flex flex-col justify-between mb-5 p-2 sm:p-4 border border-gray-300 text-left '>
                                    <div className=''>
                                        <Rating
                                            // style={{ maxWidth: 150 }}
                                            className='xs:max-w-[150px] mx-auto max-w-[120px]'
                                            readOnly
                                            orientation='horizontal'
                                            value={review?.rating}
                                        />
                                        {review?.comment?.length > 250 ? (
                                            <>
                                                <p className='sm:my-5 my-2 xs:block hidden'>
                                                    {review?.comment?.slice(
                                                        0,
                                                        300
                                                    )}{" "}
                                                    . . . . . . .
                                                </p>{" "}
                                                <p className='sm:my-5 my-2 xs:hidden block'>
                                                    {review?.comment?.slice(
                                                        0,
                                                        200
                                                    )}{" "}
                                                    . . . . . . .
                                                </p>
                                            </>
                                        ) : (
                                            <p className='sm:my-5 my-2'>
                                                {review?.comment}
                                            </p>
                                        )}
                                    </div>

                                    <div className='grid xs:grid-cols-2 gap-1 sm:gap-3'>
                                        <div className='flex items-center gap-3'>
                                            <div className=''>
                                                <FaCircleUser className='text-5xl text-gray-300' />
                                            </div>
                                            <div className=''>
                                                <p className='capitalize secondary_font font-medium text-xl'>
                                                    {review.reviewer.name}
                                                </p>
                                                <p className='text-gray-400'>
                                                    {moment(
                                                        review.createdAt
                                                    ).format("MMMM DD, YYYY")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <div className=''>
                                                <Image
                                                    src={review?.product?.image}
                                                    alt=''
                                                    width={50}
                                                    height={50}
                                                    className='w-12 h-12 border border-gray-300 rounded-full object-cover'
                                                />
                                            </div>
                                            <div className=''>
                                                <Link
                                                    href={`/medicine/${review?.product?._id}`}
                                                    className='capitalize secondary_font  hover:text-blue-700 hover:underline font-medium text-xl'>
                                                    {review.product?.name}
                                                </Link>
                                                <p className='text-gray-700'>
                                                    {review?.product?.type}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </Spin>
        </section>
    );
};

export default ReviewSection;
