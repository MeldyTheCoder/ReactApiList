import React from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import { ScaleLoader } from 'react-spinners';
import { ILoadingBarProps, ILoadingBarState } from "../interfaces/ILoadingBar";
// import '../css/loadingBar.css';


class LoadingBar extends React.Component<ILoadingBarProps, ILoadingBarState> {
    render(): React.ReactElement {
        return (
            <Modal
                size="sm"
                show={this.props.show}
                className="loadingBar"
                centered
            >
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <ScaleLoader color="#0D6EFD" loading={this.props.show}/>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}

export default LoadingBar