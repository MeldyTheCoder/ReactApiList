import React from "react";
import Entry from './Entry';
import ErrorBlock from "./ErrorBlock";
import Paginator from './Paginator';
import FadeAnimation from "./FadeAnimation";
import {Row, Col, Badge, InputGroup, Form} from 'react-bootstrap';

const itemsPerPage = 10

class Entries extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            categoryQuery: '',
            page: 0,
            hasHTTPS: null,
            hasCors: null,
            collapse: false
        }

        this.setCategoryQuery = this.setCategoryQuery.bind(this)
        this.clearCategoryQuery = this.clearCategoryQuery.bind(this)
        this.setPage = this.setPage.bind(this)
        this.setHttpsQuery = this.setHttpsQuery.bind(this)
        this.setCorsQuery = this.setCorsQuery.bind(this)
    }
    
    render() {
        const allEntries = this.props.entries
        const entries = this.getEntries()
        const paginatedEntries = this.paginateEntries(entries)
        const categories = this.getCategories()
        const isNotFound = !(entries && entries.length > 0 && paginatedEntries && paginatedEntries.length > 0)
        const hasEntries = allEntries && allEntries.length > 0
        const page = this.state.page

        return (
                <div className="entriesList">
                    {categories.length > 1 && 
                        <FadeAnimation>
                            <div className="categoriesList">
                                <Badge pill className="m-1" key={'empty'} bg={this.state.categoryQuery === '' ? 'secondary': 'primary'} onClick={this.clearCategoryQuery}>All</Badge>

                                {categories.map((category) => (
                                    <Badge pill className="m-1" key={category} onClick={this.setCategoryQuery} bg={this.state.categoryQuery === category ? 'secondary': 'primary'}>{category}</Badge>
                                ))}
                                
                                <hr></hr>

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
                            </div>
                        </FadeAnimation>
                    }

                    {!isNotFound &&
                        <>
                            {paginatedEntries.map((entry) => (
                                <Entry data={entry} key={entry.id} deleteFunc={this.props.deleteFunc}></Entry>
                            ))}
                        </>
                    }

                    {isNotFound && hasEntries && 
                        <ErrorBlock errorTitle="Ooops 404 :(" errorText="Nothing found for your request."/>
                    }

                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Paginator elements={entries} currentPage={page} setPage={this.setPage} elementsPerPage={itemsPerPage}/>
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