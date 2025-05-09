/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "antd";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { IProduct } from "@/types";
import { createReview } from "@/services/reviews";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Swal from "sweetalert2";
type Inputs = {
    comment: string;
};
type IProps = {
    product: IProduct;
};

const AddReviewModal = ({ product }: IProps) => {
    const { user } = useUser();
    const [rating, setRating] = useState(0);

    const [open, setOpen] = useState(false);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    // Status change function
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (!user) {
                toast.error("Please login to give review!");
                return;
            }
            if (rating > 0) {
                const review = {
                    product: product?._id,
                    reviewer: user?._id,
                    rating,
                    comment: data.comment,
                };
                const result = await createReview(review);
                console.log(result);
                // TODO: dynamic disable button if already give review
                if (!result?.success) {
                    reset();
                    setRating(0);
                    setOpen(false);
                    Swal.fire({
                        icon: "error",
                        title: "Warning ",
                        text: "You already give review. please check the product details",
                    });
                }
                if (result?.success) {
                    reset();
                    setRating(0);
                    setOpen(false);
                    Swal.fire({
                        icon: "success",
                        title: "Success ",
                        text: "Thank you for give the review",
                    });
                }
            } else {
                toast.error("Please select a rating");
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <div className=''>
            <button
                disabled={status === "Reject"}
                onClick={() => setOpen(true)}
                title='Give Review'
                className='cursor-pointer text-base sm:text-base font-medium hover:text-black text-black bg-primary px-3 py-1 rounded'>
                Give Review
            </button>
            {/* Status change modal */}
            <Modal
                title='Change Status'
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <div className=''>
                    <h2
                        data-aos='fade-up'
                        className=' text-xl mt-8 font-semibold secondary_font'>
                        Add Review
                    </h2>
                    <div data-aos='fade-up' className='mt-5'>
                        <div className=''>
                            <h3 className='secondary_font font-medium text-base'>
                                Your Ratting:*
                            </h3>
                            <Rating
                                style={{ maxWidth: 150 }}
                                onChange={(value: SetStateAction<number>) =>
                                    setRating(value)
                                }
                                orientation='horizontal'
                                value={rating}
                            />
                            {/* Review form */}
                            <form
                                data-aos='fade-up'
                                className='mt-5'
                                onSubmit={handleSubmit(onSubmit)}>
                                <label className='secondary_font font-medium text-base'>
                                    Your Review:*
                                </label>
                                <textarea
                                    className='w-full block mt-3 px-4 py-2 text-base bg-black/10 outline-0 resize-y min-h-[100px] xs:min-h-[150px] rounded-md'
                                    {...register("comment", {
                                        required: true,
                                    })}></textarea>
                                {/* errors will return when field validation fails  */}
                                {errors.comment && (
                                    <p className=''>This field is required</p>
                                )}

                                <input
                                    className='button_primary w-full mt-5'
                                    type='submit'
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddReviewModal;
