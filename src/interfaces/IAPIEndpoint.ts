import { InterfaceType } from "typescript";
import { AxiosHeaders, AxiosResponse } from "axios";


type DataType = Map<string, string | number | {}> | null
type URLType = string
type HeadersType = AxiosHeaders | undefined
type RequiresDataType = InterfaceType | DataType | null
type MethodType = 'get' | 'post' | 'options' | 'delete' | 'put'
type ResponseType = Promise<AxiosResponse<any, any>>

interface IAPIEndpointDetail {
    url: URLType
    method: MethodType
    headers: HeadersType
    requiresData: RequiresDataType
}

interface IAPIEndpointsListInterface {
    [key: string]: IAPIEndpointDetail
}

interface IFunctionData {
    url: URLType,
    method: MethodType,
    headers: HeadersType,
    withCredentials: boolean
}

export type {
    DataType, 
    URLType, 
    HeadersType, 
    RequiresDataType, 
    MethodType, 
    IAPIEndpointDetail, 
    IAPIEndpointsListInterface, 
    ResponseType,
    IFunctionData
}
