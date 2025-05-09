/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IProduct, IQueryParam } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Fetch all medicines with optional query parameters
export const createProduct = async (payload: IProduct) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
            method: "POST",
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        revalidateTag("OVERVIEW");
        revalidateTag("PRODUCTS");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

export const getAllProducts = async (queryParams?: IQueryParam[]) => {
    try {
        const params = new URLSearchParams();

        if (queryParams) {
            queryParams.forEach((item) => {
                params.append(item.name, item.value.toString());
            });
        }

        const queryString = params.toString();
        const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API}/products`;
        const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
        const res = await fetch(fullUrl, {
            next: {
                tags: ["PRODUCTS"],
            },

            cache: "no-cache",
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

export const getSingleProduct = async (productId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
            {
                next: {
                    tags: ["PRODUCT"],
                },
            }
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const updateProduct = async (
    productId: string,
    payload: Partial<IProduct>
) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );
        revalidateTag("PRODUCT");
        revalidateTag("OVERVIEW");
        revalidateTag("PRODUCTS");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const deleteProduct = async (productId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );
        revalidateTag("OVERVIEW");
        revalidateTag("PRODUCT");
        revalidateTag("PRODUCTS");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
