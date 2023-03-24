// 泛型接口,T的类型支持
export interface IResponseData<T = any> {
    code: number;
    message: string;
    data: T;
}