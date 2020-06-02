import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterModal from "./auth/RegisterModal";

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/"> Shopping List</NavbarBrand>
            <NavbarToggler onClick={this.toggle}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/code-in-moon">
                    Github
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://google.com">Search in google</NavLink>
                </NavItem>
                <NavItem>
                  <RegisterModal />
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
