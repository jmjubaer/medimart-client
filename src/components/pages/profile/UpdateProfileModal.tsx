"use client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Modal, Spin } from "antd";
import { IUser } from "@/types";
import Swal from "sweetalert2";
import { FaUserEdit } from "react-icons/fa";
import { updateUser } from "@/services/UserServices";
type IProps = {
    reFetch: () => void;
    userData: IUser;
};

const UpdateProfileModal = ({ reFetch, userData }: IProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>();
    const handleUpdateMedicine: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);

        try {
            const res = await updateUser(userData?._id as string, data);
            if (res?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Success ",
                    text: " successfully",
                });
                reFetch();
                setOpen(false);
                setLoading(false);
            }
            setLoading(false);
        } catch (error: any) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className=''>
            <button
                onClick={() => setOpen(true)}
                className='  cursor-pointer flex gap-2 items-center'>
                <FaUserEdit className='xs:text-3xl text-xl' />
                <span className='xs:text-xl text-lg font-semibold'>Edit Profile</span>
            </button>
            {/* Update product modal */}
            <Modal
                className=''
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <h2 className='text-3xl font text-center font-semibold'>
                    Update Profile
                </h2>
                <Spin spinning={loading} tip='Loading' size='large'>
                    <form
                        onSubmit={handleSubmit(handleUpdateMedicine)}
                        className=' mt-5'>
                        {/* Name */}
                        <div className=''>
                            <label
                                className='label_primary text-xl mt-2'
                                htmlFor='name'>
                                Name:
                            </label>
                            <input
                                className='input_field'
                                id='name'
                                defaultValue={userData?.name}
                                placeholder='Enter Name...'
                                {...register("name", {
                                    required: true,
                                })}
                            />
                            {errors.name && (
                                <span className='text-red-500 text-base'>
                                    This field is required
                                </span>
                            )}
                        </div>{" "}
                        {/* Email */}
                        <div className=''>
                            <label
                                className='label_primary text-xl mt-2'
                                htmlFor='email'>
                                Email:
                            </label>
                            <input
                                className='input_field'
                                id='email'
                                defaultValue={userData?.email}
                                placeholder='Enter Email ...'
                                {...register("email", {
                                    required: true,
                                })}
                            />
                            {errors.email && (
                                <span className='text-red-500 text-base'>
                                    This field is required
                                </span>
                            )}
                        </div>{" "}
                        {/* Name */}
                        <div className=''>
                            <label
                                className='label_primary text-xl mt-2'
                                htmlFor='phone'>
                                Phone :
                            </label>
                            <input
                                className='input_field'
                                id='phone'
                                defaultValue={userData?.phone}
                                placeholder='Enter Phone...'
                                {...register("phone", {
                                    required: true,
                                })}
                            />
                            {errors.phone && (
                                <span className='text-red-500 text-base'>
                                    This field is required
                                </span>
                            )}
                        </div>
                        <input
                            type='submit'
                            className='button_primary mt-5 bg-primary py-2 text-lg font-medium rounded-md w-full '
                        />
                    </form>
                </Spin>
            </Modal>
        </div>
    );
};

export default UpdateProfileModal;
