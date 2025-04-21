/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICartItem } from "@/types/order.type";
import uploadImageIntoCloudinary from "@/utils/UploadImageIntoCloudinary";
import { Modal, Spin } from "antd";
// import { CloudUpload } from "lucide-react";
// import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
type IProps = {
    medicineId: string;
    cartItems: ICartItem[];
    setCartItems: Dispatch<SetStateAction<ICartItem[]>>;
};
const OrderSummeryModal = ({ medicineId, cartItems, setCartItems }: IProps) => {
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
                    item.medicine === medicineId
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
                    <div className='overflow-hidden rounded-lg border mt-5 border-black/10 '>
                        <table className='w-full border border-black/10'>
                            <tbody>
                                <tr className='border border-black/10 bg-black/10'>
                                    <th
                                        colSpan={2}
                                        className='border text-lg border-black/10 secondary_font p-2 px-3'>
                                        Order Summary
                                    </th>
                                </tr>
                                {/* <tr className='border border-black/10'>
                                    <td className='border w-1/2 border-black/10 p-2 px-3'>
                                        Price
                                    </td>
                                    <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                        ${product?.data?.price}
                                    </td>
                                </tr> */}
                                <tr className='border border-black/10'>
                                    <td className='border w-1/2 border-black/10 p-2 px-3'>
                                        Quantity
                                    </td>
                                    <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                        {/* {quantity} */}
                                    </td>
                                </tr>
                                <tr className='border border-black/10'>
                                    <td className='border w-1/2 border-black/10 p-2 px-3'>
                                        Shipping
                                    </td>
                                    <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                        ${"5"}
                                    </td>
                                </tr>
                                <tr className='border border-black/10'>
                                    <td className='border font-bold w-1/2 border-black/10 p-2 px-3'>
                                        Total
                                    </td>
                                    <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                        {/* ${product?.data?.price * quantity + 5} */}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Spin>
            </Modal>
        </div>
    );
};

export default OrderSummeryModal;
