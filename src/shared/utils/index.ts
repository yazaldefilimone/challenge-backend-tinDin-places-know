type SerializePaginationParams = {
  page: number;
  limit: number;
  defaultLimit?: number;
};

export function serializePagination({ page, limit, defaultLimit = 50 }: SerializePaginationParams): {
  page: number;
  limit: number;
} {
  const pageValue = page > 0 ? page : 1;
  const limitValue = limit > 0 ? limit : defaultLimit;

  let li = limitValue > 50 ? 50 : limitValue;

  const pageCalc =(pageValue - 1) * li;
  const limitCalc = pageValue * li;

  return {
    page:pageCalc,
    limit:limitCalc 
  };
}
