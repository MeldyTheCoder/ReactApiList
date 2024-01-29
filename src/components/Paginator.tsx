import React from "react";
import { Pagination } from "react-bootstrap";
import { ElementsType, ElementsPerPageType, PageNumberType, IPaginatorProps, IPaginatorState } from "../interfaces/IPaginator";


class Paginator extends React.Component<IPaginatorProps, IPaginatorState> {
    elementsPerPage: ElementsPerPageType

    constructor(props: IPaginatorProps) {
        super(props)

        this.elementsPerPage = this.props.elementsPerPage || 10
        this.setPage = this.setPage.bind(this)
    }

    render(): React.ReactElement {
        let firstPage: PageNumberType = this.getFirstPage()
        let lastPage: PageNumberType = this.getLastPage()
        let nextPage: PageNumberType = this.getNextPage()
        let previosPage: PageNumberType = this.getPreviousPage()
        let currentPage: PageNumberType = this.getCurrentPage()

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

    getCurrentPage(): PageNumberType {
        return this.props.currentPage
    }

    getElements(): ElementsType {
        let elements = this.props.elements

        if (!elements) {
            return []
        }

        return elements
    }

    getTotalPages(): PageNumberType {
        let elements = this.getElements()
        return Math.ceil(elements.length / this.elementsPerPage)
    }

    hasPages(): boolean {
        let totalPages = this.getTotalPages()
        return totalPages > 1
    }

    hasNextPage(): boolean {
        let currentPage = this.getCurrentPage()
        let lastPage = this.getLastPage()

        return currentPage < lastPage
    }

    hasLastPage(): boolean {
        let currentPage = this.getCurrentPage()
        let lastPage = this.getLastPage()

        return currentPage < lastPage 
    }

    hasPreviousPage(): boolean {
        let currentPage = this.getCurrentPage()
        let firstPage = this.getFirstPage()

        return currentPage > firstPage
    }

    hasFirstPage(): boolean {
        let totalPages = this.getTotalPages()
        let currentPage = this.getCurrentPage()
        let firstPage = this.getFirstPage()

        return totalPages > 1 && currentPage > firstPage
    }

    getFirstPage(): PageNumberType {
        return 0
    }

    getLastPage(): PageNumberType {
        let totalPages = this.getTotalPages()
        return totalPages - 1
    }

    getNextPage(): PageNumberType {
        let currentPage = this.getCurrentPage()
        return currentPage + 1
    }

    getPreviousPage(): PageNumberType {
        let currentPage = this.getCurrentPage()
        return currentPage - 1
    }

    setPage(page_number: PageNumberType): void {
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