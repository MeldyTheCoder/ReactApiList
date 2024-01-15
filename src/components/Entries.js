import React from "react";
import Entry from './Entry';
import Paginator from './Paginator';
import {Row, Col, Badge, InputGroup, Form, Alert} from 'react-bootstrap';

const itemsPerPage = 10

class Entries extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            categoryQuery: '',
            page: 0,
            hasHTTPS: null,
            hasCors: null
        }

        this.setCategoryQuery = this.setCategoryQuery.bind(this)
        this.clearCategoryQuery = this.clearCategoryQuery.bind(this)
        this.setPage = this.setPage.bind(this)
        this.setHttpsQuery = this.setHttpsQuery.bind(this)
        this.setCorsQuery = this.setCorsQuery.bind(this)
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps['searchQuery']) {
            this.setState({page: 0})
        }
    }

    render() {
        let allEntries = this.props.entries
        let entries = this.getEntries()
        let paginatedEntries = this.paginateEntries(entries)
        let categories = this.getCategories()
        let isNotFound = !(entries && entries.length > 0 && paginatedEntries && paginatedEntries.length > 0)
        let hasEntries = allEntries && allEntries.length > 0
        let page = this.state.page

        return (
                <div className="entriesList">
                    {categories.length > 1 && 
                        <>
                            <div className="categoryList">
                                <Badge pill className="m-1" key={'empty'} bg={this.state.categoryQuery === '' ? 'secondary': 'primary'} onClick={this.clearCategoryQuery}>All</Badge>

                                {categories.map((category) => (
                                    <Badge pill className="m-1" key={category} onClick={this.setCategoryQuery} bg={this.state.categoryQuery === category ? 'secondary': 'primary'}>{category}</Badge>
                                ))}
                                
                                <hr></hr>
                            </div>

                            <Row>
                                <Col sm={6}>
                                    <div className="py-2 m-2">
                                        <InputGroup>
                                            <InputGroup.Text color="warning">HTTPS</InputGroup.Text>
                                            <Form.Select onChange={this.setHttpsQuery}>
                                                <option value="">Any</option>
                                                <option value={true}>True</option>
                                                <option value={false}>False</option>
                                            </Form.Select>
                                        </InputGroup>
                                     </div>
                                
                                </Col>

                                <Col sm={6}>
                                    <div className="py-2 m-2">
                                        <InputGroup>
                                            <InputGroup.Text color="warning">Cors</InputGroup.Text>
                                            <Form.Select onChange={this.setCorsQuery}>
                                                <option value="">Any</option>
                                                <option value={true}>True</option>
                                                <option value={false}>False</option>
                                            </Form.Select>
                                        </InputGroup>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    }

                    {!isNotFound &&
                        <>
                            {paginatedEntries.map((entry, index) => (
                                <Entry data={entry} key={index} data_id={index} deleteFunc={this.props.deleteFunc}></Entry>
                            ))}
                        </>
                    }

                    {isNotFound && hasEntries && 
                        <Row className="py-5">
                            <Alert className="text-center" variant="warning">
                                <Alert.Heading>
                                    {"Oops, 404 :("}
                                </Alert.Heading>
                                <hr></hr>
                                <p>
                                    Nothing was found for your request
                                </p>
                            </Alert>
                        </Row>
                    }

                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Paginator elements={entries} currentPage={page} setPage={this.setPage}/>
                        </Col>
                    </Row>
                </div>
            )
    }

    setPage(page_number) {
        this.setState({page: page_number})        
    }

    clearCategoryQuery() {
        this.setState({categoryQuery: '', page: 0})
    }

    globalIndexOfEntry(entry) {
        return this.props.entries.indexOf(entry)
    }

    setCategoryQuery(e) {
        let categoryName = e.target.innerText
        this.setState({categoryQuery: categoryName, page: 0})
    }

    setHttpsQuery(event) {
        let hasHTTPS = event.target.value

        if (hasHTTPS === '') {
            hasHTTPS = null
        } else {
            hasHTTPS = hasHTTPS === 'true' ? true : false
        }
        
        this.setState({hasHTTPS: hasHTTPS})
    }

    setCorsQuery(event) {
        let hasCors = event.target.value 

        if (hasCors === '') {
            hasCors = null
        } else {
            hasCors = hasCors === 'true' ? 'yes' : 'no'
        }

        this.setState({hasCors: hasCors})
    }

    getCategories() {
        let entries = this.props.entries
        let categoriesArray = entries.map((entry) => entry.Category)
        let categoriesSet = new Set(categoriesArray)
        return [...categoriesSet]
    }

    paginateEntries(entries) {
        if (!entries) {
            return []
        }
        
        let page = this.state.page
        let paginatedEntries = entries.slice(page*itemsPerPage, (page+1)*itemsPerPage)
        return paginatedEntries
    }

    getEntries() {
        let entries = this.props.entries
        let searchQuery = this.props.searchQuery
        let categoryQuery = this.state.categoryQuery
        let hasHTTPS = this.state.hasHTTPS
        let hasCors = this.state.hasCors

        if (!entries || entries.length < 1) {
            return []
        }

        if (searchQuery && searchQuery !== '') {
            entries = entries.filter((entry) => (
                entry.API.includes(searchQuery) || 
                entry.Category.includes(searchQuery)
            ))
        }

        if (categoryQuery && categoryQuery !== '') {
            entries = entries.filter((entry) => (
                entry.Category === categoryQuery
            ))
        }

        if (hasHTTPS !== null) {
            entries = entries.filter((entry) => (
                entry.HTTPS === hasHTTPS
            ))
        }

        if (hasCors !== null) {
            entries = entries.filter((entry) => (
                entry.Cors === hasCors
            ))
        }

        return entries
    }
}

export default Entries