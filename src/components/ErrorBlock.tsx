import React from "react";
import { Alert, Row } from "react-bootstrap";
import FadeAnimation from "./FadeAnimation";
import Sticker from "./Sticker";
import {IErrorBlockProps, IErrorBlockState} from '../interfaces/IErrorBlock';


class ErrorBlock extends React.Component<IErrorBlockProps, IErrorBlockState> {
    render(): React.ReactElement {
        const errorText: string = this.props.errorText || 'Something went wrong'
        const errorTitle: string = this.props.errorTitle || 'Error occured'

        return (
            <FadeAnimation>
                <Row className="py-5">
                    <Alert className="text-center" variant="warning">
                        <Alert.Heading>
                            <div className="d-flex justify-content-center align-items-center">
                                <Sticker src={"/animations/012_thinking_face.webm"} width={50} height={50}/>

                                {errorTitle}
                            </div>

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