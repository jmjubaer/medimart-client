"use server";
import { IQueryParam } from "@/types";
import { ICreateOrder, IOrder } from "@/types/order.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
export const createOrder = async (payload: ICreateOrder) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/create-order`,
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
        revalidateTag("ORDERS");
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log(error);
        return Error(error.message);
    }
};
export const getAllOrders = async (queryParams?: IQueryParam[]) => {
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
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
        });

        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const getUserOrders = async (userId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/orders/${userId}`,
            {
                next: {
                    tags: ["ORDERS"],
                },
                cache: "no-cache",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );

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
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/order/${orderId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );
        revalidateTag("ORDERS");
        revalidateTag("OVERVIEW");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

export const verifiedPayment = async (order_id: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/order/verify-payment?order_id=${order_id}`,
            {
                cache: "no-cache",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );

        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const getOverview = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/overview`,
            {
                next: {
                    tags: ["OVERVIEW"],
                },
                cache: "no-cache",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );

        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
