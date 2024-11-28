export interface CommonResponse<T> {
  result: T
  message: string
  statusCode: number
}

export interface ComboBoxi {
  label: any
  value: any
  newLabel?: any
}

export interface Page<T> {
  endRow: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  isFirstPage: boolean
  isLastPage: boolean
  list: T
  navigateFirstPage: number
  navigateLastPage: number
  navigatePages: number
  navigatepageNums: number[]
  nextPage: number
  pageNum: number
  pageSize: number
  pages: number
  prePage: number
  size: number
  startRow: number
  total: number
}
