import React from "react"
import { IEntry } from "./IEntry"

type IEntryListType = Array<IEntry>
type IEntryType = IEntry


interface IEntriesProps extends React.ComponentProps<"div"> {
    entries: IEntryListType
    searchQuery: string
    deleteFunc: CallableFunction
}

interface IEntriesState {
    categoryQuery: string
    hasCors: 'yes' | 'no' | null
    hasHTTPS: boolean | null
    page: number
    collapse: boolean
}

export type {
    IEntryType, 
    IEntryListType, 
    IEntriesProps,
    IEntriesState,
}
