"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const registerUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );
        const result = await res.json();
        if (result?.success) {
            (await cookies()).set("accessToken", result?.data?.accessToken);
        }
        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );
        const result = await res.json();
        if (result?.success) {
            (await cookies()).set("accessToken", result?.data?.accessToken);
        }
        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getCurrentUser = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/user/me`,
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

export const logOutUser = async () => {
    (await cookies()).delete("accessToken");
};
