import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  // state = {
  //   items: [
  //     { id: uuid(), name: "Egg" },
  //     { id: uuid(), name: "Milk" },
  //     { id: uuid(), name: "State" },
  //     { id: uuid(), name: "Orange" },
  //   ],
  // };

  //call getItems
  componentDidMount() {
    this.props.getItems();
  }

  //handle add a item
  handleAddItem = () => {
    //clone the counter in state
    const Name = prompt("Add a name");
    if (Name) {
      const Items = [...this.state.items];
      Items.push({ id: uuid(), name: Name });
      this.setState({ items: Items });
    }
  };

  //handle delete an item
  handeDelete = (item_mem) => {
    const new_items = this.state.items.filter((item) => item.id != item_mem.id);
    this.setState({ items: new_items });
  };

  render() {
    // const { items } = this.state;
    //after using redux  this.props.item_reducer  is reperesent the whole state and items are in   this.props.item_reducer.items (in itemReducer)
    const { items } = this.props.item_reducer;
    return (
      <Container color="dark" style={{ marginBottom: "2rem" }}>
        <Button
          onClick={() => this.handleAddItem()}
          dark
          style={{ marginBottom: "2rem" }}
          color="dark"
        >
          Add Item
        </Button>
        <ListGroupItem>
          <TransitionGroup className="shopping-list">
            {items.map((item_mem) => (
              <CSSTransition key={item_mem.id} timeout="500" classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => this.handeDelete(item_mem)}
                  >
                    &times;
                  </Button>
                  {item_mem.name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroupItem>
      </Container>
    );
  }
}

// export default ShoppingList;
//with connect
ShoppingList.proptype = {
  getItems: PropTypes.func.isRequired,
  item_reducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item_reducer: state.item_reducer,
});
export default connect(mapStateToProps, { getItems })(ShoppingList);
