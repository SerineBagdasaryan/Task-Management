import { IMetaResponse } from '@common/models';
import { round } from 'lodash';

export function generateMetaResponse(
  skip: number,
  take: number,
  totalCount: number,
): IMetaResponse {
  const pageCount = Math.ceil(totalCount / take);
  const currentPage = round(skip / take + 1);

  return {
    take,
    total: totalCount,
    skip,
    currentPage,
    hasPrev: currentPage > 1 || Boolean(skip),
    hasNext: currentPage < pageCount,
    pageCount,
  };
}
