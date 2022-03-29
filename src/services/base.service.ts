import axios, { AxiosRequestConfig, Method } from "axios";

import { getCookie } from "../helpers";

import config from "~/admin.config";

export const API_URL = config.apiUrl;

class RequestConfig {
  public baseURL: string;
  public headers?: any;
  public method?: Method;
  public url?: string;
  public data?: any;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public setToken(token?: any) {
    if (token) {
      this.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  }

  public get(path: string, config?: AxiosRequestConfig) {
    this.method = "GET";
    this.url = this.baseURL + path;

    return { ...config, ...this };
  }

  public delete(path: string, data?: unknown, config?: AxiosRequestConfig) {
    this.method = "DELETE";
    this.url = this.baseURL + path;
    this.data = data;

    return { ...config, ...this };
  }

  public post(path: string, data?: unknown, config?: AxiosRequestConfig) {
    this.method = "POST";
    this.url = this.baseURL + path;
    this.data = data;

    return { ...config, ...this };
  }

  public put(path: string, data?: unknown, config?: AxiosRequestConfig) {
    this.method = "PUT";
    this.url = this.baseURL + path;
    this.data = data;

    return { ...config, ...this };
  }

  public patch(path: string, data?: unknown, config?: AxiosRequestConfig) {
    this.method = "PATCH";
    this.url = this.baseURL + path;
    this.data = data;

    return { ...config, ...this };
  }
}

class BaseService {
  private getConfig(token: string = getCookie("accessToken")): RequestConfig {
    const requestConfig = new RequestConfig(config.apiUrl);

    if (token) {
      requestConfig.setToken(token);
    }
    return requestConfig;
  }

  async get<Data = any>(path: string, token?: string): Promise<Data> {
    return (await axios(this.getConfig(token).get(path))).data as Data;
  }

  async delete<Data = any>(
    path: string,
    data?: unknown,
    token?: string
  ): Promise<Data> {
    return (await axios(this.getConfig(token).delete(path, data))).data as Data;
  }

  async post<Data = any>(
    path: string,
    data: unknown,
    tokenOrConfig?: string | AxiosRequestConfig
  ): Promise<Data> {
    const token = typeof tokenOrConfig === "string" ? tokenOrConfig : undefined;
    const config =
      typeof tokenOrConfig !== "string" ? tokenOrConfig : undefined;

    return (await axios(this.getConfig(token).post(path, data, config)))
      .data as Data;
  }

  async put<Data = any>(
    path: string,
    data: unknown,
    token?: string
  ): Promise<Data> {
    return (await axios(this.getConfig(token).put(path, data))).data as Data;
  }

  async patch<Data = any>(
    path: string,
    data: unknown,
    token?: string
  ): Promise<Data> {
    return (await axios(this.getConfig(token).patch(path, data))).data as Data;
  }
}

export const api = new BaseService();
