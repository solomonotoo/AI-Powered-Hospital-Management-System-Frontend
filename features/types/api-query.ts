
// NB this file controlling search,sort, page number and number of items(size) displayed in the list page.
//thus for pagination.
export interface PageQuery{
    page?:number;
    size?:number;
    sort?:string;
    search?:string;
}