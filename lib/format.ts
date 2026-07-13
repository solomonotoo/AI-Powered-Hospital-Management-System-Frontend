

//shared date formatter
//reason: instead of writing new Date(patient.dateOfBirth).toLocaleDateString(...) 
//inside ten different compoenets, i simply used format(patient.dateOfBirth) 

export function formatDate(value?:string | Date, locale ="en-GB"){
    if(!value) return "--";
    
    const date = value instanceof Date ? value : new Date(value);
    if(Number.isNaN(date.getTime())){
        return "--"

    }

    return new Intl.DateTimeFormat(locale,{
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date)
}

export function formatDateTime(
    value?:string | Date,
    locale= "en-GB",
){
    if(!value ) return "--";

    const date = value instanceof Date ? value : new Date(value);

    if(Number.isNaN(date.getTime())){
        return "--";
    }

    return new Intl.DateTimeFormat(locale,{
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }).format(date);
}

export function formatPhoneNumber(phone?: string){
    return phone || "--";
}

export function formatFullName(
    firstName: string,
    middleName?:string,
    lastName?:string,
){
    return [firstName,middleName,lastName]
    .filter(Boolean)
    .join(" ")
}

export function formatCurrency(
    amount?: number,
    currency = "GHS",
    locale = "en-GH"
){

    return new Intl.NumberFormat(locale,{
        style: "currency",
        currency,
        minimumFractionDigits: 2,
    }).format(amount ?? 0);
}