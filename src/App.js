//WEEK
//YEARS
//ZOOM

import React from "react";
import "./styles.css";
import Month from "./components/Month"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      cMonth: new Date().getMonth(),
      cYear: new Date().getFullYear()
    };
  }
  render() {
    return (
      <div>
        <Month year={this.state.cYear} month={this.state.cMonth} today={this.state.today}/>
      </div>
    );
  }
}
