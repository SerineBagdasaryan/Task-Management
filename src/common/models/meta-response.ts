export interface IMetaResponse {
  limit: number;
  total: number;
  offset: number;
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
  pageCount: number;
}
