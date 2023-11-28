export interface IMetaResponse {
  skip: number;
  total: number;
  take: number;
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
  pageCount: number;
}
