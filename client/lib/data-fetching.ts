import { axiosInstance } from "./axios";
import { enqueueSnackbar } from "notistack";

export async function login(email: string, password: string) {
  try {
    const { data } = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    enqueueSnackbar("Welcome Back!", { variant: "success" });
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export async function register(
  username: string,
  email: string,
  password: string,
  region: string,
  commune: string
) {
  try {
    const { data } = await axiosInstance.post("/auth/register", {
      username,
      email,
      password,
      region,
      commune,
    });
    enqueueSnackbar("Account created successfully!", { variant: "success" });
    return data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}

export const addUser = async (info: any) => {
  try {
    console.log("Adding user:", info);
    const { data } = await axiosInstance.post("/users", info);
    enqueueSnackbar(
      `${
        info.role.charAt(0).toUpperCase() + info.role.slice(1)
      } added successfully!`,
      { variant: "success" }
    );
    return data;
  } catch (error) {
    console.error("Add user failed:", error);
    throw error;
  }
};

export async function deleteUser(id: string, role: string) {
  try {
    const { data } = await axiosInstance.delete(`/users/${id}`);
    enqueueSnackbar(
      `${role.charAt(0).toUpperCase() + role.slice(1)} deleted successfully!`,
      { variant: "success" }
    );
    return data;
  } catch (error) {
    console.error("Delete user failed:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const { data } = await axiosInstance.get("/auth/logout");
    enqueueSnackbar("Logged out successfully!", { variant: "success" });
    return data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
}

export async function check() {
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
}

export async function getUsers() {
  try {
    const { data } = await axiosInstance.get("/users");
    return data;
  } catch (error) {
    console.error("Get users failed:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  try {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  } catch (error) {
    console.error("Get user failed:", error);
    throw error;
  }
}

export async function getDoctors() {
  try {
    const { data } = await axiosInstance.get("/users/doctors");
    return data;
  } catch (error) {
    console.error("Get doctors failed:", error);
    throw error;
  }
}

export async function getDoctor(id: string) {
  try {
    const { data } = await axiosInstance.get(`/users/doctors/${id}`);
    return data;
  } catch (error) {
    console.error("Get doctor failed:", error);
    throw error;
  }
}

export async function addScan(data: any) {
  try {
    const response = await axiosInstance.post("/users/scan", { data });
    enqueueSnackbar("Scan added successfully!", { variant: "success" });
    return response.data;
  } catch (error) {
    console.error("Add scan failed:", error);
    throw error;
  }
}

export async function addResult(id: string, info: any) {
  try {
    console.log("Adding result:", info);
    const response = await axiosInstance.post(`/users/add-result/${id}`, info);
    enqueueSnackbar("File added successfully!", { variant: "success" });
    return response.data;
  } catch (error) {
    console.error("Add result failed:", error);
    throw error;
  }
}

export async function bookAppointment(data: any) {
  try {
    const response = await axiosInstance.post("/users/appointment", data);
    enqueueSnackbar("Appointment booked successfully!", { variant: "success" });
    return response.data;
  } catch (error) {
    console.error("Book appointment failed:", error);
    throw error;
  }
}

export async function modifyAppointment(id: string, data: any) {
  try {
    const response = await axiosInstance.put(`/users/update/${id}`, data);
    enqueueSnackbar("Appointment modified successfully!", {
      variant: "success",
    });
    return response.data;
  } catch (error) {
    console.error("Modify appointment failed:", error);
    throw error;
  }
}

export async function cancelAppointment(id: string) {
  try {
    const response = await axiosInstance.delete(`/users/appointment/${id}`);
    enqueueSnackbar("Appointment canceled successfully!", {
      variant: "success",
    });
    return response.data;
  } catch (error) {
    console.error("Cancel appointments failed:", error);
    throw error;
  }
}

export async function updateAccountType() {
  try {
    const response = await axiosInstance.put(`/users/account-type`);
    enqueueSnackbar("Account type updated send to admin!", {
      variant: "success",
    });
    return response.data;
  } catch (error) {
    console.error("Update account type failed:", error);
    throw error;
  }
}

export async function acceptNotification(id: string) {
  try {
    const response = await axiosInstance.put(`/users/acceptNotification/${id}`);
    enqueueSnackbar("Notification accepted successfully!", {
      variant: "success",
    });
    return response.data;
  } catch (error) {
    console.error("Accept notification failed:", error);
    throw error;
  }
}

export const acceptAccountType = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/users/acceptAccountType/${id}`);
    enqueueSnackbar("Account type accepted successfully!", {
      variant: "success",
    });
    return response.data;
  } catch (error) {
    console.error("Accept account type failed:", error);
    throw error;
  }
};

export async function rejectNotification(id: string) {
  try {
    const response = await axiosInstance.put(`/users/rejectNotification/${id}`);
    enqueueSnackbar("Notification rejected successfully!", {
      variant: "success",
    });
    return response.data;
  } catch (error) {
    console.error("Reject notification failed:", error);
    throw error;
  }
}

export const rejectAccountType = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/users/rejectAccountType/${id}`);
    enqueueSnackbar("Account type rejected successfully!", {
      variant: "success",
    });
    return response.data;
  } catch (error) {
    console.error("Reject account type failed:", error);
    throw error;
  }
};

export const deleteNotification = async (id: string) => {
  try {
    console.log("Deleting notification:", id);
    const response = await axiosInstance.put(`/users/deleteNotification/${id}`);
    enqueueSnackbar("Notification deleted successfully!", {
      variant: "success",
    });
    return response.data;
  } catch (error) {
    console.error("Delete notification failed:", error);
    throw error;
  }
};

export const getAppointmentsCount = async () => {
  try {
    const response = await axiosInstance.get("/users/appointments/count");
    return response.data;
  } catch (error) {
    console.error("Get appointments count failed:", error);
    throw error;
  }
};
