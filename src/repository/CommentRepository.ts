import { inject, singleton } from "tsyringe";
import type HttpRepository from "./HttpRepository";
import type HttpResponse from "@/http/HttpResponse";
import { plainToInstance } from "class-transformer";
import Comment from "@/entity/comment/Comment";
import type CommentCreate from "@/entity/comment/CommentCreate";
import type CommentRemove from "@/entity/comment/CommentRemove";
import type CommentEdit from "@/entity/comment/CommentEdit";

@singleton()
export default class CommentRepository {
  private httpRepository: HttpRepository

  constructor(@inject("HttpRepository") httpRepository: HttpRepository) {
    this.httpRepository = httpRepository;
  }

  public getCommentList(postId: number) {
    return this.httpRepository.getList({
      path: `/api/v1/posts/${postId}/comments`
    })
    .then((response: HttpResponse) => {
      return plainToInstance<Comment, any[]>(Comment, response.getData())
    })
  }

  public addComment(postId: number, request: CommentCreate) {
    return this.httpRepository.post({
      path: `/api/v1/posts/${postId}/comments`,
      data: request
    })
  }

  public addReply(postId: number, commentId: number, request: CommentCreate) {
    return this.httpRepository.post({
      path: `/api/v1/posts/${postId}/comments/${commentId}/replies`,
      data: request
    })
  }

  public editCommnet(postId: number, commentId: number, request: CommentEdit) {
    return this.httpRepository.patch({
      path: `/api/v1/posts/${postId}/comments/${commentId}`,
      data: request
    })
  }

  public removeComment(postId: number, commentId: number, request: CommentRemove) {
    return this.httpRepository.post({
      path: `/api/v1/posts/${postId}/comments/${commentId}/delete`,
      data: request
    })
  }
}