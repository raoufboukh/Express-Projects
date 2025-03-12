/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "./axios"

export const login = async (email: string, password: string)=> {
  try {
    const { data } = await axiosInstance.post('/auth/login', { email, password })
    return data
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export const register = async (username: string, email: string, password: string) => {
  try {
    const { data } = await axiosInstance.post('/auth/register', { username, email, password })
    return data
  } catch (error) {
    console.error('Registration failed:', error)
    throw error
  }
}

export const logout = async () => {
  try {
    const { data } = await axiosInstance.get("/auth/logout");
    return data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export const check = async () => {
  try {
    const { data } = await axiosInstance.get("/auth/check");
    return data;
  } catch (error) {
    if ((error as any)?.response?.status === 401) {
      return null;
    }
    console.error("Auth check failed:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users");
    return data;
  } catch (error) {
    console.error("Get users failed:", error);
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  } catch (error) {
    console.error("Get user failed:", error);
    throw error;
  }
};

export const getDoctors = async () => {
  try {
    const { data } = await axiosInstance.get("/users/doctors");
    return data;
  } catch (error) {
    console.error("Get doctors failed:", error);
    throw error;
  }
};

export const getDoctor = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/doctors/${id}`);
    return data;
  } catch (error) {
    console.error("Get doctor failed:", error);
    throw error;
  }
};

export const addScan = async (data: any) => {
  try {
    const response = await axiosInstance.post("/users/scan", data);
    return response.data;
  } catch (error) {
    console.error("Add scan failed:", error);
    throw error;
  }
};

export const getScan = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`users/scan/${id}`);
    return data;
  } catch (error) {
    console.error("Get scan failed:", error);
    throw error;
  }
};

export const bookAppointment = async (date: Date) => {
  try {
    const response = await axiosInstance.post("/users/appointment", date);
    return response.data;
  } catch (error) {
    console.error("Book appointment failed:", error);
    throw error;
  }
};

export const cancelAppointment = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/users/appointment/${id}`);
    return response.data;
  } catch (error) {
    console.error("Cancel appointments failed:", error);
    throw error;
  }
};

export const updateAccountType = async () => {
  try {
    const response = await axiosInstance.put(`/users/account-type`);
    return response.data;
  } catch (error) {
    console.error("Update account type failed:", error);
    throw error;
  }
};

export const notifications = async () => {
  try {
    const { data } = await axiosInstance.get("/users/notifications");
    return data;
  } catch (error) {
    console.error("Notifications failed:", error);
    throw error;
  }
};

export const acceptNotification = async (id: string) => {
  try {
    const response = await axiosInstance.post(
      `/users/acceptNotification/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Accept notification failed:", error);
    throw error;
  }
};

export const rejectNotification = async (id: string) => {
  try {
    const response = await axiosInstance.post(
      `/users/rejectNotification/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Reject notification failed:", error);
    throw error;
  }
};