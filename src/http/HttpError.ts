import type { AxiosError } from "axios"

export default class HttpError {
  private readonly result: boolean
  private readonly code: number
  private readonly message: string
  private readonly validation: any

  constructor(e: AxiosError) {
    this.result = e.response?.data.result ?? false
    this.code = e.response?.data.code ?? 500
    this.message = e.response?.data.message ?? "네트워크 상태가 좋지 않습니다."
    this.validation = e.response?.data.validation ?? {}
  }

  public getMessage() {
    return this.message;
  }
}