import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "Email or phone is required").refine(
    (val) =>
      /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(val) || /^\+?[0-9]{10,15}$/.test(val),
    {
      message: "Must be a valid email or phone number",
    }
  ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
