"use server";
import { IContact, IQueryParam } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
export const sendContactMessage = async (payload: IContact) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        revalidateTag("CONTACT");
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log(error);
        return Error(error.message);
    }
};
export const getAllContactMessage = async (queryParams?: IQueryParam[]) => {
    try {
        const params = new URLSearchParams();

        if (queryParams) {
            queryParams.forEach((item) => {
                params.append(item.name, item.value.toString());
            });
        }

        const queryString = params.toString();
        const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API}/contacts`;
        const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
        const res = await fetch(fullUrl, {
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["CONTACT"],
            },
            cache: "no-cache",
        });

        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
