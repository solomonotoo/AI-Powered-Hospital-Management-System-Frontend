// this file validate and export environment variables

export const env = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? "HMS",
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1",
  REQUEST_TIMEOUT: Number(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT ?? 10000),
} as const;
