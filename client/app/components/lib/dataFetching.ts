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
    const { data } = await axiosInstance.post<{ message: string }>("/auth/logout");
    return data;
  } catch (error) {
    console.error('Logout failed:', error)
    throw error
  }
};

export const check = async () => {
  try {
    const { data } = await axiosInstance.get("/auth/check");
    // S'assurer que nous renvoyons l'objet utilisateur complet ou au moins quelques données
    return data;
  } catch (error) {
    // Pour le check d'auth, une 401 est attendue quand l'utilisateur n'est pas connecté
    if ((error as any)?.response?.status === 401) {
      // Retourner null explicitement pour indiquer une absence d'authentification
      return null;
    }
    
    console.error('Auth check failed:', error);
    throw error;
  }
};