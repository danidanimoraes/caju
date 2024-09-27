import axios from "axios";

export const clientApi = axios.create({
  baseURL: "http://localhost:3000",
});
