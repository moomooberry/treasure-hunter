export interface RequestResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface RequestErrorResponse {
  code: number;
  message: string;
  data: undefined;
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

type RequestHandlerCommon<R = unknown, P = unknown> = (
  parameter: P
) => Promise<R>;

type RequestHandlerOnlyResponse<R = unknown> = () => Promise<R>;

export type RequestHandler<R = unknown, P = void> = P extends void
  ? RequestHandlerOnlyResponse<R>
  : RequestHandlerCommon<R, P>;
