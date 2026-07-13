

// spring boot exception handler should return something like this
// {
//     "success": false,
//     "message": "Validation failed",
//     "errors": [
//       {
//         "field": "firstName",
//         "message": "First name is required"
//       }
//     ],
//     "timestamp": "..."
//   }

export interface ApiFieldError{
    field:string;
    message:string;
}

export interface ApiErrorResponse{
    success:false;
    messsage:string;
    error?: ApiFieldError[];
    timestamp:string;
}