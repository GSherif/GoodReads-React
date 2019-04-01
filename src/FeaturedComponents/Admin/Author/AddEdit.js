import { Form, Button, Modal } from 'react-bootstrap';
import React from 'react';

import SimpleSchema from 'simpl-schema';

import uuidv1 from 'uuid/v1';
import { context } from '../../../App';

export default class AddEditAuthorForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.editmode) {
      this.state = {
        'first-name': this.props['first-name'],
        'last-name': this.props['last-name'],
        photo: this.props.photo,
        birthdate: this.props.birthdate,
      };
    }
    else {
      this.state = {
        'first-name': '',
        'last-name': '',
        photo: '',
        birthdate: '',
      };
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = actionHandler => (e) => {
    e.preventDefault();
    const formValidatorCtx = new SimpleSchema({
      'first-name': {
        type: String, required: true, min: 3, max: 50
      },
      'last-name': {
        type: String, required: true, min: 3, max: 50
      },
      photo: { type: String, regEx: SimpleSchema.RegEx.Url }, // has  an issue
      birthdate: String,
    }, { requiredByDefault: false }).newContext();
    // formValidatorCtx.validate(this.state).clean(this.state,{removeEmptyStrings: true});
    formValidatorCtx.validate(this.state);
    if (formValidatorCtx.validationErrors().length === 0) {
      const newAuthor = {
        id: uuidv1(),
        'first-name': this.state['first-name'],
        'last-name': this.state['last-name'],
        photo: this.state.photo,
        birthdate: this.state.birthdate,
        deleted: false,
      };
      if (this.props.editmode) {
        newAuthor.id = this.props.id;
        actionHandler(newAuthor); // edit function
      }
      else {

        actionHandler(newAuthor); // add function
      }
      this.setState({
        photo: '', birthdate: '', 'first-name': '', 'last-name': ''
      });
      this.props.onHide();
    }
    else {
      console.log(formValidatorCtx.validationErrors());
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <context.Consumer>
        {
          value => (
            <Modal show={this.props.show} onHide={this.props.onHide}>
              <Modal.Header closeButton>
                <Modal.Title>{this.props.editmode ? 'Edit Author' : 'Add New Author'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.props.editmode ? this.handleSubmit(value.editAuthor) : this.handleSubmit(value.addAuthor)}>
                  <Form.Group controlId="fName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control placeholder="Enter First Name" name="first-name" value={this.state['first-name']} onChange={this.handleChange} />
                  </Form.Group>

                  <Form.Group controlId="lName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder="Enter Last Name" name="last-name" value={this.state['last-name']} onChange={this.handleChange} />
                  </Form.Group>
                  <Form.Group controlId="photoURL">
                    <Form.Label>Photo URl</Form.Label>
                    <Form.Control placeholder="Enter Photo URL" name="photo" value={this.state.photo} onChange={this.handleChange} />
                  </Form.Group>
                  <Form.Group controlId="birthdate">
                    <Form.Label>Birthdate</Form.Label>
                    <Form.Control placeholder="Enter Birthdate" name="birthdate" value={this.state.birthdate} onChange={this.handleChange} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                <Button variant="primary" type="submit" onClick={this.props.editmode ? this.handleSubmit(value.editAuthor) : this.handleSubmit(value.addAuthor)}>{this.props.editmode ? 'Save Changes' : 'Add'}</Button>
              </Modal.Footer>
            </Modal>
          )
        }
      </context.Consumer>


    );
  }
}
