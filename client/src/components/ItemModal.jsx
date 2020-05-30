import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";
// import { v4 as uuid } from "uuid";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      //id: uuid(),  // with mongo db we dont need id
      name: this.state.name,
    };

    //add item via addItem action
    this.props.addItem(newItem);

    //close modal
    this.toggle();
  };
  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "3rem" }}
          onClick={this.toggle}
        >
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Shopping List </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping Item"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "3rem" }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

//with connect
ItemModal.proptype = {
  addItem: PropTypes.func.isRequired,
  item_reducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item_reducer: state.item_reducer,
});
export default connect(mapStateToProps, { addItem })(ItemModal);
