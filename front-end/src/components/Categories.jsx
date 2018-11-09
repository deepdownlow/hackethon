import React, { Component } from "react";
import PropTypes from "prop-types";

class Categories extends Component {
  state = {
    animation: false,
    color:'dark'
  }
  onClick = e => {
    const { handleCategories } = this.props
    this.setState({animation: true, color:'light'})
    let year = Number(e.target.value);
    setTimeout(() => handleCategories(year), 500);
  };
  render() {
    const { animation, color } = this.state
    return (
      <div className={animation ? 'animated bounceOutDown faster' : null}>
        <div className="btn-group" role="group" aria-label="...">
          <button
            className={`btn btn-${color} mr-1 animated bounceInUp delay-2s faster`}
            onClick={this.onClick}
            value="1960"
          >
            Adult
          </button>
          <button
            className={`btn btn-${color} mr-1 animated bounceInUp delay-1s faster`}
            onClick={this.onClick}
            value="1990"
          >
            Noob
          </button>
          <button
            className={`btn btn-${color} mr-1 animated bounceInUp faster`}
            onClick={this.onClick}
            value="2018"
          >
            Loser
          </button>
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  handleCategories: PropTypes.func
};
export default Categories;
