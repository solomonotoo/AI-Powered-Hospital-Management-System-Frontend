import { Building2, MapPin, Phone } from "lucide-react";
import { DetailSection } from "../shared-features/details-dialog/types";
import { Facility } from "./types";

export function createFacilitySections(facility: Facility): DetailSection[] {
  return [
    {
      title: "General",
      icon: <Building2 className="h-4 w-4 text-muted-foreground" />,
      items: [
        {
          label: "Facility Code",
          value: facility.code,
        },
        {
          label: "Name",
          value: facility.name,
        },
        {
          label: "Type",
          value: facility.type,
        },
        {
          label: "Status",
          value: facility.status,
        },
      ],
    },
    {
      title: "Address",
      icon: <MapPin className="h-4 w-4 text-muted-foreground" />,
      items: [
        {
          label: "Line 1",
          value: facility.location.line1,
        },
        {
          label: "Line 2",
          value: facility.location.line2,
        },
        {
          label: "City",
          value: facility.location.city,
        },
        {
          label: "PostalCode",
          value: facility.location.postalCode,
        },
        {
          label: "Country",
          value: facility.location.country,
        },
      ],
    },
    {
      title: "Contact",
      icon: <Phone className="h-4 w-4 text-muted-foreground" />,
      items: [
        {
          label: "Email",
          value: facility.contactEmail,
        },
        {
          label: "Phone Number",
          value: facility.contactPhone,
        },
      ],
    },
  ];
}
