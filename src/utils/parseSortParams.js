import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  const isValid = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isValid) {
    return sortOrder;
  }
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const validValue = [
    '_id',
    'name',
    'price',
    'category',
    'description',
    'createdAt',
    'updatedAt',
  ];
  if (validValue.includes(sortBy)) {
    return sortBy;
  }
  return '_id';
};
export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
