import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

/* jshint esnext: true */

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstDay: new Date(this.props.year, this.props.month).getDay(),
      numDays: 32 - new Date(this.props.year, this.props.month, 32).getDate(),
      rDays: []
    };
  }

  componentDidMount() {
    let days = [];
    this.daysInMonth(this.props.month, this.props.year);
    for (let i = 0; i < this.state.numDays; i++) {
      days.push(i);
    }

    this.setState({ rDays: days });
  }

  daysInMonth = (iMonth, iYear) => {
    let dim = 32 - new Date(iYear, iMonth, 32).getDate();
    return dim;
  };

  render() {
    let days = this.state.rDays;
    console.log(this.state.rDays.length);

    return (
      <div className="month">
      <p>{this.props.month}, {this.props.year}</p>
        <div className="monthdays">
          {days.map(item => (
              <Day date={item + 1} key={item} />
            ))}
        </div>
      </div>
    );
  }
}

class Week extends React.Component {
  render() {
    return <div className="week">Week</div>;
  }
}

class Day extends React.Component {
  render() {
    return <div className="day">{this.props.date}</div>;
  }
}

class App extends React.Component {
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
        <Month year={this.state.cYear} month={this.state.cMonth} />
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
