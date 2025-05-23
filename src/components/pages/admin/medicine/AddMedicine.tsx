"use client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spin, Switch } from "antd";
import { CloudUpload } from "lucide-react";
import { IProduct } from "@/types";
import Image from "next/image";
import uploadImageIntoCloudinary from "../../../../utils/UploadImageIntoCloudinary";
import Swal from "sweetalert2";
import { createProduct } from "@/services/Products";
const AddMedicine = () => {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [requiredPrescription, setRequiredPrescription] =
        useState<boolean>(false);
    const {
        reset,
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IProduct>();
    const handleAddMedicine: SubmitHandler<IProduct> = async (data) => {
        setLoading(true);
        try {
            const image = await uploadImageIntoCloudinary(data.image[0]);
            if (image?.error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to upload image!",
                });
                setLoading(false);
                return;
            }
            if (image?.imageUrl) {
                const medicineData = {
                    ...data,
                    type: "medicine" as const,
                    requiredPrescription,
                    image: image?.imageUrl,
                    price: Number(data.price),
                    quantity: Number(data.quantity),
                };
                const result = await createProduct(medicineData);
                console.log(result);
                if (result?.success) {
                    setImagePreview(null);
                    setLoading(false);
                    reset();
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Medicine add successfully",
                    });
                }
                setLoading(false);
            }
        } catch (error: any) {
            console.log(error);
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
            <h2 className='text-3xl font text-center font-semibold'>
                Add Medicine
            </h2>
            <Spin spinning={loading} tip='Loading' size='large'>
                <form
                    onSubmit={handleSubmit(handleAddMedicine)}
                    className=' mt-5'>
                    <div className='grid sm:grid-cols-3 sm:gap-5 '>
                        {/* Image */}
                        <div className=''>
                            <label
                                className={`md:w-4/5 mx-auto w-full min-w-64
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
                                    <span className='text-red-500 text-base'>
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
                                    <span className='text-red-500 text-base'>
                                        This field is required
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-3 gap-3 lg:gap-5 mt-5'>
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
                                <span className='text-red-500 text-base'>
                                    This field is required
                                </span>
                            )}
                        </div>
                        {/* manufacturer contact */}
                        <div className=''>
                            <label
                                className='label_primary text-xl mt-2'
                                htmlFor='manufacturerContact'>
                                Manufacturer Contact :
                            </label>
                            <input
                                className='input_field'
                                id='manufacturerContact'
                                placeholder='Email or phone ...'
                                {...register("manufacturerDetails.contact", {
                                    required: true,
                                })}
                            />
                            {errors.manufacturerDetails?.contact && (
                                <span className='text-red-500 text-base'>
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
                                <span className='text-red-500 text-base'>
                                    This field is required
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='grid sm:grid-cols-2 gap-x-5 sm:gap-5 mt-5'>
                        {/* Price */}
                        <div className=''>
                            <label
                                className='label_primary text-xl '
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
                                <span className='text-red-500 text-base'>
                                    This field is required
                                </span>
                            )}
                        </div>
                        <div className=''>
                            <label
                                className='label_primary text-xl '
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
                                <span className='text-red-500 text-base'>
                                    This field is required
                                </span>
                            )}
                        </div>
                    </div>
                    {/* Symptoms */}
                    <div className=''>
                        <label
                            className='label_primary text-xl mt-3'
                            htmlFor='symptoms'>
                            Symptoms:
                        </label>
                        <input
                            className='input_field'
                            id='symptoms'
                            placeholder='Enter Symptoms...'
                            {...register("symptoms", {
                                required: true,
                            })}
                        />
                        {errors.symptoms && (
                            <span className='text-red-500 text-base'>
                                This field is required
                            </span>
                        )}
                    </div>
                    {/* Usage Instruction */}
                    <div className=''>
                        <label
                            className='label_primary text-xl mt-3'
                            htmlFor='usageInstructions'>
                            Usage Instruction:{" "}
                            <span className='text-sm'>(Optional)</span>
                        </label>
                        <input
                            className='input_field'
                            id='usageInstructions'
                            placeholder='Enter usage instructions...'
                            {...register("usageInstructions")}
                        />
                        {errors.usageInstructions && (
                            <span className='text-red-500 text-base'>
                                This field is required
                            </span>
                        )}
                    </div>
                    {/* Description */}
                    <div className=''>
                        <label
                            className='label_primary  md:text-xl text-lg mt-5'
                            htmlFor='description'>
                            Medicine Description:
                        </label>
                        <textarea
                            className='input_field xs:min-h-[150px] min-h-[100px]'
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
                        <label className='label_primary text-xl mt-2 mr-3 xs:mr-5'>
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
            </Spin>
        </div>
    );
};

export default AddMedicine;
