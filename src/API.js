import axios from "axios";


class Api {
    constructor(requestTimeout=1000, defaultHeaders=null) {
      this.baseUrl = 'https://api.publicapis.org'
      
      this.defaultHeaders = defaultHeaders || null

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
      const headers = endpointHeaders && endpointHeaders !== defaultHeaders ? {...endpointHeaders, ...defaultHeaders} : defaultHeaders
  
      const functionData = {
          url: endpoint.url,
          method: endpoint.method,
          headers: headers,
          withCredentials: false
      }
  
      func = async (data=null) => {
        return this.sleep().then(async () => {return await this._requestMethod(endpoint.url, functionData, data)})
      }
  
      return func
    }
    
    async _requestMethod(url, functionData, data=null) {
      if (data) {
        Object.assign(functionData, {body: JSON.stringify(data)})
      }

      return axios(url, functionData)
    }

    _createMethods() {
      for (const [name, endpoint] of Object.entries(this.apiUrls)) {
          this[name] = this._createMethod(endpoint)
      }
    }
}

export default Api