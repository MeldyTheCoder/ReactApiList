import React from "react"

interface IErrorBlockProps extends React.ComponentProps<"div"> {
    errorTitle: string
    errorText: string
}

interface IErrorBlockState {

}

export type {
    IErrorBlockProps, 
    IErrorBlockState
}