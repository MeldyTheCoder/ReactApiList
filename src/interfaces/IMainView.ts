import React from 'react';
import { IEntryListType, IEntryType } from './IEntries';
import { ResponseType } from './IAPIEndpoint';


interface IMainViewProps extends React.ComponentProps<"div"> {}


interface IMainViewState {
    entries: IEntryListType
    searchQuery: string
    isLoading: boolean
}


export type {
    IMainViewState, 
    IMainViewProps, 
    IEntryListType, 
    IEntryType,
    ResponseType
}