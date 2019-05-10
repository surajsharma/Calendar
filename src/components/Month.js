import React from "react"
import Week from "./Week"

export default class Month extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      firstDay: new Date(this.props.year, this.props.month).getDay(),
      numDays: 32 - new Date(this.props.year, this.props.month, 32).getDate(),
      rDays: [],
      today: {dd:null, 
	      mm:null, 
	      yyyy:null,
      	      name:null},
      monthDisplay:this.props.month,
      yearDisplay:this.props.year
    }

    this.months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  }

  getDayName = (dd,mm,yyyy,locale,longShort) => {
	  return new Date(Date.UTC(yyyy, mm, dd+1))
		  .toLocaleDateString(locale, { weekday: longShort })
  }

   componentDidMount() {
    let dd = this.props.today.getDate()
    let mm = this.props.today.getMonth()
    let yyyy = this.props.today.getFullYear()
    let name = this.getDayName(dd,mm,yyyy,"en-US", "short")
    this.daysInMonth(this.state.monthDisplay, this.state.monthDisplay);
    this.setState({ today: {dd:dd, mm:mm, yyyy: yyyy, name: name} });
  }

  daysInMonth = (iMonth, iYear) => {
    let days = [];
    let day = {}
    let dim = 32 - new Date(iYear, iMonth, 32).getDate()

    for (let i = 0; i < dim; i++) {
      day = {dd:i, mm:this.state.monthDisplay, yyyy:this.state.yearDisplay}
      days.push(day);
    }

    this.setState({numDays:dim, rDays: days})
    return dim;
  };

  nextMonth = () =>{
    if(((this.state.monthDisplay)%this.months.length)===11){      
        let HNY = Number(this.state.yearDisplay)+1
        this.setState({monthDisplay:0, yearDisplay: HNY})
    }
      else
      {
        this.setState({ monthDisplay:(this.state.monthDisplay+1)%this.months.length })
      }
    this.daysInMonth(this.state.monthDisplay+1, this.state.yearDisplay)
  }

  prevMonth = () =>{
    if(((this.state.monthDisplay-1)%this.months.length) < 0){
      this.setState({ monthDisplay:this.months.length-1, 
                      yearDisplay: this.state.yearDisplay-1,
	      	      today : { mm: this.months.length-1, 
			        yyyy: this.state.yearDisplay-1 
		      }
      })
    }
      else{
	      let newMonth = (this.state.monthDisplay-1)%this.months.length
	      this.setState({ 	monthDisplay: newMonth,
				today:{mm: newMonth}
	})
      }
    this.daysInMonth(this.state.monthDisplay-1, this.state.yearDisplay)
  }

  gotoToday = () => {
    this.setState({yearDisplay:this.props.year, monthDisplay:this.props.month})
  }

  render() {
    var selectedMonthName = this.months[this.state.monthDisplay]

    return (
      <div className="month">
        <div className="monthTop">
          <button onClick={this.prevMonth} className="button fa fa-caret-left" aria-hidden="true"></button>
          <button onClick={this.gotoToday} className="button is-dark">
            {selectedMonthName}, {this.state.yearDisplay}
          </button>
          <button onClick={this.nextMonth} className="button fa fa-caret-right" aria-hidden="true"></button>        
        </div>
          <div className="monthdays">
           <Week year={this.state.yearDisplay} month={this.state.monthDisplay} today={this.props.today} numWeek={1}/>
           <Week year={this.state.yearDisplay} month={this.state.monthDisplay} today={this.props.today} numWeek={2}/>
           <Week year={this.state.yearDisplay} month={this.state.monthDisplay} today={this.props.today} numWeek={3}/>
           <Week year={this.state.yearDisplay} month={this.state.monthDisplay} today={this.props.today} numWeek={4}/>
           <Week year={this.state.yearDisplay} month={this.state.monthDisplay} today={this.props.today} numWeek={5}/>
         </div>
      </div>
    );
  }
}
