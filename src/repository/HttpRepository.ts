import type { HttpConfig } from "@/http/AxiosHttpClient";

export default interface HttpRepository {
  
  get(config: HttpConfig): Promise<any>;

  getList(config: HttpConfig): Promise<any>;

  post(config: HttpConfig): Promise<any>;

  patch(config: HttpConfig): Promise<any>;
  
  delete(config: HttpConfig): Promise<any>;
}