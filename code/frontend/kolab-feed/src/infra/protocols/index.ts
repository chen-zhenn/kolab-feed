export interface IHttpParams<T> {
    baseURL: string | any;
    url?: string;
    queryParams?: T;
}

export interface IHttpResponse<T> {
    status: number;
    statusText: string;
    message: string;
    data?: T;
}

export interface IHttpClient<T, Q> {
    get: (params: IHttpParams<Q>) => Promise<IHttpResponse<T>>;
}

export enum HttpStatusCode {
    success = 200,
    created = 201,
    badrequest = 400,
    unauthorized = 401,
    notfound = 404,
    servererror = 500,
}