import { axiosInstance } from "./axios";

export async function login(email: string, password: string) {
  try {
    const { data } = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return data;
  }
  catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export async function register(
  username: string,
  email: string,
  password: string,
) {
  try {
    const { data } = await axiosInstance.post("/auth/register", {
      username,
      email,
      password,
    });
    return data;
  }
  catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const { data } = await axiosInstance.get("/auth/logout");
    return data;
  }
  catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
}

export async function check() {
  try {
    const { data } = await axiosInstance.get("/auth/check");
    return data;
  }
  catch (error) {
    if ((error as any)?.response?.status === 401) {
      return null;
    }
    console.error("Auth check failed:", error);
    throw error;
  }
}

export async function getUsers() {
  try {
    const { data } = await axiosInstance.get("/users");
    return data;
  }
  catch (error) {
    console.error("Get users failed:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  try {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  }
  catch (error) {
    console.error("Get user failed:", error);
    throw error;
  }
}

export async function getDoctors() {
  try {
    const { data } = await axiosInstance.get("/users/doctors");
    return data;
  }
  catch (error) {
    console.error("Get doctors failed:", error);
    throw error;
  }
}

export async function getDoctor(id: string) {
  try {
    const { data } = await axiosInstance.get(`/users/doctors/${id}`);
    return data;
  }
  catch (error) {
    console.error("Get doctor failed:", error);
    throw error;
  }
}

export async function addScan(data: any) {
  try {
    const response = await axiosInstance.post("/users/scan", { data });
    return response.data;
  }
  catch (error) {
    console.error("Add scan failed:", error);
    throw error;
  }
}

export async function bookAppointment(date: Date) {
  try {
    const response = await axiosInstance.post("/users/appointment", { date });
    return response.data;
  }
  catch (error) {
    console.error("Book appointment failed:", error);
    throw error;
  }
}

export async function cancelAppointment(id: string) {
  try {
    const response = await axiosInstance.delete(`/users/appointment/${id}`);
    return response.data;
  }
  catch (error) {
    console.error("Cancel appointments failed:", error);
    throw error;
  }
}

export async function updateAccountType() {
  try {
    const response = await axiosInstance.put(`/users/account-type`);
    return response.data;
  }
  catch (error) {
    console.error("Update account type failed:", error);
    throw error;
  }
}

export async function acceptNotification(id: string) {
  try {
    const response = await axiosInstance.put(`/users/acceptNotification/${id}`);
    return response.data;
  }
  catch (error) {
    console.error("Accept notification failed:", error);
    throw error;
  }
}

export async function rejectNotification(id: string) {
  try {
    const response = await axiosInstance.put(`/users/rejectNotification/${id}`);
    return response.data;
  }
  catch (error) {
    console.error("Reject notification failed:", error);
    throw error;
  }
}
