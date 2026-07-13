// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { PatientWorkspaceSummary } from "../../types/patient-workspace-summary";
// import { Activity } from "lucide-react";
// import { formatDate } from "@/lib/format";

// interface PatientSummaryCardsProps {
//   summary: PatientWorkspaceSummary;
// }
// export function PatientSummaryCards({ summary }: PatientSummaryCardsProps) {
//   return (
//     <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium"> Total Visits</CardTitle>
//           <Activity className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>

//         <CardContent>
//           <div className="text-2xl font-bold">{summary.totalVisits}</div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium"> Medications</CardTitle>
//           <Activity className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>

//         <CardContent>
//           <div className="text-2xl font-bold">{summary.activeMedications}</div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium"> Allergies</CardTitle>
//           <Activity className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>

//         <CardContent>
//           <div className="text-2xl font-bold">{summary.allegies}</div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium"> Active Problems</CardTitle>
//           <Activity className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>

//         <CardContent>
//           <div className="text-2xl font-bold">{summary.activeProblems}</div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">  Balance</CardTitle>
//           <Activity className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>

//         <CardContent>
//           <div className="text-2xl font-bold">{summary.outstandingBalance?.toLocaleString()}</div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">  Last Visit</CardTitle>
//           <Activity className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>

//         <CardContent>
//           <div className="text-2xl font-bold">{formatDate(summary.lastVisitDate)}</div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
