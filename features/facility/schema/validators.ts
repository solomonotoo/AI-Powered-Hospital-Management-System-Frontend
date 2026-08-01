
import z from "zod";

export const optionalString = (max=150) => z
        .string()
        .trim()
        .max(max)
        .optional()
        .transform((val) =>( val === "" ? undefined : val));

export const requiredString = (label: string, max = 100) =>
z.string().trim().min(1, `${label} is required`).max(max);