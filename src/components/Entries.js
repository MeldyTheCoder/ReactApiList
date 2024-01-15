import React from "react";
import Entry from './Entry';
import Paginator from './Paginator';
import {Row, Col, Badge} from 'react-bootstrap';
import LoadingBar from "./LoadingBar";

const itemsPerPage = 10

class Entries extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            categoryQuery: '',
            page: 0
        }

        this.setCategoryQuery = this.setCategoryQuery.bind(this)
        this.clearCategoryQuery = this.clearCategoryQuery.bind(this)
        this.setPage = this.setPage.bind(this)
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps['searchQuery']) {
            this.setState({page: 0})
        }
    }

    render() {
        let entries = this.getEntries()
        let paginatedEntries = this.paginateEntries(entries)
        let categories = this.getCategories()
        let hasEntries = entries && entries.length > 0 && paginatedEntries && paginatedEntries.length > 0
        let loading = this.isLoading()
        let page = this.state.page

        return (
                <div className="entriesList">
                    {categories.length > 1 && 
                        <div className="categoryList">
                            <Badge pill className="m-1" key={'empty'} bg={this.state.categoryQuery === '' ? 'secondary': 'primary'} onClick={this.clearCategoryQuery}>All</Badge>

                            {categories.map((category) => (
                                <Badge pill className="m-1" key={category} onClick={this.setCategoryQuery} bg={this.state.categoryQuery === category ? 'secondary': 'primary'}>{category}</Badge>
                            ))}
                            
                            <hr></hr>
                        </div>
                    }

                    {loading && 
                        <LoadingBar show={loading}/>
                    }

                    {hasEntries &&
                        paginatedEntries.map((entry, index) => (
                            <Entry data={entry} key={index} data_id={index} deleteFunc={this.props.deleteFunc}></Entry>
                        ))
                    }

                    

                    {!hasEntries && !loading && 
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <div className="errorDisplay">
                                    <h4 className="text-danger">Nothing found!</h4>
                                </div>
                            </Col>
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

        return entries
    }

    isLoading() {
        return this.props.isLoading || false
    }
}

export default Entries