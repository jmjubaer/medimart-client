import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Name is Required!"),

    email: z
        .string()
        .min(1, "Email is Required!")
        .email("Invalid email format"),

    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number is too long")
        .regex(/^\d+$/, "Phone number must contain only digits"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    city: z.string().min(1, "City is Required!"),
    district: z.string().min(1, "district is Required!"),
    thana: z.string().min(1, "Thana is Required!"),
    postalCode: z
        .string()
        .min(1, "Postal Code is Required!")
        .regex(/^\d+$/, "Postal Code must contain only digits"),
    localAddress: z.string().min(1, "Local Address is Required!"),
});
