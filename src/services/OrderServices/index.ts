"use server";
import { TQueryParam } from "@/types";
import { IOrder } from "@/types/order.type";
import { revalidateTag } from "next/cache";

export const getAllOrders = async (queryParams?: TQueryParam[]) => {
    try {
        const params = new URLSearchParams();

        if (queryParams) {
            queryParams.forEach((item) => {
                params.append(item.name, item.value.toString());
            });
        }

        const queryString = params.toString();
        const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API}/orders`;
        const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
        const res = await fetch(fullUrl, {
            next: {
                tags: ["ORDERS"],
            },
            cache: "no-cache",
        });

        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const changeOrderStatus = async (
    orderId: string,
    payload: Partial<IOrder>
) => {
    console.log(orderId,payload);
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/order/${orderId}`,
            {
                method: "PUT",
                headers: {
                    //   Authorization: (await cookies()).get("accessToken")!.value,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );
        revalidateTag("ORDERS");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
