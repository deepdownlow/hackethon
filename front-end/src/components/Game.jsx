import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Game extends Component {
  state = {
    currentMovie: "",
    guess: "",
    tryNum: 0,
    counter: 5,
    rightNum: 0,
    movieArr: []
  };

  onClick = e => {
    const { movieArr, currentMovie, guess, rightNum, tryNum } = this.state;
    if (e.target.value !== "disabled") {
      let randomNum = Math.floor(Math.random() * 19);
      let theMovie = movieArr[randomNum];
      this.setState({ currentMovie: theMovie, guess: "" });
      if (guess.toLowerCase() === currentMovie.toLowerCase()) {
        this.setState({ rightNum: rightNum + 1, tryNum: tryNum + 1 });
      } else {
        this.setState({ tryNum: tryNum + 1 });
      }
    }
  };

  countDown = () => {
    const { counter } = this.state;
    let count = 5;
    setInterval(() => count--, 1000);
  };

  runTimer = () => this.countDown();

  onChange = e => {
    this.setState({ guess: e.target.value });
  };

  componentDidMount() {
    const { cat } = this.props;
    this.setState({ difficulty: cat }, () => {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=2a4b3099dad677e428df3e4d028a6e60&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=${cat}`
        )
        .then(({ data }) => {
          const movieTitle = data.results.map(movie => movie.title);
          this.setState({ movieArr: movieTitle, currentMovie: movieTitle[0] });
        })
        .catch(err => console.log(err));
    });
  }
  render() {
    const { rightNum, guess, currentMovie, tryNum, counter } = this.state;
    return (
      <React.Fragment>
        {tryNum < 10 ? (
          <div>
            {/* <iframe width="560"  height="315" src={currentMovie} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
            <h3>{currentMovie}</h3>
            <h3>{tryNum}/10</h3>
            <h3>timer: {counter}</h3>
            <h3>{guess}</h3>
            <h3>right answer: {rightNum}</h3>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                className="form-control"
                onChange={this.onChange}
                onClick={this.runTimer}
                value={guess}
              />
            </form>
            <div className="btn-group mt-3" role="group" aria-label="...">
              <button
                className={
                  guess === ""
                    ? "btn btn-dark mr-1 disabled"
                    : "btn btn-dark mr-1"
                }
                onClick={this.onClick}
                value={guess === "" ? "disabled" : false}
              >
                Submit
              </button>
              <button className="btn btn-dark mr-1" onClick={this.onClick}>
                Skip
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3>You have answered {rightNum} out of 10</h3>
            <button className="btn btn-dark" onClick={this.reset}>
              <Link className='text-light' to="/">Reset</Link>
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}
Game.propTypes = {
  cat: PropTypes.number
};
