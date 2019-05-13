import React from "react"
import Day from "./Day"
import posed from 'react-pose';

export default class Week extends React.Component{
   constructor(props) {
    super(props);
    this.state = {
      today: {dd:null, mm:null, yyyy:null, name:null},
      monthDisplay:this.props.month,
      yearDisplay:this.props.year,
      leap: this.props.month === 2 && this.props.year%4 === 0,
      open:false
    }
  }

  componentDidMount() {
    let dd = this.props.numWeek === 1 ? 1 : (((this.props.numWeek* 7)-6))
    let mm = this.state.monthDisplay
    let yyyy = this.state.yearDisplay
    let name = this.props.today.getDay()
    this.setState({ today: {dd:dd, mm:mm, yyyy: yyyy, name: name}})
  }

  componentWillReceiveProps(props){
    const {month}= this.props
    if(props.month !== month || props.month===1){
      this.setState({
        monthDisplay: props.month,
        yearDisplay: props.year,
        leap: props.month===1 && props.year%4===0
      })      
    }
  }

  getWeekDays = (locale, year, month, date, longShort) => {
    const numDays = 32 - new Date(this.props.year, this.props.month, 32).getDate()
    const baseDate = new Date(Date.UTC(year,month, date)) // just a Monday
    let weekDays = []
    let show = numDays-date > 7 ? 7 : this.props.month === 1 ? numDays-21 : numDays-28

    if(show === 8 && this.props.numWeek === 4){
      show = 7
    }

    if(this.state.leap && this.props.numWeek === 5){
      show = 1
    }

    for(let i = date; i < show + date; i++)
    {       
      weekDays.push(baseDate.toLocaleDateString(locale, { weekday: longShort }));
      baseDate.setDate(baseDate.getDate() + 1)

      if (numDays-date < 0 ){
        weekDays.pop()
        return weekDays
      }    
    }
    return weekDays
  }

  getBaseDate = (locale, year, month, date) => {
	  return new Date(year, month, date).getDate()
  }

  openWeekView = () =>{
    this.setState({
      open: !this.state.open
    })

    console.log(this.state.open)
  }

  render(){
    const { open } = this.state;
    const numDays = 32 - new Date(this.state.yearDisplay, this.state.monthDisplay, 32).getDate()

	  let weekDays = this.getWeekDays('en-US',  this.state.yearDisplay, 
                                              this.state.monthDisplay, 
                                              this.state.today.dd, "short")

    const Content = posed.div({closed: { display: 'none' },open: { display: 'block' }});

    if(this.state.leap===false && numDays === 28 && this.props.numWeek===5){
      return (<div></div>)     
    } else {
      return (
        <div className="pView">
          <div className="week">
            <button className='week-btn' onClick={this.openWeekView}>
              <p>{this.props.numWeek}</p>
            </button>

            <div className='week-days'>
              {weekDays.map((item, index) => (
                <Day  today={this.state.today}
                          isWeek={true}
                          dayName={item}
                          isToday={ this.state.today.dd + index === this.props.today.getDate()
                          && this.state.monthDisplay === this.props.today.getMonth()
                          && this.state.yearDisplay === this.props.today.getFullYear() }
                          month={this.state.monthDisplay}
                          year={this.state.yearDisplay}
                          date={this.state.today.dd + index}  
                          key={index}
                          sunday={item  === 'Sun' ? true : false }/>))}
              </div>
            </div>
            <Content className="content" pose={open ? 'open' : 'closed'}>
              <div className="content-wrapper">Content</div>
            </Content>

        </div>

          )
    }
  }
}
