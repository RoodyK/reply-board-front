import type { AxiosResponse } from "axios"

export default class HttpResponse {
  private readonly result: boolean
  private readonly code: number
  private readonly message: string
  private readonly data: any

  constructor(response: AxiosResponse) {
    this.result = response?.data.result ?? true
    this.code = response?.data.code ?? 200
    this.message = response?.data.message ?? "OK"
    this.data = response?.data.data ?? {}
  }

  public getData = () => {
    return this.data;
  }
}