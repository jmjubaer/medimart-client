import { Modal } from "antd";
import Image from "next/image";
import { useState } from "react";
type TProps = {
    prescription: string;
};
const ShowPrescriptionModal = ({ prescription }: TProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className=''>
            <button
                onClick={() => setOpen(true)}
                title='See Details'
                className='cursor-pointer bg-primary px-2 py-1 mt-1 rounded font-semibold text-gray-800'>
                View Prescription
            </button>
            {/* order details modal */}
            <Modal
                className=' '
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <Image
                    width={500}
                    height={800}
                    src={prescription}
                    alt=''
                    className='w-full h-full border border-gray-300 object-cover rounded-md'
                />
            </Modal>
        </div>
    );
};

export default ShowPrescriptionModal;
