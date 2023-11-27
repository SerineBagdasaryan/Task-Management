import { IMetaResponse } from '@/common/models';
import { round } from 'lodash';

export function generateMetaResponse(
  offset: number,
  limit: number,
  totalCount: number,
): IMetaResponse {
  const pageCount = Math.ceil(totalCount / limit);
  const currentPage = round(offset / limit + 1);

  return {
    limit: limit,
    total: totalCount,
    offset: offset,
    currentPage: currentPage,
    hasPrev: currentPage > 1 || Boolean(offset),
    hasNext: currentPage < pageCount,
    pageCount: pageCount,
  };
}
