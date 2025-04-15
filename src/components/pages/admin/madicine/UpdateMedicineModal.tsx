"use client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal, Spin, Switch } from "antd";
import { CloudUpload, Edit } from "lucide-react";
import { IMedicine } from "@/types";
import Image from "next/image";
import uploadImageIntoCloudinary from "../../../../utils/UploadImageIntoCloudinary";
import { getSingleMedicine, updateMedicine } from "@/services/Medicines";
import Swal from "sweetalert2";
type IProps = {
    reFetch: () => void;
    medicineId: string;
};

const UpdateMedicineModal = ({ reFetch, medicineId }: IProps) => {
    const [open, setOpen] = useState(false);
    const [medicineData, setMedicineData] = useState<IMedicine | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [requiredPrescription, setRequiredPrescription] =
        useState<boolean>(false);
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IMedicine>();
    const handleUpdateMedicine: SubmitHandler<IMedicine> = async (data) => {
        setLoading(true);

        try {
            if (data?.image?.length > 0) {
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
                    const updateMedicineData = {
                        ...data,
                        requiredPrescription,
                        image: image?.imageUrl,
                        price: Number(data.price),
                        quantity: Number(data.quantity),
                    };
                    console.log(updateMedicineData);

                    const result = await updateMedicine(
                        medicineId,
                        updateMedicineData
                    );
                    if (result?.success) {
                        setLoading(false);
                        reFetch();
                        setOpen(false);
                    }
                    setLoading(false);
                }
            } else {
                const updateMedicineData = {
                    ...data,
                    requiredPrescription,
                    image: medicineData?.image,
                    price: Number(data.price),
                    quantity: Number(data.quantity),
                };
                console.log(updateMedicineData);
                const result = await updateMedicine(
                    medicineId,
                    updateMedicineData
                );
                if (result?.success) {
                    setLoading(false);
                    reFetch();
                    setOpen(false);
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
    useEffect(() => {
        setLoading(true);
        (async () => {
            const { data } = await getSingleMedicine(medicineId);
            if (data) {
                setMedicineData(data);
                setLoading(false);
                setImagePreview(data?.image);
                setRequiredPrescription(data?.requiredPrescription);
            }
            setLoading(false);
        })();
    }, [medicineId]);
    return (
        <div className=''>
            <button
                onClick={() => setOpen(true)}
                className='mt-2 cursor-pointer text-primary'>
                <Edit />
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
                <Spin spinning={loading} tip='Loading' size='large'>
                    <form
                        onSubmit={handleSubmit(handleUpdateMedicine)}
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
                                        {...register("image")}
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
                                        defaultValue={medicineData?.name}
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
                                        defaultValue={
                                            medicineData?.expiryDate
                                                ? new Date(
                                                      medicineData.expiryDate
                                                  )
                                                      .toISOString()
                                                      .split("T")[0]
                                                : ""
                                        }
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
                                    defaultValue={
                                        medicineData?.manufacturerDetails.name
                                    }
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
                                    Manufacturer Contact{" "}
                                    <span className='text-sm'>
                                        (email/number)
                                    </span>
                                    :
                                </label>
                                <input
                                    className='input_field'
                                    defaultValue={
                                        medicineData?.manufacturerDetails
                                            .contact
                                    }
                                    id='manufacturerContact'
                                    placeholder=' Manufacturer Contact...'
                                    {...register(
                                        "manufacturerDetails.contact",
                                        {
                                            required: true,
                                        }
                                    )}
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
                                    defaultValue={
                                        medicineData?.manufacturerDetails
                                            .location
                                    }
                                    {...register(
                                        "manufacturerDetails.location",
                                        {
                                            required: true,
                                        }
                                    )}
                                />
                                {errors.manufacturerDetails?.location && (
                                    <span className='text-red-500 text-base'>
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
                                    defaultValue={medicineData?.price}
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
                                    className='label_primary text-xl mt-2'
                                    htmlFor='quantity'>
                                    Quantity:
                                </label>
                                <input
                                    className='input_field'
                                    id='quantity'
                                    type='number'
                                    defaultValue={medicineData?.quantity}
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
                        {/* Price */}
                        <div className=''>
                            <label
                                className='label_primary text-xl mt-3'
                                htmlFor='symptoms'>
                                Symptoms:
                            </label>
                            <input
                                className='input_field'
                                id='symptoms'
                                defaultValue={medicineData?.symptoms}
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
                                defaultValue={medicineData?.description}
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
                                onChange={(value) =>
                                    setRequiredPrescription(value)
                                }
                                checkedChildren='Yes'
                                unCheckedChildren='NO'
                                defaultValue={
                                    medicineData?.requiredPrescription
                                }
                            />
                        </div>
                        <input
                            type='submit'
                            className='button_primary bg-primary py-2 text-lg font-medium rounded-md w-full mt-2'
                        />
                    </form>
                </Spin>
            </Modal>
        </div>
    );
};

export default UpdateMedicineModal;
