import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  timeout: 5000
});



let isRefreshing = false;
let queue = [];

const processQueue = (error, token = null) => {
  queue.forEach((p) => {
    error ? p.reject(error) : p.resolve(token);
  });
  queue = [];
};

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    
    console.log("interceptor response",error.response.data);
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    const { status, data } = error.response;

    console.log("Request URL:", originalRequest.url);
console.log("Status:", status);
console.log("Code:", data.code);

    // 🔥 ONLY auth logic here
    if (status === 401 && data.code === "TOKEN_EXPIRED") {
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosClient(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("Calling refresh endpoint...");
        const res = await axiosClient.post("/auth/refresh", {},{
          withCredentials: true
      });
       console.log("Refresh success:", res.data);
        const newToken = res.data.accessToken;

        localStorage.setItem("accessToken", newToken);

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosClient(originalRequest);
      } catch (err) {
        processQueue(err);

        localStorage.clear();
        window.location.href = "/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;