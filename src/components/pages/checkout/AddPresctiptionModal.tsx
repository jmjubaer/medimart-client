import { IOrderCartItem } from "@/types/order.type";
import uploadImageIntoCloudinary from "@/utils/UploadImageIntoCloudinary";
import { Modal, Spin } from "antd";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
type IProps = {
    medicineId: string;
    cartItems: IOrderCartItem[];
    setCartItems: Dispatch<SetStateAction<IOrderCartItem[]>>;
};
const AddPrescriptionModal = ({
    medicineId,
    cartItems,
    setCartItems,
}: IProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [prescription, setPrescription] = useState<FileList | null>(null);

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleUploadPrescription: SubmitHandler<FieldValues> = async () => {
        setLoading(true);
        try {
            if (!prescription || prescription?.length < 0) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Select a valid prescription!",
                });
                setLoading(false);
                return;
            }
            const image = await uploadImageIntoCloudinary(prescription[0]);
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
                const updated = cartItems.map((item) =>
                    item.product === medicineId
                        ? { ...item, prescription: image?.imageUrl }
                        : item
                );
                Swal.fire({
                    icon: "success",
                    title: "Success ",
                    text: "Prescription upload successfully",
                });
                setOpen(false);
                setCartItems(updated);
                setPrescription(null);
                setLoading(false);
            }
        } catch (error: any) {
            console.log(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (prescription && prescription?.length > 0) {
            const file = prescription[0]; // Extract the first file

            setImagePreview(URL.createObjectURL(file as any));
        }
    }, [prescription]);

    return (
        <div className=''>
            <button
                type='button'
                onClick={() => setOpen(true)}
                title='See Details'
                className='cursor-pointer bg-primary px-2 py-1 mt-1 rounded font-semibold text-gray-800'>
                Add Prescription
            </button>
            {/* order details modal */}
            <Modal
                className='relative'
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <Spin spinning={loading} tip='Loading' size='large'>
                    {prescription && prescription?.length > 0 && (
                        <button
                            type='button'
                            className='button_primary w-full mb-5'
                            onClick={handleUploadPrescription}>
                            Upload Prescription
                        </button>
                    )}
                    <div className=''>
                        <label
                            className={` mx-auto w-fit h-fit flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition ${
                                !prescription || prescription?.length < 0
                                    ? "border-red-400"
                                    : "border-gray-400}"
                            }`}>
                            <input
                                className='hidden'
                                id='image'
                                type='file'
                                onChange={(e) =>
                                    setPrescription(e.target.files)
                                }
                            />
                            {imagePreview ? (
                                <Image
                                    width={250}
                                    height={500}
                                    src={imagePreview}
                                    alt='Image Preview'
                                    className='w-[500px] h-[800px] object- rounded-lg'
                                />
                            ) : (
                                <div className='w-64 h-52 flex items-center justify-center'>
                                    {" "}
                                    <div className='w-fit h-fit'>
                                        <CloudUpload
                                            size={40}
                                            className='text-gray-400 mx-auto'
                                        />
                                        <p className='text-gray-400 text-sm mt-2'>
                                            Click to select
                                        </p>
                                    </div>
                                </div>
                            )}
                        </label>
                    </div>
                </Spin>
            </Modal>
        </div>
    );
};

export default AddPrescriptionModal;
