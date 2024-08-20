import { inject, singleton } from "tsyringe";
import type HttpRepository from "./HttpRepository";
import { plainToInstance } from "class-transformer";
import Category from "@/entity/category/Category";
import type HttpResponse from "@/http/HttpResponse";

@singleton()
export default class CategoryRepository {
  private readonly httpRepository: HttpRepository

  constructor(@inject("HttpRepository") httpRepository: HttpRepository) {
    this.httpRepository = httpRepository;
  }

  public async getCategoryList() {
    return this.httpRepository.getList({
      path: "/api/v1/categories"
    })
    .then((response: HttpResponse) => {
      return plainToInstance<Category, any[]>(Category, response.getData());
    })
  }
}