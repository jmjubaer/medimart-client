"use client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Modal, Switch } from "antd";
import { CloudUpload, LucideCirclePlus } from "lucide-react";
import { IMedicine } from "@/types";
import Image from "next/image";
const AddMedicineModal = () => {
    const [open, setOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [requiredPrescription, setRequiredPrescription] =
        useState<boolean>(false);
    console.log(requiredPrescription);
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IMedicine>();
    const handleAddMedicine: SubmitHandler<IMedicine> = async (data) => {
        const toastId = toast.loading("Medicine adding ....");
        try {
            console.log(data);
            // const updateProductData = {
            //     price: Number(data.price),
            //     quantity: Number(data.quantity),
            // };
            // console.log(updateProductData);
            // const result = await updateProduct({
            //     data: updateProductData,
            //     id: item?.key,
            // });
            // if (result?.data?.success) {
            //     toast.success("Bicycle updated successful", { id: toastId });
            //     setOpen(false);
            // }
        } catch (error: any) {
            toast.error(error.message, { id: toastId });
        }
    };
    useEffect(() => {
        const fileList = watch("image"); // Watch file input

        if (fileList && fileList.length > 0) {
            const file = fileList[0]; // Extract the first file

            setImagePreview(URL.createObjectURL(file as any));
        }
    }, [watch("image")]);
    return (
        <div className=''>
            <button
                onClick={() => setOpen(true)}
                className='bg-primary px-3 py-2 rounded-md flex items-center gap-2 text-base'>
                <LucideCirclePlus className='text-lg' />
                Add Product
            </button>
            {/* Update product modal */}
            <Modal
                className='add-medicine-modal'
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <h2 className='text-3xl font text-center font-semibold'>
                    Add Medicine
                </h2>
                <form
                    onSubmit={handleSubmit(handleAddMedicine)}
                    className=' mt-5'>
                    <div className='grid sm:grid-cols-3 sm:gap-5 '>
                        {/* Image */}
                        <div className=''>
                            <label
                                className={`sm:w-4/5 mx-auto w-64
                                     h-52 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition ${
                                         errors.image
                                             ? "border-red-400"
                                             : "border-gray-400}"
                                     }`}>
                                <input
                                    className='hidden'
                                    id='image'
                                    type='file'
                                    {...register("image", {
                                        required: true,
                                    })}
                                />
                                {imagePreview ? (
                                    <Image
                                        width={100}
                                        height={150}
                                        src={imagePreview}
                                        alt='Image Preview'
                                        className='w-full h-full object- rounded-lg'
                                    />
                                ) : (
                                    <>
                                        {" "}
                                        <CloudUpload
                                            size={40}
                                            className='text-gray-400'
                                        />
                                        <p className='text-gray-400 text-sm mt-2'>
                                            Click to select
                                        </p>
                                    </>
                                )}
                            </label>
                            {errors.image && (
                                <span className='text-red-500 text-base'>
                                    This field is required
                                </span>
                            )}
                        </div>
                        <div className='col-span-2 flex flex-col justify-between'>
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
                                    placeholder='Medicine Name...'
                                    {...register("name", {
                                        required: true,
                                    })}
                                />
                                {errors.name && (
                                    <span className='text-white'>
                                        This field is required
                                    </span>
                                )}
                            </div>
                            {/* Expiry date */}
                            <div className=''>
                                <label
                                    className='label_primary text-xl mt-3'
                                    htmlFor='expiryDate'>
                                    ExpiryDate:
                                </label>
                                <input
                                    className='input_field'
                                    id='expiryDate'
                                    type='date'
                                    {...register("expiryDate", {
                                        required: true,
                                    })}
                                />
                                {errors.expiryDate && (
                                    <span className='text-white'>
                                        This field is required
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-x-5 sm:gap-5 mt-5'>
                        {/* manufacturer name */}
                        <div className=''>
                            <label
                                className='label_primary text-xl mt-2'
                                htmlFor='manufacturerName'>
                                Manufacturer Name:
                            </label>
                            <input
                                className='input_field'
                                id='manufacturerName'
                                placeholder=' Manufacturer Name...'
                                {...register("manufacturerDetails.name", {
                                    required: true,
                                })}
                            />
                            {errors.manufacturerDetails?.name && (
                                <span className='text-white'>
                                    This field is required
                                </span>
                            )}
                        </div>
                        {/* manufacturer contact */}
                        <div className=''>
                            <label
                                className='label_primary text-xl mt-2'
                                htmlFor='manufacturerContact'>
                                Manufacturer Contact{" "}
                                <span className='text-sm'>(email/number)</span>:
                            </label>
                            <input
                                className='input_field'
                                id='manufacturerContact'
                                placeholder=' Manufacturer Contact...'
                                {...register("manufacturerDetails.contact", {
                                    required: true,
                                })}
                            />
                            {errors.manufacturerDetails?.contact && (
                                <span className='text-white'>
                                    This field is required
                                </span>
                            )}
                        </div>
                        {/* manufacturer location */}
                        <div className=''>
                            <label
                                className='label_primary text-xl mt-2'
                                htmlFor='manufacturerLocation'>
                                Manufacturer Location:
                            </label>
                            <input
                                className='input_field'
                                id='manufacturerLocation'
                                placeholder=' Manufacturer Location...'
                                {...register("manufacturerDetails.location", {
                                    required: true,
                                })}
                            />
                            {errors.manufacturerDetails?.location && (
                                <span className='text-white'>
                                    This field is required
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-x-5 sm:gap-5 mt-5'>
                        {/* Price */}
                        <div className=''>
                            <label
                                className='label_primary text-xl mt-3'
                                htmlFor='price'>
                                Price:
                            </label>
                            <input
                                className='input_field'
                                id='price'
                                type='number'
                                placeholder='Medicine Price...'
                                {...register("price", {
                                    required: true,
                                })}
                            />
                            {errors.price && (
                                <span className='text-white'>
                                    This field is required
                                </span>
                            )}
                        </div>
                        <div className=''>
                            <label
                                className='label_primary text-xl mt-2'
                                htmlFor='quantity'>
                                Quantity:
                            </label>
                            <input
                                className='input_field'
                                id='quantity'
                                type='number'
                                placeholder='Medicine quantity...'
                                {...register("quantity", {
                                    required: true,
                                })}
                            />
                            {errors.quantity && (
                                <span className='text-white'>
                                    This field is required
                                </span>
                            )}
                        </div>
                    </div>
                    <div className=''>
                        <label
                            className='label_primary  md:text-xl text-lg mt-5'
                            htmlFor='description'>
                            Medicine Description:
                        </label>
                        <textarea
                            className='input_field min-h-[150px]'
                            placeholder='Enter Description ...'
                            id='description'
                            {...register("description", {
                                required: true,
                            })}
                        />
                        {errors.description && (
                            <span className='text-red-500 text-base'>
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className=''>
                        <label className='label_primary text-xl mt-2 mr-5'>
                            Prescription Required:
                        </label>
                        <Switch
                            onChange={(value) => setRequiredPrescription(value)}
                            checkedChildren='Yes'
                            unCheckedChildren='NO'
                        />
                    </div>
                    <input
                        type='submit'
                        className='button_primary bg-primary py-2 text-lg font-medium rounded-md w-full mt-2'
                    />
                </form>
            </Modal>
        </div>
    );
};

export default AddMedicineModal;
