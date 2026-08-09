import { timeStamp } from "console";

export interface ApiResponse<T> {
  success: boolean; // Was the request successful?
  message: string; // Any message from the server
  data: T; // The actual response data
  timeStamp: string; // When the response was sent
}
