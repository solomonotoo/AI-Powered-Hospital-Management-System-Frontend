//types for patient workspace summary and this is not placed inside Patient.ts because
//these values for these types comes from different modules

export interface PatientWorkspaceSummary{
    totalVisits: number;
    activeMedications: number;
    allegies: number;
    activeProblems: number;
    outstandingBalance: number;
    lastVisitDate?: string;
    nextAppointmentDate?:string;
}