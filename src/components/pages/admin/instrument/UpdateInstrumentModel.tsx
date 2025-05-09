"use client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal, Spin } from "antd";
import { CloudUpload, Edit } from "lucide-react";
import { ICreateProduct, IProduct } from "@/types";
import Image from "next/image";
import uploadImageIntoCloudinary from "../../../../utils/UploadImageIntoCloudinary";
import Swal from "sweetalert2";
import { getSingleProduct, updateProduct } from "@/services/Products";
type IProps = {
    reFetch: () => void;
    instrumentId: string;
};

const UpdateInstrumentModal = ({ reFetch, instrumentId }: IProps) => {
    const [open, setOpen] = useState(false);
    const [instrumentData, setInstrumentData] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICreateProduct>();
    const handleUpdateInstrument: SubmitHandler<ICreateProduct> = async (
        data
    ) => {
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
                    const updateInstrumentData = {
                        ...data,
                        features: data?.features
                            ?.split(",")
                            .map((f) => f.trim()),
                        image: image?.imageUrl,
                        price: Number(data.price),
                        quantity: Number(data.quantity),
                    };

                    const result = await updateProduct(
                        instrumentId,
                        updateInstrumentData
                    );
                    if (result?.success) {
                        setLoading(false);
                        reFetch();
                        setOpen(false);
                    }
                    setLoading(false);
                }
            } else {
                const updateInstrumentData = {
                    ...data,
                    features: data?.features?.split(",").map((f) => f.trim()),
                    image: instrumentData?.image,
                    price: Number(data.price),
                    quantity: Number(data.quantity),
                };
                const result = await updateProduct(
                    instrumentId,
                    updateInstrumentData
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
            const { data } = await getSingleProduct(instrumentId);
            if (data) {
                setInstrumentData(data);
                setLoading(false);
                setImagePreview(data?.image);
            }
            setLoading(false);
        })();
    }, [instrumentId]);
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
                    Update Instrument
                </h2>
                <Spin spinning={loading} tip='Loading' size='large'>
                    <form
                        onSubmit={handleSubmit(handleUpdateInstrument)}
                        className=' mt-5'>
                        <div className='grid sm:grid-cols-3 sm:gap-5 '>
                            {/* Image */}
                            <div className=''>
                                <label
                                    className={`sm:w-4/5 mx-auto w-full min-w-64
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
                                        defaultValue={instrumentData?.name}
                                        placeholder='Instrument Name...'
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
                                {/* Brand date */}
                                <div className=''>
                                    <label
                                        className='label_primary text-xl mt-3'
                                        htmlFor='brand'>
                                        Brand:
                                    </label>
                                    <input
                                        className='input_field'
                                        id='brand'
                                        defaultValue={instrumentData?.brand}
                                        placeholder='Enter Brand'
                                        {...register("brand", {
                                            required: true,
                                        })}
                                    />
                                    {errors.brand && (
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
                                    defaultValue={
                                        instrumentData?.manufacturerDetails.name
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
                                    Manufacturer Contact :
                                </label>
                                <input
                                    className='input_field'
                                    defaultValue={
                                        instrumentData?.manufacturerDetails
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
                                        instrumentData?.manufacturerDetails
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
                        <div className='grid md:grid-cols-3 gap-3 lg:gap-5 mt-5'>
                            {/* Price */}
                            <div className=''>
                                <label
                                    className='label_primary text-xl'
                                    htmlFor='price'>
                                    Price:
                                </label>
                                <input
                                    className='input_field'
                                    id='price'
                                    defaultValue={instrumentData?.price}
                                    type='number'
                                    placeholder='Instrument Price...'
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
                            {/* Warranty Period */}
                            <div className=''>
                                <label
                                    className='label_primary text-xl '
                                    htmlFor='warrantyPeriod'>
                                    Warranty Period:
                                </label>
                                <input
                                    className='input_field'
                                    id='warrantyPeriod'
                                    defaultValue={instrumentData?.warrantyPeriod}
                                    placeholder='Warranty Period ...'
                                    {...register("warrantyPeriod", {
                                        required: true,
                                    })}
                                />
                                {errors.warrantyPeriod && (
                                    <span className='text-red-500 text-base'>
                                        This field is required
                                    </span>
                                )}
                            </div>
                            {/* quantity */}
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
                                    defaultValue={instrumentData?.quantity}
                                    placeholder='Instrument quantity...'
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
                        {/* features */}
                        <div className=''>
                            <label
                                className='label_primary text-xl mt-3'
                                htmlFor='features'>
                                Features:{" "}
                                <span className='text-sm'>
                                    (separate by comma)
                                </span>
                            </label>
                            <input
                                className='input_field'
                                defaultValue={instrumentData?.features}
                                id='features'
                                placeholder='Enter features...'
                                {...register("features", {
                                    required: true,
                                })}
                            />
                            {errors.features && (
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
                                defaultValue={instrumentData?.usageInstructions}
                                placeholder='Enter usage instructions...'
                                {...register("usageInstructions")}
                            />
                            {errors.usageInstructions && (
                                <span className='text-red-500 text-base'>
                                    This field is required
                                </span>
                            )}
                        </div>
                        <div className=''>
                            <label
                                className='label_primary  md:text-xl text-lg mt-5'
                                htmlFor='description'>
                                Instrument Description:
                            </label>
                            <textarea
                                className='input_field min-h-[100px] xs:min-h-[150px]'
                                placeholder='Enter Description ...'
                                id='description'
                                defaultValue={instrumentData?.description}
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

export default UpdateInstrumentModal;
