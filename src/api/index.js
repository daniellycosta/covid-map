import axios from "axios";

export const api = axios.create({
  baseURL: "https://corona-api.com",
});
