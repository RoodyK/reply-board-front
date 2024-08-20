import type { HttpConfig } from "@/http/AxiosHttpClient";
import type HttpRepository from "./HttpRepository";
import AxiosHttpClient from "@/http/AxiosHttpClient";
import { inject, singleton } from "tsyringe";

@singleton()
export default class AxiosHttpRepository implements HttpRepository{
  private readonly httpClient: AxiosHttpClient
  
  constructor(@inject(AxiosHttpClient) httpClient: AxiosHttpClient) {
    this.httpClient = httpClient;
  }

  async get(config: HttpConfig): Promise<any> {
    return this.httpClient.request({
      ...config,
      method: "GET"
    })
  }

  async getList(config: HttpConfig): Promise<any> {
    return this.httpClient.request({
      ...config,
      method: "GET"
    })
  }

  async post(config: HttpConfig): Promise<any> {
    return this.httpClient.request({
      ...config,
      method: "POST"
    })
  }

  patch(config: HttpConfig): Promise<any> {
    return this.httpClient.request({
      ...config,
      method: "PATCH"
    })
  }

  delete(config: HttpConfig): Promise<any> {
    return this.httpClient.request({
      ...config,
      method: "DELETE"
    })
  }

}