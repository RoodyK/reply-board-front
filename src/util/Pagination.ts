export default class Pagination {
  public page: number;
  public size: number;
  public totalCount: number;

  constructor(page: number, size: number, totalCount: number) {
    this.page = page;
    this.size = size;
    this.totalCount = totalCount;
  }

  // 총 페이지 수 계산
  getTotalPage(): number {
    return Math.ceil(this.totalCount / this.size);
  }

  // 현재 시작 페이지 계산
  getStartPage(): number {
    return Math.floor((this.page - 1) / this.size) * this.size + 1;
  }

  // 현재 마지막 페이지 계산
  getEndPage(): number {
    return Math.min(this.getStartPage() + this.size - 1, this.getTotalPage());
  }

  // 현재 시작-마지막 페이지 배열 계산
  getPageArray(): number[] {
    if (this.page == 0) return [];

    const pages: number[] = [];

    for (let i = this.getStartPage(); i <= this.getEndPage(); i++) {
      pages.push(i);
    }
    return pages;
  }

  // 특정 페이지로 이동하는 함수
  goToPage(page: number, searchValue: string, callback: (page: number, searchValue: string) => void) {
    if (page < 1 || page > this.getTotalPage()) return;
    callback(page, searchValue);
  }
}