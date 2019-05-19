import React from "react"
import Hour from "./Hour"


export default class WeekPlanner extends React.Component{
  constructor(props){
    super(props)

    this.state={
      days: this.props.days
    }
  }

  componentDidMount() {
    let week = []
    
    console.log(this.props.days)

    for(let i=0; i< this.props.days.length; i++){
      for(let j=0; j<24; j++){
        week.push(<Hour key={i+'+'+j} hour={j}/>)  
      }    
    }

    this.setState({days: week})

  }

  componentWillReceiveProps(props){
    let week = []

    for(let i=0; i< this.props.days.length; i++){
      for(let j=0; j<24; j++){
        week.push(<Hour key={i+'+'+j}>{i+'+'+j}</Hour>)  
      }    
    }

    this.setState({days: week})
  }

  render(){
    return(
      <div className="week-planner">
        <div className='week-hours'>
          {this.state.days}
        </div>
      </div>)
  }
}
