import React from 'react';
import Api from '../API';
import Entries from '../components/Entries';
import {Container, Row, Col} from 'react-bootstrap';
import LoadingBar from "../components/LoadingBar";
import Header from '../components/Header';


const API = new Api()


class Main extends React.Component {
  constructor(props) {
    super(props)

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
      <>
        <Header/>

        <Container>
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
      </>
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

    const entryRequest = API.getEntries()

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
    const serviceIsAliveRequest = API.serviceIsAlive()

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

export default Main;
