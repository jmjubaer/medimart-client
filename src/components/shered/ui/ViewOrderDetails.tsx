import { Modal } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { IOrder } from "@/types/order.type";
import Image from "next/image";
import { CgMaximizeAlt } from "react-icons/cg";
import ShowPrescriptionModal from "./ShowPrescriptionModal";
import RejectOrderModal from "./RejectOrderModal";
type TProps = {
    item: IOrder;
    reFetch: () => void;
    isDashboard?: boolean;
};
const ViewOrderDetails = ({ item, reFetch, isDashboard }: TProps) => {
    const [open, setOpen] = useState(false);
    // Scroll to top

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [item]);
    return (
        <div className=''>
            <button
                onClick={() => setOpen(true)}
                title='See Details'
                className={`${
                    isDashboard
                        ? "cursor-pointer text-primary"
                        : "w-full bg-primary hover:bg-primary  font-medium cursor-pointer py-2 px-4 rounded whitespace-nowrap"
                }`}>
                {isDashboard ? (
                    <CgMaximizeAlt className='text-2xl ' />
                ) : (
                    "View Details"
                )}
            </button>
            {/* order details modal */}
            <Modal
                className='order-modal '
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <div
                    className='h-[70vh] overflow-auto'
                    style={{ scrollbarWidth: "none" }}>
                    <h2 className='secondary_font font-medium text-2xl mb-3 text-center'>
                        Order Details
                    </h2>
                    <div className='w-full grid lg:grid-cols-2 gap-5 '>
                        <div className=''>
                            <div className=''>
                                {item?.products?.map((medicine) => {
                                    return (
                                        <div
                                            key={medicine?.medicine?._id}
                                            className='mt-4 flex flex-wrap items-center gap-5'>
                                            <Image
                                                width={100}
                                                height={100}
                                                src={medicine?.medicine?.image}
                                                alt=''
                                                className='xs:w-32 xs:h-32 border border-gray-300 object-cover rounded-md'
                                            />
                                            <div className=''>
                                                <h3 className='text-xl font-medium secondary_font'>
                                                    {medicine?.medicine?.name}
                                                </h3>
                                                <p className=' text-xl font-semibold '>
                                                    <span className='font-medium text-lg mr-2'>
                                                        {" "}
                                                        Price:
                                                    </span>
                                                    ${medicine?.medicine?.price}
                                                </p>
                                                <p className=' text-xl font-semibold '>
                                                    <span className='font-medium text-lg mr-2'>
                                                        {" "}
                                                        Quantity:
                                                    </span>
                                                    {medicine?.quantity}
                                                    pcs
                                                </p>
                                                {medicine?.prescription && (
                                                    <ShowPrescriptionModal
                                                        prescription={
                                                            medicine?.prescription
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='overflow-hidden rounded-lg border mt-5 border-black/10 '>
                                <table className='w-full border text-base border-black/10'>
                                    <tbody>
                                        <tr className='border border-black/10 bg-black/10'>
                                            <th
                                                colSpan={2}
                                                className='border text-lg border-black/10 secondary_font p-2 px-3'>
                                                Order Summary
                                            </th>
                                        </tr>
                                        <tr className='border border-black/10'>
                                            <td className='border w-1/2 border-black/10 p-2 px-3'>
                                                Quantity
                                            </td>
                                            <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                                {item?.products?.length}
                                            </td>
                                        </tr>
                                        <tr className='border border-black/10'>
                                            <td className='border w-1/2 border-black/10 p-2 px-3'>
                                                Shipping{" "}
                                                {item?.deliveryOptions ===
                                                "Express" ? (
                                                    <span className='text-xs'>
                                                        {" "}
                                                        (Express)
                                                    </span>
                                                ) : item?.deliveryOptions ===
                                                  "Standard" ? (
                                                    <span className='text-xs'>
                                                        {" "}
                                                        (Standard)
                                                    </span>
                                                ) : (
                                                    <span className='text-xs'>
                                                        (Pickup from Store)
                                                    </span>
                                                )}
                                            </td>
                                            <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                                $
                                                {item?.deliveryOptions ===
                                                "Express"
                                                    ? 30
                                                    : item?.deliveryOptions ===
                                                      "Standard"
                                                    ? 20
                                                    : 0}
                                            </td>
                                        </tr>
                                        <tr className='border border-black/10'>
                                            <td className='border font-bold w-1/2 border-black/10 p-2 px-3'>
                                                Total
                                            </td>
                                            <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                                ${item?.totalPrice.toFixed(2)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <div className='bg-black/10 p-3 rounded-md text-base'>
                                <h2 className='secondary_font font-medium text-xl text-center'>
                                    Delivery Details
                                </h2>
                                <div className='grid xs:grid-cols-2 gap-3 mt-2'>
                                    <p>
                                        <span className='font-medium '>
                                            Name:
                                        </span>{" "}
                                        {item?.deliveryInfo?.name}
                                    </p>
                                    <p>
                                        <span className='font-medium mt-3'>
                                            Number:
                                        </span>{" "}
                                        {item?.deliveryInfo?.phoneNumber}
                                    </p>
                                </div>
                                <div className='grid xs:grid-cols-2 gap-3 mt-2'>
                                    <p>
                                        <span className='font-medium '>
                                            City:
                                        </span>{" "}
                                        {item?.deliveryInfo?.city}
                                    </p>
                                    <p>
                                        <span className='font-medium mt-3'>
                                            District:
                                        </span>{" "}
                                        {item?.deliveryInfo?.district}
                                    </p>
                                </div>
                                <div className='grid xs:grid-cols-2 gap-3 mt-2'>
                                    <p>
                                        <span className='font-medium '>
                                            Thana/Upozila:
                                        </span>{" "}
                                        {item?.deliveryInfo?.thana}
                                    </p>
                                    <p>
                                        <span className='font-medium '>
                                            Postal Code:
                                        </span>{" "}
                                        {item?.deliveryInfo?.postalCode}
                                    </p>
                                </div>
                                <p className='mt-3'>
                                    <span className='font-medium '>
                                        Local Address:
                                    </span>{" "}
                                    {item?.deliveryInfo?.localAddress}
                                </p>
                            </div>

                            <div className='bg-primary/20 rounded-md p-3 mt-3'>
                                <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                    <p className='text-lg'>Payment Method: </p>
                                    <p className='text-lg font-medium capitalize'>
                                        {item.paymentMethod}
                                    </p>
                                </div>
                                <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                    <p className='text-lg'>Payment Status: </p>
                                    <p className='text-lg font-medium capitalize'>
                                        {item.paymentStatus}
                                    </p>
                                </div>{" "}
                                <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                    <p className='text-lg'>Order Status: </p>
                                    <p className='text-lg font-medium capitalize'>
                                        {item.status}
                                    </p>
                                </div>
                                {item.rejectNotes && (
                                    <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                        <p className='text-lg'>
                                            Reject Notes:{" "}
                                        </p>
                                        <p className=' font-medium capitalize'>
                                            {item.rejectNotes}
                                        </p>
                                    </div>
                                )}
                                <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                    <p className='text-lg'>Delivery Method: </p>
                                    <p className='text-lg font-medium capitalize'>
                                        {item.deliveryOptions}
                                    </p>
                                </div>
                                <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                    <p className='text-lg'>Order Date: </p>
                                    <p className='text-lg font-medium capitalize'>
                                        {moment(item.createdAt).format(
                                            "DD MMM YYYY"
                                        )}
                                    </p>
                                </div>
                            </div>

                            <RejectOrderModal
                                reFetch={reFetch}
                                status={item?.status}
                                id={item?.key as string}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ViewOrderDetails;
