/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IMedicine, TQueryParam } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Fetch all medicines with optional query parameters
export const createMedicine = async (payload: IMedicine) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/medicine`,
            {
                method: "POST",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );
        revalidateTag("OVERVIEW");
        revalidateTag("MEDICINES");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

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
        const res = await fetch(fullUrl, {
            next: {
                tags: ["MEDICINES"],
            },

            cache: "force-cache",
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

export const getCartMedicine = async (payload: string[]) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/get-cart-medicines`,
            {
                method: "POST",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );
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
                    Authorization: (await cookies()).get("accessToken")!.value,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );
        revalidateTag("MEDICINE");
        revalidateTag("OVERVIEW");
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
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );
        revalidateTag("OVERVIEW");
        revalidateTag("MEDICINE");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
