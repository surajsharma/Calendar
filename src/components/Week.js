import React from "react"
import Day from "./Day"

export default class Week extends React.Component{

   constructor(props) {
    super(props);
    this.state = {
      firstDay: new Date(this.props.year, this.props.month).getDay(),
      numDays: 32 - new Date(this.props.year, this.props.month, 32).getDate(),
      rDays: [],
      today: {dd:null, mm:null, yyyy:null, name:null},
      monthDisplay:this.props.month,
      yearDisplay:this.props.year
    }

    this.months = [ 
	    "January", 
	    "February", 
	    "March", 
	    "April", 
	    "May", 
	    "June", 
	    "July", 
	    "August", 
	    "September", 
	    "October", 
	    "November", 
	    "December" ];


  }

  componentDidMount() {
    let dd = this.props.today.getDate();
    let mm = this.props.today.getMonth();
    let yyyy = this.props.today.getFullYear();
    let name = this.props.today.getDay();
    // this.state.m.daysInMonth(this.state.monthDisplay, this.state.monthDisplay);
    this.setState({ today: {dd:dd, mm:mm, yyyy: yyyy, name: name} });
  }

  getWeekDays = (locale, year, month, date, longShort) => {
    const baseDate = new Date(Date.UTC(year,month, date)) // just a Monday
    let weekDays = []

    for(let i = 0; i < 7; i++)
    {       
        weekDays.push(baseDate.toLocaleDateString(locale, { weekday: longShort }));

	baseDate.setDate(baseDate.getDate() + 1);       
    
    }
    return weekDays
  }

  getBaseDate = (locale, year, month, date) => {
	  return new Date(Date.UTC(year, month, date)) //just a 01
  }

  render(){
	  let weekDays = this.getWeekDays('en-US',this.state.today.yyyy,this.state.today.mm,this.state.today.dd,"short");
	  let baseDate = this.getBaseDate('en-US',this.state.today.yyyy,this.state.today.mm,this.state.today.dd)

	  return (<div className="week">{
		  weekDays.map((item, index) => (<Day	today={this.state.today}
			  				isWeek={true}
							dayName={item}
                  		 			isToday={ item.dd+1===this.state.today.dd 
							  && this.state.monthDisplay === this.state.today.mm 
							  && this.state.yearDisplay === this.state.today.yyyy }
                    				 	month={this.state.monthDisplay}
                    				 	year={this.state.yearDisplay}
                    		 		 	date={baseDate.getDate() + index}  
                    		 		 	key={item}
			  				sunday={item  === 'Sun' ? true : false }
			  			/>))
	 	 }</div>)
  }
}
