type ElementsType = Array<Object>
type ElementsPerPageType = number
type PageNumberType = number


interface IPaginatorProps {
    elementsPerPage?: ElementsPerPageType
    currentPage: number
    elements: ElementsType
    setPage: (page_number: PageNumberType) => void
}

interface IPaginatorState {

}


export type {ElementsType, ElementsPerPageType, PageNumberType, IPaginatorProps, IPaginatorState}