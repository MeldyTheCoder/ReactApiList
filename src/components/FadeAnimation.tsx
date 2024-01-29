import React from "react";
import {Fade} from "react-bootstrap";
import {IFadeAnimationProps, IFadeAnimationState} from '../interfaces/IFadeAnimation'


class FadeAnimation extends React.Component<IFadeAnimationProps, IFadeAnimationState> {
    constructor(props: IFadeAnimationProps) {
        super(props)

        this.state = {
            show: false
        }
    }

    componentDidMount(): void {
        this.setShow(true)
    }

    render(): React.ReactElement {
        const hasToBeShown = this.hasToBeShown()
        const timeout = this.props.timeout || 300

        return (
            <Fade in={hasToBeShown} timeout={timeout}>
                {this.props.children}
            </Fade>
        )
    }

    setShow(boolean: boolean | null = null): void {
        if (!boolean) {
            boolean = !this.hasToBeShown()
        }

        return this.setState({show: boolean})
    }

    hasToBeShown(): boolean {
        return this.state.show
    }

}

export default FadeAnimation