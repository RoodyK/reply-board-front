export default class Reply {
  public id: number = 0
  public author: string = ""
  public content: string = ""
  public parentId: number = 0
  public replies: any[] = []
}