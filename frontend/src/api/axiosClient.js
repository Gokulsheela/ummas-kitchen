import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
      console.log(localStorage);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,

  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Unexpected error occurred";

    return Promise.reject(message);
  }
);

export default axiosClient;