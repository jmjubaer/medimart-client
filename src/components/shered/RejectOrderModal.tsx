/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "antd";
import { changeOrderStatus } from "@/services/OrderServices";
import Swal from "sweetalert2";
type IProps = {
    id: string;
    status: string;
    reFetch: () => void;
};
type TNameForm = {
    rejectNotes: string;
};

const RejectOrderModal = ({ id, status, reFetch }: IProps) => {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TNameForm>();
    // Status change function
    const handleRejectOrder: SubmitHandler<TNameForm> = async (data) => {
        try {
            Swal.fire({
                title: "Are you sure reject the order?",
                // text: "Not can ",
                showCancelButton: true,
                confirmButtonText: "Confirm",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const result = await changeOrderStatus(id, {
                        status: "Reject",
                        rejectNotes: data?.rejectNotes,
                    });
                    if (result?.success) {
                        reFetch();
                        Swal.fire("Order Rejected!", "", "success");
                        setOpen(false);
                    }
                }
            });
        } catch (error: any) {
            console.log(error);
        }
    };
    console.log(status);
    return (
        <div className=''>
            <button
                disabled={status === "Reject"}
                onClick={() => setOpen(true)}
                className='bg-red-400 mt-5 py-2 px-2 rounded-lg text-base text-white w-full'>
                Reject Order
            </button>
            {/* Status change modal */}
            <Modal
                title='Change Status'
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <form onSubmit={handleSubmit(handleRejectOrder)} className=' '>
                    <div className=''>
                        <label
                            className='label_primary  md:text-xl text-lg mt-5'
                            htmlFor='rejectNotes'>
                            Medicine Description:
                        </label>
                        <textarea
                            className='input_field min-h-[150px]'
                            placeholder='Enter reject notes ...'
                            id='rejectNotes'
                            {...register("rejectNotes", {
                                required: true,
                            })}
                        />
                        {errors.rejectNotes && (
                            <span className='text-red-500 text-base'>
                                This field is required
                            </span>
                        )}
                    </div>
                    <input
                        type='submit'
                        className='bg-primary  w-fit mx-auto block px-5 py-1 mt-4 font-semibold rounded cursor-pointer'
                    />
                </form>
            </Modal>
        </div>
    );
};

export default RejectOrderModal;
