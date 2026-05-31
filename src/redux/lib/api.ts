export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const apiConfig = {
  baseUrl: BASE_URL,
  timeout: 10000,
};
