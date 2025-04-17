"use server";
import { FieldValues } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const registerUser = async (userData: FieldValues) => {
    try {
        console.log(userData);
    } catch (error: any) {
        return Error(error);
    }
};
