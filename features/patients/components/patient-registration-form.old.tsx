// "use client";

// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { patientSchema } from "../schemas/patient-schema";

// type PatientFormValues = z.infer<typeof patientSchema>;

// export function PatientRegistrationForm() {
//   const form = useForm<PatientFormValues>({
//     resolver: zodResolver(patientSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       dateOfBirth: "",
//       gender: undefined,
//       phone: "",
//       nhisNumber: "",
//       ghanaCardNumber: "",
//       address: "",
//     },
//   });

//   function onSubmit(values: PatientFormValues) {
//     console.log(values);
//     // TODO: wire up to your patient registration API call
//   }

//   return (
//     <Card className="mx-auto w-full max-w-3xl ring-0">
//       <CardHeader>
//         <CardTitle>Register patient</CardTitle>
//         <CardDescription>
//           Enter the patient&apos;s details to create a new record.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form
//           id="patient-registration-form"
//           onSubmit={form.handleSubmit(onSubmit)}
//         >
//           {/*
//             Field grid: 1 column on phones/narrow tablets, 2 columns from
//             sm up. This is the pattern to reuse for any form — pairs of
//             related fields (first/last name, phone/email) sit side by
//             side once there's room, and stack cleanly when there isn't.

//             FieldGroup normally stacks its children with its own gap, so we
//             override with a grid via className on the group itself.
//           */}
//           <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <Controller
//               name="firstName"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="patient-firstName">
//                     First name
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="patient-firstName"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="Kwame"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             <Controller
//               name="lastName"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="patient-lastName">Last name</FieldLabel>
//                   <Input
//                     {...field}
//                     id="patient-lastName"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="Asante"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             <Controller
//               name="dateOfBirth"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="patient-dob">Date of birth</FieldLabel>
//                   <Input
//                     {...field}
//                     id="patient-dob"
//                     type="date"
//                     aria-invalid={fieldState.invalid}
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             <Controller
//               name="gender"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="patient-gender">Gender</FieldLabel>
//                   <Select
//                     name={field.name}
//                     value={field.value}
//                     onValueChange={field.onChange}
//                   >
//                     <SelectTrigger
//                       id="patient-gender"
//                       aria-invalid={fieldState.invalid}
//                     >
//                       <SelectValue placeholder="Select gender" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="male">Male</SelectItem>
//                       <SelectItem value="female">Female</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             <Controller
//               name="phone"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="patient-phone">Phone number</FieldLabel>
//                   <Input
//                     {...field}
//                     id="patient-phone"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="0244 123 456"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             <Controller
//               name="nhisNumber"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="patient-nhis">NHIS number</FieldLabel>
//                   <Input
//                     {...field}
//                     id="patient-nhis"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="Optional"
//                   />
//                   <FieldDescription>
//                     Leave blank if not enrolled.
//                   </FieldDescription>
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             <Controller
//               name="ghanaCardNumber"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="patient-ghana-card">
//                     Ghana Card number
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="patient-ghana-card"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="GHA-000000000-0"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             {/* Address spans both columns at sm+ via sm:col-span-2 */}
//             <Controller
//               name="address"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field
//                   className="sm:col-span-2"
//                   data-invalid={fieldState.invalid}
//                 >
//                   <FieldLabel htmlFor="patient-address">
//                     Residential address
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="patient-address"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="House number, street, town"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//           </FieldGroup>
//         </form>
//       </CardContent>
//       {/*
//         Footer actions: stack full-width on phones, inline + right
//         aligned from sm up — standard pattern for form/dialog actions.
//       */}
//       <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
//         <Button
//           type="button"
//           variant="outline"
//           className="w-full sm:w-auto"
//           onClick={() => form.reset()}
//         >
//           Cancel
//         </Button>
//         <Button
//           type="submit"
//           form="patient-registration-form"
//           className="w-full sm:w-auto"
//         >
//           Register patient
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
