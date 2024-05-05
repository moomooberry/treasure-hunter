export interface RequestResponse<T> {
  code: number;
  message: string;
  data?: T;
}

export type RequestPaginationParameter<T = {}> = {
  pageSize: number;
  pageNumber: number;
} & T;

export interface RequestPaginationResponse<T> extends RequestResponse<T> {
  pagination: {
    totalElement: number;
    pageNumber: number;
  };
}

export type RequestHandler<P = unknown, R = unknown> = (
  parameter: P
) => Promise<R>;
