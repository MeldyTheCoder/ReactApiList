import React from "react";
import { Container } from 'react-bootstrap';
import { IFooterProps, IFooterState } from "../interfaces/IFooter";


export default class Footer extends React.Component<IFooterProps, IFooterState> {
    render(): React.ReactElement {
        return (
            <Container>
                <footer className="py-3 border-top">
                    <p className="text-center text-muted">
                        &copy;2024, 
                        <a href="https://github.com/MeldyTheCoder/ReactApiList/" className="link link-secondary ps-1" target="blank">
                            MeldyTheCoder/ReactApiListApp
                        </a>
                    </p>
                </footer>
            </Container>
        )
    }

}