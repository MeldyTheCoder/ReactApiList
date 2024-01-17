import React from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from "../logo.svg";


class Header extends React.Component {
    render() {
        return (
            <Navbar className="bg-body-secondary mb-5">
                <Container className="text-center">
                    <Navbar.Brand>
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                        React API List App
                    </Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}

export default Header