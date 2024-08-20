import { DateTimeFormatter, LocalDateTime } from "@js-joda/core"
import { Transform } from "class-transformer"

export default class Post {
  public memberId: number = 0
  public memberName: string = ""
  public categoryId: number = 0
  public categoryName: string = ""
  public id: number = 0
  public title: string = ""
  public content: string = ""
  public views: number = 0

  // json -> class, class -> json으로 변환할 때 둘 다 동작하므로 toClassOnly: true를 줘야함 toPlainOnly도 있음
  @Transform(({ value }) => LocalDateTime.parse(value).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), { toClassOnly: true })
  public regDate = LocalDateTime.now()

  public getShortenTitle() {
    if (this.title.length > 10) {
        return `${this.title.substring(0, 10)}...`;
    }

    return this.title;
  }
}