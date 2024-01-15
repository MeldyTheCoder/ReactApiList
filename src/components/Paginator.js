import React from "react";
import { Pagination } from "react-bootstrap";

class Paginator extends React.Component {
    constructor(props) {
        super(props)

        this.elementsPerPage = this.props.elementsPerPage || 10
        this.setPage = this.setPage.bind(this)
    }

    render() {
        let firstPage = this.getFirstPage()
        let lastPage = this.getLastPage()
        let nextPage = this.getNextPage()
        let previosPage = this.getPreviousPage()
        let currentPage = this.getCurrentPage()

        return (
            <div className="pagination">
                <Pagination>
                    {this.hasFirstPage() && <Pagination.First onClick={() => this.setPage(firstPage)}>{firstPage + 1}</Pagination.First>}
                    {this.hasPreviousPage() && <Pagination.Prev onClick={() => this.setPage(previosPage)}>{"<<"}</Pagination.Prev>}
                    {this.hasPages() && <Pagination.Ellipsis active>{currentPage + 1}</Pagination.Ellipsis>}
                    {this.hasNextPage() && <Pagination.Next onClick={() => this.setPage(nextPage)}>{">>"}</Pagination.Next>}
                    {this.hasLastPage() && <Pagination.Last onClick={() => this.setPage(lastPage)}>{lastPage + 1}</Pagination.Last>}
                </Pagination>
            </div>
        )
    }

    getCurrentPage() {
        return this.props.currentPage
    }

    getElements() {
        let elements = this.props.elements

        if (!elements) {
            return []
        }

        return elements
    }

    getTotalPages() {
        let elements = this.getElements()
        return Math.ceil(elements.length / this.elementsPerPage)
    }

    hasPages() {
        let totalPages = this.getTotalPages()
        return totalPages > 1
    }

    hasNextPage() {
        let currentPage = this.getCurrentPage()
        let lastPage = this.getLastPage()

        return currentPage < lastPage
    }

    hasLastPage() {
        let currentPage = this.getCurrentPage()
        let lastPage = this.getLastPage()

        return currentPage < lastPage 
    }

    hasPreviousPage() {
        let currentPage = this.getCurrentPage()
        let firstPage = this.getFirstPage()

        return currentPage > firstPage
    }

    hasFirstPage() {
        let totalPages = this.getTotalPages()
        let currentPage = this.getCurrentPage()
        let firstPage = this.getFirstPage()

        return totalPages > 1 && currentPage > firstPage
    }

    getFirstPage() {
        return 0
    }

    getLastPage() {
        let totalPages = this.getTotalPages()
        return totalPages - 1
    }

    getNextPage() {
        let currentPage = this.getCurrentPage()
        return currentPage + 1
    }

    getPreviousPage() {
        let currentPage = this.getCurrentPage()
        return currentPage - 1
    }

    setPage(page_number) {
        let lastPage = this.getLastPage()
        let firstPage = this.getFirstPage()

        if (page_number < firstPage) {
            page_number = firstPage
        }

        if (page_number > lastPage) {
            page_number = lastPage
        }

        return this.props.setPage(page_number)
    }
}

export default Paginator