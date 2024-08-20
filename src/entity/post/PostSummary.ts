import { DateTimeFormatter, LocalDateTime } from "@js-joda/core"
import { Transform } from "class-transformer"

export default class PostSummary {
  public categoryId: number = 0
  public categoryName: string = ""
  public id: number = 0
  public title: string = ""
  public views: number = 0

  // json -> class, class -> json으로 변환할 때 둘 다 동작하므로 toClassOnly: true를 줘야함 toPlainOnly도 있음
  @Transform(({ value }) => LocalDateTime.parse(value).format(DateTimeFormatter.ofPattern("yyyy-MM-dd")), { toClassOnly: true })
  public regDate = ""

  public getShortenTitle(): string {
    if (this.title.length > 10) {
        return `${this.title.substring(0, 10)}...`;
    }

    return this.title;
  }
}