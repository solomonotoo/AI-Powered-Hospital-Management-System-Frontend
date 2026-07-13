
//this file is for page summary return from spring boot
export interface PageResponse<T>{
    content: T[];
    page: number;
    size: number;
    totalElements:number;
    totalPages:number;
}

//PageResponse<PatientSummary> will work for every list