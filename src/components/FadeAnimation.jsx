import React from "react";
import {Fade} from "react-bootstrap";


class FadeAnimation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false
        }
    }

    componentDidMount() {
        this.setShow(true)
    }

    render() {
        const hasToBeShown = this.hasToBeShown()
        const timeout = this.props.timeout || 300

        return (
            <Fade in={hasToBeShown} timeout={timeout}>
                {this.props.children}
            </Fade>
        )
    }

    setShow(boolean=null) {
        if (!boolean) {
            boolean = !this.hasToBeShown()
        }

        return this.setState({show: boolean})
    }

    hasToBeShown() {
        return this.state.show
    }

}

export default FadeAnimation