/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

type TQueryParam = {
    name: string;
    value: string | number;
};

// Fetch all medicines with optional query parameters
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
        console.log(fullUrl);
        const res = await fetch(fullUrl, {
            next: {
                tags: ["MEDICINE"],
            },
        });

        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
