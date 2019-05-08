import React from "react";
import Day from "./Day"

const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

export default class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstDay: new Date(this.props.year, this.props.month).getDay(),
      numDays: 32 - new Date(this.props.year, this.props.month, 32).getDate(),
      rDays: [],
      todaydd: null,
      month:this.props.month,
      year:this.props.year,
      thismonth:true
    };
  }

  componentDidMount() {
    let dd = String(this.props.today.getDate()).padStart(2, '');
    this.daysInMonth(this.state.month, this.state.year);
    this.setState({ todaydd: dd });
  }

  daysInMonth = (iMonth, iYear) => {
    let days = [];
    let dim = 32 - new Date(iYear, iMonth, 32).getDate();
    for (let i = 0; i < dim; i++) {
      days.push(i);
    }

    this.setState({numDays:dim, rDays: days})
    return dim;
  };

  nextMonth = () =>{
    this.setState({thismonth:false, month: (this.state.month+1)%months.length})
    this.daysInMonth(this.state.month+1, this.state.year)
  }


  prevMonth = () =>{
    this.setState({thismonth:false, month: (this.state.month-1)%months.length})
    this.daysInMonth(this.state.month-1, this.state.year)
  }


  render() {
    let days = this.state.rDays;
    var selectedMonthName = months[this.state.month];

    return (
      <div className="month">
        <div className="monthTop">
          <button onClick={this.prevMonth} className="button fa fa-caret-left" aria-hidden="true"></button>
          <p className="subtitle">{selectedMonthName}, {this.props.year}</p>
          <button onClick={this.nextMonth} className="button fa fa-caret-right" aria-hidden="true"></button>        
        </div>
          <div className="monthdays">
            {days.map(item => (<Day thismonth={this.state.thismonth} date={item + 1} today={this.state.todaydd} key={item} />))}
          </div>
      </div>
    );
  }
}