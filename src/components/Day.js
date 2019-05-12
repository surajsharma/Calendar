import React from "react"

export default class Day extends React.Component {

  handleDoubleClick
  render() {
    if(this.props.isToday)
        return <button className="day today">
		  <div className="day-date">{this.props.date}</div><br /> 
		  <div className="day-name">{this.props.dayName}</div>
	       </button> 
      else
        return <button className={this.props.dayName==='Sun'? "sunday day":"day" }>
		  <div className="day-date">{this.props.date}</div><br /> 
		  <div className="day-name">{this.props.dayName}</div>
	      </button>
  }
}
