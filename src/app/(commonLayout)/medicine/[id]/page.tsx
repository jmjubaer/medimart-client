import MedicineDetails from "@/components/pages/medicine/MedicineDetails";
import { IProduct } from "@/types";
import React from "react";

export async function generateStaticParams() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/medicines`
        ).then((res) => res.json());

        if (!response.success) {
            throw new Error(`Failed to fetch medicines: ${response.message}`);
        }

        const medicines = response?.data?.result;

        return (
            medicines?.map((medicine: IProduct) => ({
                id: medicine._id,
            })) || []
        );
    } catch (error) {
        console.error("Error in generateStaticParams:", error);
        return [];
    }
}

const MedicineDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    
    return (
        <div>
            <MedicineDetails productId={id} />
        </div>
    );
};

export default MedicineDetailsPage;
