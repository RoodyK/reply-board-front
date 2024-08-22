import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from "axios"
import HttpError, { type ErrorData } from "./HttpError"
import HttpResponse from "./HttpResponse"
import { singleton } from "tsyringe"

export type HttpConfig = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  path: string
  data?: any
}

@singleton()
export default class AxiosHttpClient {

  private readonly client: AxiosInstance = axios.create({
    timeout: 3000,
    timeoutErrorMessage: "네트워크 연결이 불안정합니다.",
    headers: {
      "Content-Type": "application/json"
    }
  });

  public async request(config: HttpConfig) {
    return this.client.request({
      method: config.method,
      url: config.path,
      data: config.data
    })
    .then((response: AxiosResponse) => {
      return Promise.resolve(new HttpResponse(response));
    })
    .catch((e: AxiosError<ErrorData>) => {
      return Promise.reject(new HttpError(e));
  });
  }
}