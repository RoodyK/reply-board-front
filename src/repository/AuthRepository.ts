import type MemberCreate from "@/entity/member/MemberCreate";
import type HttpRepository from "./HttpRepository";
import { inject, singleton } from "tsyringe";

@singleton()
export default class AuthRepository {
  private httpRepository: HttpRepository

  constructor(@inject("HttpRepository") httpRepository: HttpRepository) {
    this.httpRepository = httpRepository;
  }

  public signup(request: MemberCreate) {
    return this.httpRepository.post({
      path: "/api/v1/auth/signup",
      data: request
    })
  }
}