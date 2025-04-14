/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IMedicine, TQueryParam } from "@/types";
import { revalidateTag } from "next/cache";

// Fetch all medicines with optional query parameters
export const getAllMedicines = async (queryParams?: TQueryParam[]) => {
    try {
        const params = new URLSearchParams();

        if (queryParams) {
            queryParams.forEach((item) => {
                params.append(item.name, item.value.toString());
            });
        }

        const queryString = params.toString();
        const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API}/medicines`;
        const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
        console.log(fullUrl);
        const res = await fetch(fullUrl, {
            next: {
                tags: ["MEDICINES"],
            },
            cache: "no-cache",
        });

        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const createMedicine = async (payload: IMedicine) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/medicine`,
            {
                method: "POST",
                headers: {
                    //   Authorization: (await cookies()).get("accessToken")!.value,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );
        revalidateTag("MEDICINES");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const getSingleMedicine = async (medicineId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/medicine/${medicineId}`,
            {
                next: {
                    tags: ["MEDICINE"],
                },
            }
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const updateMedicine = async (
    medicineId: string,
    payload: Partial<IMedicine>
) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/medicine/${medicineId}`,
            {
                method: "PUT",
                headers: {
                    //   Authorization: (await cookies()).get("accessToken")!.value,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );
        revalidateTag("MEDICINE");
        revalidateTag("MEDICINES");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const deleteMedicine = async (medicineId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/medicine/${medicineId}`,
            {
                method: "DELETE",
            }
        );
        revalidateTag("MEDICINE");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
