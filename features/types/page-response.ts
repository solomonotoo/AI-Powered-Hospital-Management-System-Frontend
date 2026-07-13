

export interface PageResponse<T>{
    content: T[];
    page:number;
    size:number;
    totalElements:number;
    tatoalPages:number;
    first:boolean;
    last:boolean;
}