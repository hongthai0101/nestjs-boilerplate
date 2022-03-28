export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface IPaginationResponse {
  items: Record<any, any>[];
  total: number;
}
