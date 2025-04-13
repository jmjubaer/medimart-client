"use server";
// get all products
export const getAllMedicines = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/medicines`,
            {
                next: {
                    tags: ["<MEDICINE></MEDICINE>"],
                },
            }
        );
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
