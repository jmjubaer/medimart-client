"use server";
import { TQueryParam } from "@/types";
import { revalidateTag } from "next/cache";

export const getAllUsers = async (queryParams?: TQueryParam[]) => {
    try {
        const params = new URLSearchParams();

        if (queryParams) {
            queryParams.forEach((item) => {
                params.append(item.name, item.value.toString());
            });
        }

        const queryString = params.toString();
        const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API}/user`;
        const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
        console.log(fullUrl);
        const res = await fetch(fullUrl, {
            next: {
                tags: ["USERS"],
            },
            cache: "no-cache",
        });

        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const changeUserStatus = async (userId: string, status: string) => {
    try {
        console.log(status);
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/user/change-status/${userId}`,
            {
                method: "PUT",
                headers: {
                    //   Authorization: (await cookies()).get("accessToken")!.value,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({status}),
            }
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const deleteUser = async (userId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}`,
            {
                method: "DELETE",
            }
        );
        revalidateTag("USERS");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
