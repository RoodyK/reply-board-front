import { inject, singleton } from "tsyringe";
import type HttpRepository from "./HttpRepository";
import PostCreate from "@/entity/post/PostCreate";
import { plainToInstance } from "class-transformer";
import Post from "@/entity/post/Post";
import PostSummary from "@/entity/post/PostSummary";
import Paging from "@/entity/Paging";

@singleton()
export default class PostRepository {
  private readonly httpRepository: HttpRepository

  constructor(@inject("HttpRepository") httpRepository: HttpRepository) {
    this.httpRepository = httpRepository;
  }

  public createPost(request: PostCreate) {
    return this.httpRepository.post({
      path: "/api/v1/posts",
      data: request
    })
  }

  public async getPost(postId: number): Promise<Post> {
    return this.httpRepository.get({
      path: `/api/v1/posts/${postId}`
    })
    .then((response) => {
      return plainToInstance(Post, response.getData());
    })
  }

  public async getPostList(page = 1, searchValue = "") {
    return this.httpRepository.getList({
      path: `/api/v1/posts?page=${page}&searchValue=${searchValue}`
    })
    .then((response) => {
      const paging: Paging<PostSummary> = plainToInstance<Paging<PostSummary>, any>(Paging, response.getData())
      const items: PostSummary[] = plainToInstance<PostSummary, any[]>(PostSummary, response.getData().items);
      paging.setItems(items);
      return paging;
    })
  }

  public async getCategoryByPostList(categoryId: number, page = 1, searchValue = "") {
    return this.httpRepository.getList({
      path: `/api/v1/categories/${categoryId}/posts?page=${page}&searchValue=${searchValue}`
    })
    .then((response) => {
      const paging: Paging<PostSummary> = plainToInstance<Paging<PostSummary>, any>(Paging, response.getData())
      const items: PostSummary[] = plainToInstance<PostSummary, any[]>(PostSummary, response.getData().items);
      paging.setItems(items);
      return paging;
    })
  }

  public removePost(postId) {
    return this.httpRepository.delete({
      path: `/api/v1/posts/${postId}`
    });
  }
}