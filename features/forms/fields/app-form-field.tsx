import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

/**
 * AppFormField
 * ------------
 * Reusable, type-safe field component for every form in the HMS.
 * Depends only on react-hook-form's Controller + individual shadcn
 * primitives (Input, Textarea, Checkbox, Select, Label).
 * Does NOT require the shadcn "form" component.
 *
 *
 * Supported types: text | email | tel | number | date | textarea | select | checkbox
 *
 * Usage:
 *   <AppFormField control={form.control} name="firstName" label="First name" required />
 *   <AppFormField
 *     control={form.control}
 *     name="gender"
 *     label="Gender"
 *     type="select"
 *     options={[{ label: "Male", value: "MALE" }, { label: "Female", value: "FEMALE" }]}
 *   />
 */

/**
 * In TypeScript, T is a generic type parameter (a placeholder for a specific data type).
 * Here is exactly what it represents and does in your code:
 * Type Placeholder
 * It acts as a blank variable for a type.
 * The letter T stands for "Type".
 * It represents the shape of your entire form's data.
 * Type Constraint (extends FieldValues)
 * The extends keyword enforces a strict rule.
 * T must match the structure of FieldValues
 * .FieldValues is usually an object with string keys (e.g., { username: string; age: number; }).
 * This prevents passing invalid types like numbers or strings into the generic.
 *
 * Purpose in React Hook Form
 * It links your component props directly to your form schema.
 * It ensures the control prop knows exactly what fields exist in your form.
 * It enables auto-completion and type safety for your form inputs.
 */

// ---------------------------------------------------------------------------
// Prop types — discriminated by `type` so TypeScript narrows per variant
// ---------------------------------------------------------------------------

type BaseProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  // className?: string;
  // autoComplete?: string;
};

type TextLikeProps<T extends FieldValues> = BaseProps<T> & {
  type?: "text" | "email" | "tel" | "number" | "date" | "password";
  autoComplete?: string;
  max?: string | number;
  min?: string | number;
  minDate?: Date;
  maxDate?: Date;
  startMonth?: Date;
  endMonth?: Date;
};

type TextareaProps<T extends FieldValues> = BaseProps<T> & {
  type: "textarea";
  rows?: number;
};

type SelectOption = { label: string; value: string };

type SelectProps<T extends FieldValues> = BaseProps<T> & {
  type: "select";
  options: SelectOption[];
};

type CheckboxProps<T extends FieldValues> = BaseProps<T> & {
  type: "checkbox";
  // For checkboxes the "label" reads better next to the box than above it;
  // checkboxLabel lets callers override what's rendered inline.
  //checkboxLabel?: React.ReactNode;
};



export type AppFormFieldProps<T extends FieldValues> =
  | TextLikeProps<T>
  | TextareaProps<T>
  | SelectProps<T>
  | CheckboxProps<T>;

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------
// function FieldDescription({ text }: { text: string }) {
//   return <p className="text-[0.8rem] text-muted-foreground">{text}</p>;
// }

// function FieldError({ id, message }: { id: string; message?: string }) {
//   if (!message) return null;
//   return (
//     <p
//       id={`${id}-error`}
//       role="alert"
//       className="text-[0.8rem] font-medium text-destructive"
//     >
//       {message}
//     </p>
//   );
// }


function FormFieldLabel({
  htmlFor,
  label,
  required,
  description,
}: {
  htmlFor?: string;
  label: string;
  required?: boolean;
  description?: string;
}) {
  return (
    <>
      <FieldLabel htmlFor={htmlFor}>
        {label}
        {required && (
          <span
            aria-hidden="true"
            className="ml-1 text-destructive"
          >
            *
          </span>
        )}
      </FieldLabel>

      {description && (
        <FieldDescription>
          {description}
        </FieldDescription>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// AppFormField
// ---------------------------------------------------------------------------

export function AppFormField<T extends FieldValues>(
  props: AppFormFieldProps<T>
) {
  const { control, name, label, placeholder, description, disabled, required } =
    props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        // ── Checkbox ─────────────────────────────────────────────────────────
        if (props.type === "checkbox") {
          return (
            <Field orientation="horizontal">
              <Checkbox
                id={name}
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
                onBlur={field.onBlur}
                disabled={disabled}
              />
              <div>
                <FormFieldLabel
                  htmlFor={name}
                  label={label}
                  required={required}
                  description={description}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }

        // ── select option ─────────────────────────────────────────────────────────
        if (props.type === "select") {
          return (
            <Field>
              <FormFieldLabel
                label={label}
                required={required}
                description={description}
              />
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
                disabled={disabled}
              >
                <SelectTrigger onBlur={field.onBlur}>
                  <SelectValue
                    placeholder={
                      placeholder ?? `Select ${label.toLocaleLowerCase()}`
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {props.options.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }

        // ── textarea ─────────────────────────────────────────────────────────
        if (props.type === "textarea") {
          return (
            <Field>
              <FormFieldLabel
                htmlFor={name}
                label={label}
                required={required}
                description={description}
              />
              <Textarea
                {...field}
                value={field.value ?? ""}
                placeholder={placeholder}
                rows={props.rows ?? 3}
                disabled={disabled}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }

        // ── date ─────────────────────────────────────────────────────────────
        if (props.type === "date") {
          const selectedDate = field.value ? new Date(field.value) : undefined;
          const defaultMonth = selectedDate ?? props.minDate ?? new Date();
          return (
            <Field className="mt-1">
              <FormFieldLabel
                htmlFor={name}
                label={label}
                required={required}
                description={description}
              />

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    id={name}
                    onBlur={field.onBlur}
                    data-empty={!selectedDate}
                    className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    {selectedDate
                      ? format(selectedDate, "MM/dd/yyyy")
                      : placeholder ?? "Pick a date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    defaultMonth={defaultMonth}
                    captionLayout="dropdown"
                    startMonth={props.startMonth ?? new Date(1900, 0)}
                    endMonth={props.endMonth ?? new Date(2100, 11)}
                    // for disabling future date in date of birth and enabling future date in expiring date
                    disabled={(d) =>
                      (props.minDate ? d < props.minDate : false) ||
                      (props.maxDate ? d > props.maxDate : false)
                    }
                    onSelect={(d) => {
                      field.onChange(d ? d.toISOString().split("T")[0] : "");
                    }}
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }

        return (
          <Field>
            <FormFieldLabel
              htmlFor={name}
              label={label}
              required={required}
              description={description}
            />
            <Input
              {...field}
              type={props.type ?? "text"}
              value={field.value ?? ""}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete={
                "autoComplete" in props ? props.autoComplete : undefined
              }
              min={"min" in props ? props.min : undefined}
              max={"max" in props ? props.max : undefined}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
