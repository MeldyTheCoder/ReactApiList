import { PlaceholderAnimation } from "react-bootstrap/esm/usePlaceholder"

type AnimationType = PlaceholderAnimation | undefined

interface IEntry {
    id?: number
    HTTPS: boolean
    Cors: 'yes' | 'no' | 'unknown'
    Description: string
    Category: string
    Link: string
    API: string
    Auth: string
}

interface IEntryProps extends React.ComponentProps<"div"> {
    data: IEntry
    isLoading?: boolean
    deleteFunc: CallableFunction
}


interface IEntryState {
    isLoading: boolean
}


export type {
    IEntry, 
    IEntryProps, 
    IEntryState, 
    AnimationType
}

