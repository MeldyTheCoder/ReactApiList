import React from 'react';
import axios from 'axios';
import Entries from '../components/Entries';
import {Container, Row, Col} from 'react-bootstrap';
import LoadingBar from "../components/LoadingBar";


const baseUrl = 'https://api.publicapis.org'
const defaultHeaders = {}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.sleep = ms => new Promise(r => setTimeout(r, ms));

    this.state = {
      entries: [],
      search_query: '',
      isLoading: true
    }

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

  async makeAPIRequest(url, method="get", data=null, headers=null) {
    this.setState({isLoading: true})

    headers = headers ? {defaultHeaders, headers} : defaultHeaders

    const request = this.sleep(1000).then(() => {
      return axios({
        method: method,
        url: url,
        data: data,
        headers: headers
      })
    })

    return request
  }

  loadEntries() {
    const entriesAPIUrl = `${baseUrl}/entries`
    const method = 'get'
    const serviceIsAlive = true

    this.setEntries([])

    if (!serviceIsAlive) {
      this.setState({isLoading: false}) 
      return
    }

    if (this.state.entries && this.state.entries.length > 1) {
        return 
    }

    return this.makeAPIRequest(entriesAPIUrl, method).then(
      (response) => {
        this.setState({isLoading: false})
        this.setEntries(response.data.entries)
      },

      (error) => {
        console.error(error)
      }
    )
  }

  serviceIsAlive() {
    const serviceAliveAPIUrl = `${baseUrl}/health`
    const method = 'get'

    return this.makeAPIRequest(serviceAliveAPIUrl, method).then(
      (response) => {
        return response.data.alive
      },

      (error) => {
        console.error(error)
        return false
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
