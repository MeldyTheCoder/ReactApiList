import React from 'react';
import axios from 'axios';
import Entries from '../components/Entries';
import {Container, Row, Col} from 'react-bootstrap';


const baseUrl = 'https://api.publicapis.org/entries'


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

    this.loadEntries()
  }

  render() {
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

            <div className='py-3'>
                <Entries 
                entries={this.state.entries} 
                deleteFunc={this.deleteEntry} 
                searchQuery={this.state.search_query} 
                isLoading={this.state.isLoading} 
                />
            </div>
        </Container>
    )
  }

  loadEntries() {
    if (!this.state.entries || this.state.entries.length < 1) {
        this.sleep(2000).then(() => {
            return axios.get(baseUrl).then(
                (result) => {
                    this.setState({isLoading: false})
                    this.setEntries(result.data.entries)
                },

                (error) => {
                    console.log(error)
                }
            )}
        ) 
    }
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
