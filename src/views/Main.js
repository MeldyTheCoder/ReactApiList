import React from 'react';
import axios from 'axios';
import Entries from '../components/Entries';
import {Container, Row, Col} from 'react-bootstrap';
import LoadingBar from "../components/LoadingBar";

var baseUrl = 'https://api.publicapis.org'
var defaultHeaders = {}

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


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      entries: [],
      search_query: '',
      isLoading: true
    }

    this.API = new Api()

    this.loadEntries = this.loadEntries.bind(this)
    this.deleteEntry = this.deleteEntry.bind(this)
    this.setSearchQuery = this.setSearchQuery.bind(this)
  }

  componentDidMount() {
    this.loadEntries()
  }

  render() {
    let isLoading = this.state.isLoading

    return (
        <Container>
            <Row>
                <Col className='d-flex justify-content-center pb-5'>
                    <h1>Entries From Test API:</h1>
                </Col>
            </Row>

            <Row>
                <Col className='d-flex justify-content-center'>
                    <input className="form-control" type='text' placeholder='Search...' onChange={this.setSearchQuery}></input>
                </Col>
            </Row>
            
            <LoadingBar show={isLoading}></LoadingBar>

            <div className='py-3'>
                <Entries 
                entries={this.state.entries} 
                deleteFunc={this.deleteEntry} 
                searchQuery={this.state.search_query}
                />
            </div>
        </Container>
    )
  }

  loadEntries() {
    const serviceIsAlive = true

    this.setEntries([])

    if (!serviceIsAlive) {
      this.setState({isLoading: false}) 
      return
    }

    if (this.state.entries && this.state.entries.length > 1) {
        return 
    }

    const entryRequest = this.API.getEntries()

    return entryRequest.then(
      (response) => {
        this.setState({isLoading: false})
        this.setEntries(response.data.entries)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  serviceIsAlive() {
    const serviceIsAliveRequest = this.API.serviceIsAlive()

    return serviceIsAliveRequest.catch(
      (error) => {
        return false
      }
    ).then(
      (response) => {
        return response && response.data.alive
      }
    )
  }

  setSearchQuery(e) {
    let search_query = e.target.value 
    this.setSearchQueryText(search_query)
  }

  setSearchQueryText(text) {
    this.setState({search_query: text})
  }

  setEntries(entries) {
    if (!entries) {
      return
    }

    this.setState({entries: entries})
  }

  deleteEntry(entry_id) {
    this.setState({entries: this.state.entries.filter((entry, index) => index !== entry_id)})
  }
}

export default App;
