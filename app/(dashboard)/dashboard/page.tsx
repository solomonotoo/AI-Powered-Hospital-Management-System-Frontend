import {
  Activity,
  Bed,
  CalendarClock,
  Users,
  type LucideIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  delta: string;
}

const STATS: Stat[] = [
  { label: "Patients today", value: "184", icon: Users, delta: "+12%" },
  { label: "Beds occupied", value: "92 / 120", icon: Bed, delta: "76%" },
  {
    label: "Appointments",
    value: "47",
    icon: CalendarClock,
    delta: "8 PENDING_APPROVAL",
  },
  { label: "Avg. wait time", value: "23m", icon: Activity, delta: "-4m" },
];

type AdmissionStatus = "Stable" | "Observation" | "Critical";

interface Admission {
  name: string;
  ward: string;
  status: AdmissionStatus;
  time: string;
}

const RECENT_ADMISSIONS: Admission[] = [
  {
    name: "Kwame Asante",
    ward: "Surgical Ward A",
    status: "Stable",
    time: "09:12",
  },
  {
    name: "Abena Owusu",
    ward: "Maternity",
    status: "Observation",
    time: "08:47",
  },
  { name: "Yaw Boateng", ward: "ICU", status: "Critical", time: "07:55" },
  { name: "Efua Darko", ward: "Pediatrics", status: "Stable", time: "07:30" },
];

const STATUS_VARIANT: Record<
  AdmissionStatus,
  "secondary" | "outline" | "destructive"
> = {
  Stable: "secondary",
  Observation: "outline",
  Critical: "destructive",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 ">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Facility overview for today, 23 June 2026.
        </p>
      </div>

      {/*
        Stat cards: 1 col on phones, 2 cols on tablets (sm/md), 4 cols on
        desktop (lg+). This is the grid pattern to reuse anywhere you show
        summary metrics.
      */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="ring-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/*
        Two-column content area: stacks to 1 column on tablet/phone,
        splits 2/1 on desktop. This is the pattern for "main content +
        side panel" screens (e.g. patient detail + vitals panel).
      */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 ring-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent admissions</CardTitle>
              <CardDescription>Last 4 hours across all wards</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            {/*
              Table wrapped in overflow-x-auto so it scrolls horizontally
              on narrow tablets instead of breaking the layout.
            */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Ward</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RECENT_ADMISSIONS.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.ward}</TableCell>
                      <TableCell>
                        <Badge variant={STATUS_VARIANT[row.status]}>
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {row.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="ring-0
        ">
          <CardHeader>
            <CardTitle>Bed availability</CardTitle>
            <CardDescription>By department</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {[
              { dept: "Surgical Ward A", free: 4, total: 20 },
              { dept: "ICU", free: 1, total: 12 },
              { dept: "Maternity", free: 6, total: 18 },
              { dept: "Pediatrics", free: 9, total: 16 },
            ].map((d) => (
              <div
                key={d.dept}
                className="flex items-center justify-between text-sm"
              >
                <span>{d.dept}</span>
                <span className="text-muted-foreground">
                  {d.free} free / {d.total}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
