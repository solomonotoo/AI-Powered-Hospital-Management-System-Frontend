import { PatientWorkspaceSummary } from "../../types/patient-workspace-summary";
import {
  Activity,
  CalendarClock,
  CreditCard,
  LucideIcon,
  Pill,
  Stethoscope,
  TriangleAlert,
} from "lucide-react";
import { formatDate } from "@/lib/format";
import { MetricCard } from "@/features/shared-features/metric-card";

//check patient-summary-cards-old.tsx for the previous code
//the previous code works and is updated because  we're repeating the same Card structure six times.
// In a large application, that's repetitive and harder to maintain. A more scalable approach is to define
//  an array of card metadata and render the cards with .map().

// The advantages are:

// Adding a new summary card only requires adding one object to the array.
// All cards stay visually consistent.
// The component becomes much shorter and easier to maintain.
// It aligns with the reusable, component-driven architecture we've been following.
//we'll make the component(cards) data-driven.

interface PatientSummaryCardsProps {
  summary: PatientWorkspaceSummary;
}

interface SummaryCard {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export function PatientSummaryCards({ summary }: PatientSummaryCardsProps) {
  const cards: SummaryCard[] = [
    { title: "Total Visits", value: summary.totalVisits, icon: Activity },
    { title: "Medication", value: summary.activeMedications, icon: Pill },
    { title: "Allergies", value: summary.allegies, icon: TriangleAlert },
    {
      title: "Active Problems",
      value: summary.activeProblems,
      icon: Stethoscope,
    },
    { title: "Balance", value: summary.outstandingBalance, icon: CreditCard },
    {
      title: "Last Visit",
      value: formatDate(summary.lastVisitDate),
      icon: CalendarClock,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-5 xl:grid-cols-6">
      {cards.map(({ title, value, icon: Icon }) => (
        //Instead of rendering a Card directly in the cards.map (...) 
        //we will replace with metric card from /shared/metric-card.tsx
        // <Card
        //   key={title}
        //   className={cn(
        //     "rounded-lg border bg-card text-card-foreground shadow-sm ring-0",
        //     getDefaultClassNames
        //   )}
        // >
        //   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        //     <CardTitle className="text-sm font-medium"> {title}</CardTitle>
        //     <Icon className="h-4 w-4 text-muted-foreground" />
        //   </CardHeader>

        //   <CardContent>
        //     <div className="text-2xl font-bold">{value}</div>
        //   </CardContent>
        // </Card>

        <MetricCard key={title} title={title} value={value} icon={Icon} />
      ))}
    </div>
  );
}
