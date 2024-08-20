import type Login from '@/entity/auth/Login';
import MemberProfile from '@/entity/member/MemberProfile';
import type HttpRepository from '@/repository/HttpRepository';
import { plainToInstance } from 'class-transformer';
import { inject, singleton } from 'tsyringe';

@singleton()
export default class UserRepository {
  private readonly httpRepository: HttpRepository;

  constructor(@inject("HttpRepository") httpRepository: HttpRepository) {
    this.httpRepository = httpRepository;
  }

  public login(request: Login) {
    return this.httpRepository.post({
      path: "/api/v1/auth/login",
      data: request
    })
  }

  public getProfile() {
    return this.httpRepository.get({
      path: `/api/v1/members/profile`
    })
    .then((response => {
      if(Object.keys(response.data).length === 0) {
        return null;
      }

      return plainToInstance(MemberProfile, response.data);
    }))
  }
}