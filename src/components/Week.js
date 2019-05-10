import React from "react"
import Day from "./Day"

export default class Week extends React.Component{
   constructor(props) {
    super(props);
    this.state = {
      firstDay: new Date(this.props.year, this.props.month).getDay(),
      numDays: 32 - new Date(this.props.year, this.props.month, 32).getDate(),
      today: {dd:null, mm:null, yyyy:null, name:null},
      monthDisplay:this.props.month,
      yearDisplay:this.props.year
    }
  }

  componentDidMount() {
    let dd = this.props.numWeek === 1 ? 1 : (((this.props.numWeek* 7)-6))
    let mm = this.state.monthDisplay
    let yyyy = this.state.yearDisplay
    let name = this.props.today.getDay()
    // this.state.m.daysInMonth(this.state.monthDisplay, this.state.monthDisplay);
    this.setState({ today: {dd:dd, mm:mm, yyyy: yyyy, name: name} });
  }

  getWeekDays = (locale, year, month, date, longShort) => {
    const baseDate = new Date(Date.UTC(year,month, date)) // just a Monday
    let weekDays = []
    let show = this.state.numDays-date > 7 ? 7 :this.state.numDays-date+1 
    for(let i = date; i < show+date; i++)
    {       
        weekDays.push(baseDate.toLocaleDateString(locale, { weekday: longShort }));
	baseDate.setDate(baseDate.getDate() + 1);       
    
    }
    return weekDays
  }

  getBaseDate = (locale, year, month, date) => {
	  return new Date(year, month, date).getDate()
	  //just a 01
  }

  render(){

	  let baseDate = this.getBaseDate('en-US', this.props.year, this.props.month, this.state.today.dd)
	  let weekDays = this.getWeekDays('en-US',this.props.year,this.props.month, baseDate, "short")
	  return (<div className="week">{
		  weekDays.map((item, index) => (<Day	today={this.state.today}
			  				isWeek={true}
							dayName={item}
                  		 			isToday={ baseDate + index === this.props.today.getDate()
								  && this.state.monthDisplay === this.props.month 
								  && this.state.yearDisplay === this.props.year }
                    				 	month={this.state.monthDisplay}
                    				 	year={this.state.yearDisplay}
                    		 		 	date={baseDate + index}  
                    		 		 	key={index}
			  				sunday={item  === 'Sun' ? true : false }
			  			/>))
	 	 }</div>)
  }
}
