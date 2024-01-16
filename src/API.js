import axios from "axios";


class Api {
    constructor(requestTimeout=1000, defaultHeaders=null) {
      this.baseUrl = 'https://api.publicapis.org'
      
      this.defaultHeaders = defaultHeaders || {}
      this.sleepTime = requestTimeout || 1000
  
      this.sleep = () => new Promise(r => setTimeout(r, this.sleepTime));
  
      this.apiUrls = {
        serviceIsAlive: {
          url: `${this.baseUrl}/health`, 
          method: 'get', 
          headers: this.defaultHeaders,
          requiresData: false
        },
  
        getEntries: {
          url: `${this.baseUrl}/entries`,
          method: 'get',
          headers: this.defaultHeaders,
          requiresData: false
        },
  
        getRandomEntry: {
          url: `${this.baseUrl}/random`,
          method: 'get',
          headers: this.defaultHeaders,
          requiresData: false
        },
  
        getCategories: {
          url: `${this.baseUrl}/categories`,
          method: 'get',
          headers: this.defaultHeaders,
          requiresData: false
        }
      }
  
      this._createMethods()
    }
  
    _createMethod(endpoint) {
      let func = null
      const endpointHeaders = endpoint.headers
      const defaultHeaders = this.defaultHeaders
      const requiresData = endpoint.requiresData
      const headers = endpointHeaders ? {...endpointHeaders, ...defaultHeaders} : defaultHeaders
  
      const functionData = {
          method: endpoint.method,
          url: endpoint.url,
          headers: headers,
      }
  
      if (requiresData) {
        func = async (data) => {
          Object.assign(functionData, {data: data})
          return this.sleep().then(() => {return axios(functionData)})
        }
      } else {
        func = async () => {
          return this.sleep().then(() => {return axios(functionData)})
        }
      }
  
      return func
    }
  
    _createMethods() {
      for (const [name, endpoint] of Object.entries(this.apiUrls)) {
          this[name] = this._createMethod(endpoint)
      }
    }
}

export default Api