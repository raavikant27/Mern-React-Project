import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    // way to create state variable
    this.state = {
      count: 0,
      count2: 2,
    };
  }

  render() {
    // ✅ Destructure props and state inside render()
    const { name, location, count } = this.props;
    const { count2 } = this.state;

    return (
      <div className="user-card">
        <h1>Count : {this.state.count}</h1>
        <button
          onClick={() => {
            // ✅ never update state variable directly
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          Count Increase
        </button>
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: 7052513167</h4>
        <h5>Count2 : {count2}</h5>
      </div>
    );
  }
}

export default UserClass;


///Props driling -
//context api avoid the props driling 
// - it is global context which can anybody can accees thease
//  
