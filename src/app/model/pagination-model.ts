export class PaginationRequestModel {
  public pageNumber = 1
  public pageSize = 5

  constructor(pageNumber: number = 1, pageSize: number = 5) {
    this.pageNumber = pageNumber
    this.pageSize = pageSize
  }

  reset() {
    this.pageNumber = 1
  }
}
