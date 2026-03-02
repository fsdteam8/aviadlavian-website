import { z } from "zod";

export const signUpSchema = z.object({
  FirstName: z.string().min(2, "First name is required"),
  LastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
