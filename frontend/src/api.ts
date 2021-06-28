import axios from "axios";
import useAxios, { Options } from "axios-hooks";
import { FieldError } from "./types/errors";

const axiosApi = axios.create({
  baseURL: "/api/",
});

interface UseApiArgs {
  method: "GET" | "POST" | "DELETE";
  url: string;
  data?: any;
  options?: Options;
}

interface LoginArgs {
  usernameOrEmail: string;
  password: string;
}

interface LoginRes {
  id: string;
  errors: FieldError[];
}

interface IdRes {
  id: string;
}

interface RegisterArgs {
  username: string;
  email: string;
  password: string;
}

const useApi = <TRes, TErr = any>({
  method,
  url,
  data,
  options,
}: UseApiArgs) => {
  return useAxios<TRes, TErr>({ baseURL: "/api/", method, url, data }, options);
};

/* API ROUTES */

export const useGetHelloWorld = () => {
  return useApi<string, string>({ method: "GET", url: "/" });
};

export const useMe = () => {
  return useApi<IdRes | null>({ method: "GET", url: "/me" });
};

export const login = (args: LoginArgs) => {
  return axiosApi.post<LoginRes>("/login", args);
};

export const logout = () => {
  return axiosApi.post<boolean>("/logout");
};

export const register = (args: RegisterArgs) => {
  return axiosApi.post<LoginRes>("/register", args);
};