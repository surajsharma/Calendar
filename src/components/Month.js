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
      today: {dd:null, mm:null, yyyy:null},
      monthDisplay:this.props.month,
      yearDisplay:this.props.year
    };
  }

  componentDidMount() {
    let dd = this.props.today.getDate();
    let mm = this.props.today.getMonth();
    let yyyy = this.props.today.getFullYear();

    this.daysInMonth(this.state.monthDisplay, this.state.monthDisplay);
    this.setState({ today: {dd:dd, mm:mm, yyyy: yyyy} });
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
    if(((this.state.monthDisplay)%months.length)==11){      
        let HNY = Number(this.state.yearDisplay)+1
        console.log(HNY, ((this.state.monthDisplay+1)%months.length))
        this.setState({monthDisplay:0, yearDisplay: HNY})
    }
      else
      {
        this.setState({monthDisplay:(this.state.monthDisplay+1)%months.length})
      }
    this.daysInMonth(this.state.monthDisplay+1, this.state.yearDisplay)
  }

  prevMonth = () =>{
    if(((this.state.monthDisplay-1)%months.length) < 0){
      this.setState({monthDisplay:months.length-1, yearDisplay: this.state.yearDisplay-1})
    }
      else{
        this.setState({monthDisplay:(this.state.monthDisplay-1)%months.length})
      }
    this.daysInMonth(this.state.monthDisplay-1, this.state.yearDisplay)
  }


  render() {
    let days = this.state.rDays;
    var selectedMonthName = months[this.state.monthDisplay];

    return (
      <div className="month">
        <div className="monthTop">
          <button onClick={this.prevMonth} className="button fa fa-caret-left" aria-hidden="true"></button>
          <p className="subtitle">{selectedMonthName}, {this.state.yearDisplay}</p>
          <button onClick={this.nextMonth} className="button fa fa-caret-right" aria-hidden="true"></button>        
        </div>
          <div className="monthdays">
            {days.map(item => (
              <Day  today={this.state.today}
                    month={this.state.monthDisplay}
                    year={this.state.yearDisplay}
                    date={item + 1}  
                    isday={false}
                    key={item} />))}
          </div>
      </div>
    );
  }
}