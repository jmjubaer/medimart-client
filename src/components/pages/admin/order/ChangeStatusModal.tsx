/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "antd";
import { changeOrderStatus } from "@/services/OrderServices";
import Swal from "sweetalert2";
import { LuRepeat } from "react-icons/lu";
type IProps = {
    id: string;
    status: string;
    reFetch: () => void;
};
type TNameForm = {
    status: "Pending" | "Reject" | "Processing" | "Shipped" | "Delivered";
    rejectNotes: string;
};
const orderStatus = ["Pending", "Reject", "Processing", "Shipped", "Delivered"];
const ChangeStatusModal = ({ id, status, reFetch }: IProps) => {
    const [open, setOpen] = useState(false);
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TNameForm>();
    // Status change function
    const handleChangeOrderStatus: SubmitHandler<TNameForm> = async (data) => {
        try {
            Swal.fire({
                title: "Are you sure Change the Status?",
                // text: "Not can ",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const result = await changeOrderStatus(id, {
                        status: data?.status,
                        rejectNotes: data?.rejectNotes,
                    });
                    if (result?.success) {
                        Swal.fire("Change Status!", "", "success");
                        setOpen(false);
                        reFetch()
                    }
                }
            });
        } catch (error: any) {
            console.log(error);
        }
    };
    return (
        <div className=''>
            <button
                disabled={status === "Reject"}
                onClick={() => setOpen(true)}
                title='Change Status'
                className='cursor-pointer text-2xl text-green-600'>
                <LuRepeat />
            </button>
            {/* Status change modal */}
            <Modal
                title='Change Status'
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <form
                    onSubmit={handleSubmit(handleChangeOrderStatus)}
                    className=' '>
                    <div className=''>
                        <select
                            className='w-full text-2xl text-black placeholder:text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                            defaultValue={status}
                            {...register("status", {
                                required: true,
                            })}>
                            {orderStatus.map((status) => (
                                <option
                                    key={status}
                                    value={status}
                                    className='text-lg capitalize'>
                                    {status}
                                </option>
                            ))}
                        </select>
                        {errors.status && (
                            <span className='text-white'>
                                This field is required
                            </span>
                        )}
                    </div>
                    {watch("status") === "Reject" && (
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
                                    required: watch("status") === "Reject",
                                })}
                            />
                            {errors.rejectNotes && (
                                <span className='text-red-500 text-base'>
                                    This field is required
                                </span>
                            )}
                        </div>
                    )}

                    <input
                        type='submit'
                        className='bg-primary  w-fit mx-auto block px-5 py-1 mt-4 font-semibold rounded cursor-pointer'
                    />
                </form>
            </Modal>
        </div>
    );
};

export default ChangeStatusModal;
