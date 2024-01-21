import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});
export { axiosInstance };
