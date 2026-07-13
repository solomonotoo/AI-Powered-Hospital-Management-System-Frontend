// export const GENDER=[
//     {value:"MALE",label:"Male"},
//     {value:"FEMALE",label:"Female"},
// ] as const;

import { genderEnum } from "../schemas/enums";

// export type Gender = (typeof GENDER)[number]["value"];


export type GenderValue = (typeof genderEnum.options)[number];

export const GENDER_OPTIONS: { value: GenderValue; label: string }[] = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
  { value: "PREFER_NOT_TO_SAY", label: "Prefer not to say" },
];
