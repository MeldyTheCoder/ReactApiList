import React from 'react';
import Api from '../API';
import Entries from '../components/Entries';
import {Container, Row, Col} from 'react-bootstrap';
import LoadingBar from "../components/LoadingBar";
import Header from '../components/Header';
import { IMainViewState, IMainViewProps, IEntryType, IEntryListType, ResponseType} from '../interfaces/IMainView';
import { AxiosError, AxiosResponse } from 'axios';


const API = new Api()


class Main extends React.Component<IMainViewProps, IMainViewState> {
  constructor(props: any) {
    super(props)

    this.state = {
      entries: [],
      searchQuery: '',
      isLoading: true
    }

    this.loadEntries = this.loadEntries.bind(this)
    this.deleteEntry = this.deleteEntry.bind(this)
    this.setSearchQuery = this.setSearchQuery.bind(this)
  }

  componentDidMount(): void {
    this.loadEntries()
  }

  render(): React.ReactElement {
    let isLoading = this.state.isLoading

    return (
      <>
        <Header />

        <Container>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <input className="form-control" type='text' placeholder='Search...' onChange={this.setSearchQuery}></input>
                </Col>
            </Row>
            
            <LoadingBar show={isLoading} />

            <div className='py-3'>
                <Entries 
                entries={this.state.entries} 
                deleteFunc={this.deleteEntry} 
                searchQuery={this.state.searchQuery}
                />
            </div>
        </Container>
      </>
    )
  }

  async loadEntries(): Promise<void> {
    const serviceIsAlive: boolean = true

    this.setEntries([])

    if (!serviceIsAlive) {
      this.setState({isLoading: false}) 
      return
    }

    if (this.state.entries && this.state.entries.length > 1) {
        return 
    }

    const entryRequest: ResponseType = API.getEntries()

    return entryRequest.then(
      (response: AxiosResponse) => {
        let data = response.data
        this.setState({isLoading: false})
        this.setEntries(data.entries.map(this._mapEntries))
      }
    ).catch(
      (error: AxiosError) => {
        console.log(error)
      }
    )
  }

  _mapEntries(value: IEntryType, index: number): IEntryType {
      value['id'] = index
      return value
  }

  serviceIsAlive(): boolean {
    const serviceIsAliveRequest = API.serviceIsAlive()

    return serviceIsAliveRequest.catch(
      (error: any) => {
        return false
      }
    ).then(
      (response: any) => {
        if (!response) {
          return false
        }

        let data = response.json()
        return data.alive
      }
    )
  }

  setSearchQuery(event: any) {
    let searchQuery = event.target.value 
    this.setSearchQueryText(searchQuery)
  }

  setSearchQueryText(text: string) {
    this.setState({searchQuery: text})
  }

  setEntries(entries: IEntryListType) {
    if (!entries) {
      return
    }

    this.setState({entries: entries})
  }

  deleteEntry(entryId: number) {
    this.setState({entries: this.state.entries.filter((entry) => entryId !== entry.id)})
  }
}

export default Main;
