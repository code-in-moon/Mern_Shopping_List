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
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";

class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  };

  //here we can define to access to actions and state of a reducer by props in this component
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidUpdate(prevprops, nextprops) {
    const { error } = this.props;
    if (error !== prevprops.error) {
      //check for register error wich we give it ad id = REGISTER_FAIL in authactions>>register()
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    //get the info from state
    const { name, email, password } = this.state;

    //create a user object
    const newUser = {
      name,
      email,
      password,
    };

    //attempt to register by call register from authactions
    this.props.register(newUser);
  };
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Name"
                  onChange={this.onChange}
                  className="mb-3"
                />

                <Label for="email">email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email"
                  onChange={this.onChange}
                  className="mb-3"
                />

                <Label for="password">password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Ypur Password"
                  onChange={this.onChange}
                  className="mb-3"
                />
                <Button color="dark" style={{ marginTop: "3rem" }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

//here we can access the state of reducers and put them in a variable to use in this component (by this.props.error  or this.props.isAuthenticated )auth and error are reducer wfich we define in index reducer
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

//as the second argu of connect we pass the actions of reducer wich we want use in this component and we should define it in propTypes in order to use it by this,prop.*
export default connect(mapStateToProps, { register })(RegisterModal);
