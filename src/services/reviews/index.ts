"use server";
import { IQueryParam } from "@/types";
import { ICreateOrder } from "@/types/order.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
export const createReview = async (payload: ICreateOrder) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/create-review`,
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
        revalidateTag("REVIEWS");
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log(error);
        return Error(error.message);
    }
};
export const getAllReviews = async (queryParams?: IQueryParam[]) => {
    try {
        const params = new URLSearchParams();

        if (queryParams) {
            queryParams.forEach((item) => {
                params.append(item.name, item.value.toString());
            });
        }

        const queryString = params.toString();
        const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API}/reviews`;
        const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
        const res = await fetch(fullUrl, {
            next: {
                tags: ["REVIEWS"],
            },
            cache: "no-cache",
        });

        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
