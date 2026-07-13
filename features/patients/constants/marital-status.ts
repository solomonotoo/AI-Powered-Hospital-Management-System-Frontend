import { maritialStatusEnum } from "../schemas/enums";


export type MaritalStatusValue = (typeof maritialStatusEnum.options)[number];

export const MARITAL_STATUS_OPTIONS: {
  value: MaritalStatusValue;
  label: string;
}[] = [
  { value: "SINGLE", label: "Single" },
  { value: "MARRIED", label: "Married" },
  { value: "DIVORCED", label: "Divorced" },
  { value: "WIDOWED", label: "Widowed" },
];
