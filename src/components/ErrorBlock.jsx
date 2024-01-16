import React from "react";
import { Alert, Row } from "react-bootstrap";
import FadeAnimation from "./FadeAnimation";


class ErrorBlock extends React.Component {
    render() {
        const errorText = this.props.errorText || 'Something went wrong'
        const errorTitle = this.props.errorTitle || 'Error occured'

        return (
            <FadeAnimation>
                <Row className="py-5">
                    <Alert className="text-center" variant="warning">
                        <Alert.Heading>
                            {errorTitle}
                        </Alert.Heading>
                        <hr></hr>
                        <p>
                            {errorText}
                        </p>
                    </Alert>
                </Row>
            </FadeAnimation>
        )
    }
}

export default ErrorBlock