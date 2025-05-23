"use server";
import { IUser, IQueryParam } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllUsers = async (queryParams?: IQueryParam[]) => {
    try {
        const params = new URLSearchParams();

        if (queryParams) {
            queryParams.forEach((item) => {
                params.append(item.name, item.value.toString());
            });
        }

        const queryString = params.toString();
        const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API}/users`;
        const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
        const res = await fetch(fullUrl, {
            next: {
                tags: ["USERS"],
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
export const getSingleUser = async (userId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`,
            {
                next: {
                    tags: ["USER"],
                },
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
export const updateUser = async (userId: string, payload: Partial<IUser>) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );
        revalidateTag("USER");
        revalidateTag("USERS");
        revalidateTag("OVERVIEW");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const changeUserStatus = async (userId: string, status: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/change-status/${userId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            }
        );
        revalidateTag("USERS");
        revalidateTag("OVERVIEW");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const changeUserRole = async (userId: string, role: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/change-role/${userId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role }),
            }
        );
        revalidateTag("USER");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const deleteUser = async (userId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );
        revalidateTag("USERS");
        revalidateTag("OVERVIEW");
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
