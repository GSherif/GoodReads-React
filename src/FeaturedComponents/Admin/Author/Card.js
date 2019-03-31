import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';

import { context } from '../../../App';

import AddEditAuthorForm from './AddEdit';

export default class AuthorAdminCard extends React.Component {
    constructor() {
        super();
        this.state = {
            showEditModal: false,
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }
    handleClose = () => {
        this.setState({ showEditModal: false });
    }
    handleShow = () => {
        this.setState({ showEditModal: true })
    }
    handleDelete = (deleteHandler) => () => {
        debugger;
        deleteHandler(this.props.id);
    }
    render() {
        // console.log(this.props);
        return (
            <context.Consumer>
                {
                    value => (
                        <React.Fragment>
                            <ListGroup.Item as="li" key={this.props.id}>

                                <Row className="no-gutters">
                                    <Col sm={1} className="d-inline"><h4 className="text-truncate">{this.props.id}</h4></Col>
                                    <Col sm={3} className="d-inline"><h4 className="text-truncate">{this.props.photo}</h4></Col>
                                    <Col sm={2} className="d-inline"><h4 className="text-truncate">{this.props["first-name"]}</h4></Col>
                                    <Col sm={2} className="d-inline"><h4 className="text-truncate">{this.props["last-name"]}</h4></Col>
                                    <Col sm={2} className="d-inline"><h4 className="text-truncate">{this.props.birthdate}</h4></Col>
                                    <Col sm={1}><i className="fas fa-edit" onClick={this.handleShow}></i></Col>
                                    <Col sm={1}><i className="fas fa-trash-alt" onClick={this.handleDelete(value.deleteAuthor)}></i></Col>
                                </Row>
                            </ListGroup.Item>
                            <AddEditAuthorForm show={this.state.showEditModal} onHide={this.handleClose} editmode={true} {...this.props} />
                        </React.Fragment>
                    )
                }
            </context.Consumer>
        )
    }
}