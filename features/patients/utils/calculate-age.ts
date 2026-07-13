import { differenceInYears } from "date-fns";
import { date } from "zod/v3";

//NB age should never come from the backend hospitals aways calculate age
export function calculateAge(date: string) {
  return differenceInYears(new Date(), new Date(date));
}

//the table now  displays {calculateAge(patient.date)}