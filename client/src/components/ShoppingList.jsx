import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  // export default ShoppingList;
  //with connect
  static propType = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    item_reducer: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };



  //call getItems
  componentDidMount() {
    this.props.getItems();
  };

  //handle delete an item
  handeDelete = (_id) => {
    this.props.deleteItem(_id);
  };

  render() {

    const { items } = this.props.item_reducer;
    return (
      <Container color="dark" style={{ marginBottom: "2rem" }}>
        <ListGroupItem>
          <TransitionGroup className="shopping-list">
            {items.map((item_mem) => (
              <CSSTransition key={item_mem._id} timeout="500" classNames="fade">
                <ListGroup>
                  <ListGroupItem>
                    {/* another way of passing argument
                      onClick={this.handeDelete.bind(this ,item_mem)} */}

                    {this.props.isAuthenticated ? (
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={() => this.handeDelete(item_mem._id)} >
                        &times;
                      </Button>) : null}
                    {item_mem.name}
                  </ListGroupItem>
                </ListGroup>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroupItem>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  item_reducer: state.item_reducer,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
