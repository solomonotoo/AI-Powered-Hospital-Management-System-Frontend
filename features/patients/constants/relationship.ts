import { relationshipEnum } from "../schemas/enums";

export type RelationshipValue = (typeof relationshipEnum.options)[number];

export const RELATIONSHIP_OPTIONS: {
  value: RelationshipValue;
  label: string;
}[] = [
  { value: "SPOUSE", label: "Spouse" },
  { value: "PARENT", label: "Parent" },
  { value: "CHILD", label: "Child" },
  { value: "SIBLING", label: "Sibling" },
  { value: "GUARDIAN", label: "Guardian" },
  { value: "RELATIVE", label: "Other relative" },
  { value: "FRIEND", label: "Friend" },
  { value: "OTHER", label: "Other (please specify)", },
];
