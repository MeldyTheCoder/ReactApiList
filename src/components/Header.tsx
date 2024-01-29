import React from "react";
import { Navbar, Container } from "react-bootstrap";
import Sticker from "./Sticker";
import {IHeaderProps, IHeaderState} from "../interfaces/IHeader";


class Header extends React.Component<IHeaderProps, IHeaderState> {
    render(): React.ReactElement {
        return (
            <Navbar className="bg-dark mb-5">
                <Container className="text-center">
                    <Navbar.Brand className="d-flex jusitfy-content-center align-items-center text-white">

                    <Sticker src={"/animations/005_woman_dancing.webm"} width={50} height={50}/>
                    <b>PublicAPIs</b>

                    </Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}

export default Header