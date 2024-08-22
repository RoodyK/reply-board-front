import type Reply from "./Reply"

export default class Comment {
  public id: number = 0
  public author: string = ""
  public content: string = ""
  public parentId: number = 0
  public replies: Reply[] = []
}