import React, { Component } from "react";
import Game from "./Game";
import Categories from "./Categories";
import { Route } from 'react-router-dom'
import PropTypes from "prop-types";

export default class GameBox extends Component {
  state = {
    category: 0,
    name: ""
  };

  setCategory = year => this.setState({ category: year });

  componentDidMount() {
    const { name } = this.props;
    this.setState({ name });
  }

  render() {
    const { category, name } = this.state;
    const userName = name.charAt(0).toUpperCase() + name.slice(1)
    return (
      <div className='text-center'>
        <div className='animated bounceInDown faster'>{name === "" ? <h1>GUEST</h1> : <h1>Welcome {userName}</h1>}</div>
        {category !== 0 ? (
          <Game cat={category} />
        ) : (
          <Categories handleCategories={this.setCategory} />
        )}
      </div>
    );
  }
}
GameBox.defaultProps = {
  name: "GUEST"
};

GameBox.propTypes = {
  name: PropTypes.string
};
