import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./components/AppNavbar";
import AppNavbar from "./components/AppNavbar";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <AppNavbar />
      </div>
    );
  }
}

export default App;
