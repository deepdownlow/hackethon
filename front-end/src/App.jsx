import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import GameBox from "./components/GameBox";

class App extends Component {
  state = {
    name: ""
  };
  updateName = name => {
    this.setState({ name }, () => (localStorage.name = name));
  };
  componentWillMount() {
    this.setState({ name: localStorage.name });
    
  }
  render() {
    const { name } = this.state;
    return (
      <div className='container'>
        <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <UserLogin {...props} handleOnChange={this.updateName} />
          )}
          />
    
        <Route
          exact
          path="/game"
          render={props => <GameBox {...props} name={name} />}
        />
      </Switch>
      </div>
    );
  }
}

export default App;
