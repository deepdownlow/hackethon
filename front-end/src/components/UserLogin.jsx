import React, { Component } from "react";

class UserLogin extends Component {
  state = {
    animation:false,
    animationOut: false,
    buttonColor:'dark'
  }
  onChange = e => {
    const { handleOnChange } = this.props;
    handleOnChange(e.target.value);
  };
  onClick = () => {
    this.setState({animationOut: true, buttonColor: 'light' })
    const { history } = this.props;
    setTimeout(() => history.push("/game"), 600)
  };
  animate = () => this.setState({animation: true})
  render() {
    const { animation,buttonColor, animationOut } = this.state
    return (
      <div>
        <div className={animationOut ? 'animated bounceOutLeft faster':null}>
         <h1 className='animated bounceInRight faster'> Enter your name: </h1>
         <input type="text" className={!animation ? 'form-control animated bounceInLeft faster': `form-control animated pulse faster`} onChange={this.onChange} onClick={this.animate}/>
        
        {animation 
          ?
          <button className={`btn btn-${buttonColor} btn-block mt-3 animated bounceInRight faster`} style={style} onClick={this.onClick}>
           <i className="fas fa-arrow-right"></i>
          </button> 
          :
          false
          }
       </div>
      </div>
    );
  }
}
const style = {
  border : `2px solid black`,
  transition: `0.5s`
}
export default UserLogin;
