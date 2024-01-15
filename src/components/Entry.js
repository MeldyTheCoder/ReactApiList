import React from "react";
import {Card, CardBody, CardText, Button, Badge, CardHeader, Col} from 'react-bootstrap';
import { FaTrashCan } from "react-icons/fa6";


class Entry extends React.Component {
    constructor(props) {
        super(props)

        this.delete = this.delete.bind(this)
    }

    render() {
        return (
            <div className="p-2">
                <Card>
                    <CardHeader>
                        <Col>
                            <div className="d-flex justify-content-between">
                                {this.props.data.API}

                                <Button variant="outline-danger" onClick={this.delete}>
                                    <FaTrashCan/>
                                </Button>
                            </div>
                        </Col>
                    </CardHeader>

                    <CardBody className="p-3">
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
                    </CardBody>
                </Card>
            </div>
        )
    }

    delete() {
        return this.props.deleteFunc(this.props.data_id)
    }
}

export default Entry