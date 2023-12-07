type Pagination = {
  limit?: number;
  total?: number;
  offset?: number;
};

type ErrorResponse = {
  message: string;
};

type ResponsePagination<T> = T & {
  pagination: Pagination;
};

type ValueOf<T> = T[keyof T];