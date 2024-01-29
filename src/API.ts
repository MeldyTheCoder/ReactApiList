import axios, { AxiosHeaders, AxiosResponse } from "axios";
import { IAPIEndpointsListInterface, IAPIEndpointDetail, HeadersType, URLType, MethodType, DataType } from "./interfaces/IAPIEndpoint";


interface IFunctionData {
    url: URLType,
    method: MethodType,
    headers: HeadersType,
    withCredentials: boolean
}


class Api {
    [x: string]: any;
    readonly baseUrl: URLType
    readonly defaultHeaders: HeadersType
    readonly sleepTime: number
    readonly sleep: CallableFunction
    readonly apiUrls: IAPIEndpointsListInterface

    constructor(requestTimeout=1000, defaultHeaders=null) {
      this.baseUrl = 'https://api.publicapis.org'
      this.defaultHeaders = defaultHeaders || undefined
      this.sleepTime = requestTimeout || 1000
  
      this.sleep = () => new Promise(r => setTimeout(r, this.sleepTime));

      this.apiUrls = {
        serviceIsAlive: {
          url: `${this.baseUrl}/health`, 
          method: 'get', 
          headers: this.defaultHeaders,
          requiresData: null
        },
  
        getEntries: {
          url: `${this.baseUrl}/entries`,
          method: 'get',
          headers: this.defaultHeaders,
          requiresData: null
        },
  
        getRandomEntry: {
          url: `${this.baseUrl}/random`,
          method: 'get',
          headers: this.defaultHeaders,
          requiresData: null
        },
  
        getCategories: {
          url: `${this.baseUrl}/categories`,
          method: 'get',
          headers: this.defaultHeaders,
          requiresData: null
        }
      }
  
      this._createMethods()
    }
  
    _createMethod(endpoint: IAPIEndpointDetail): CallableFunction {
      const endpointHeaders: HeadersType = endpoint.headers
      const defaultHeaders: HeadersType = this.defaultHeaders
      const headers: HeadersType = new AxiosHeaders({...endpointHeaders, ...defaultHeaders})
  
      const functionData: IFunctionData = {
          url: endpoint.url,
          method: endpoint.method,
          headers: headers,
          withCredentials: false
      }
  
      let func: CallableFunction = async (data: DataType = null) => {
        return this.sleep().then(async () => {return await this._requestMethod(endpoint.url, functionData, data)})
      }
  
      return func
    }
    
    async _requestMethod(url: URLType, functionData: IFunctionData, data: DataType = null): Promise<AxiosResponse<any, any>> {
      return axios(url, {...functionData, ...{body: data}})
    }

    _createMethods(): void {
      for (const [name, endpoint] of Object.entries(this.apiUrls)) {
          this[name] = this._createMethod(endpoint)
      }
    }
}

export default Api