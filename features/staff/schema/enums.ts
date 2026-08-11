import { z } from "zod";

export const genderEnum = z.enum([
    "MALE",
    "FEMALE",
    "OTHER",
    "PREFER_NOT_TO_SAY",
]);

