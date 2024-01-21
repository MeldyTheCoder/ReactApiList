import React from "react";
import {Card, CardBody, CardText, Button, Badge, CardHeader, Col, Placeholder} from 'react-bootstrap';
import { FaTrashCan } from "react-icons/fa6";
import FadeAnimation from "./FadeAnimation";


class Entry extends React.Component {
    constructor(props) {
        super(props)

        this.sleep = (ms) => new Promise(r => setTimeout(r, ms));

        this.delete = this.delete.bind(this)
        this.animation = "glow"

        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        if (this.props.isLoading) {
            return
        }

        this.sleep(1000).then(
            () => this.setState({isLoading: false})
        )
    }

    componentWillUnmount() {
        this.setState({isLoading: true})
    }

    render() {
        const loading = this.props.isLoading || this.state.isLoading || false

        let cardBody = (
            <>
                <CardText>
                    <Badge pill className="m-1">{this.props.data.Category}</Badge>
                    {this.props.data.HTTPS && <Badge pill bg="info" className="m-1">HTTPS</Badge>}
                    {this.props.data.Cors === 'yes' && <Badge pill bg="warning">Cors</Badge>}
                </CardText>

                <CardText>
                    {this.props.data.Description}
                </CardText>

                <CardText>
                    <a target="blank" href={this.props.data.Link} className="link-offset-2 link-underline link-underline-opacity-50">{this.props.data.Link}</a>
                </CardText>
            </>
        )
        
        let deleteButton = (
            <Button variant="outline-danger" onClick={this.delete}>
                <FaTrashCan/>
            </Button>
        )

        let cardTitle = (this.props.data.API)

        if (loading) {
            cardBody = (
                <>
                    <Placeholder as={CardText} animation={this.animation}>
                        <Placeholder bg="primary" xs={1} className="m-1 rounded"/>
                        <Placeholder bg="info" xs={1} className="m-1 rounded"/>
                        <Placeholder bg="warning" xs={1}  className="m-1 rounded"/>
                    </Placeholder>

                    <Placeholder as={CardText} animation={this.animation}>
                        <Placeholder xs={12} className='rounded'/>
                    </Placeholder>

                    <Placeholder as={CardText} animation={this.animation}>
                        <Placeholder xs={12} className='rounded'/>
                    </Placeholder>
                </>
            )

            deleteButton = (
                <Placeholder.Button variant="outline-danger">
                    <FaTrashCan/>
                </Placeholder.Button>
            )

            cardTitle = (
                <Placeholder animation={this.animation}>
                    <Placeholder xs={8} className='rounded h-25'/>
                </Placeholder>
            )
        }

        return (
            <div className="p-2">   
                <FadeAnimation timeout={1000}>
                    <Card>
                        <CardHeader>
                            <Col className="d-flex justify-content-between">
                                {cardTitle}
                                {deleteButton}
                            </Col>
                        </CardHeader>

                        <CardBody className="p-3">
                            {cardBody}
                        </CardBody>
                    </Card>
                </FadeAnimation>    
            </div>
        )
    }

    delete() {
        return this.props.deleteFunc(this.props.data.id)
    }
}

export default Entry