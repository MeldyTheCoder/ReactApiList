import { FadeProps } from "react-bootstrap"


interface IFadeAnimationProps extends FadeProps {
    timeout?: number
    children: React.ReactElement
}

interface IFadeAnimationState {
    show: boolean
}

export type {
    IFadeAnimationProps, 
    IFadeAnimationState
}
