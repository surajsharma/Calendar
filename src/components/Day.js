import React from "react"

export default class Day extends React.Component {
  render() {
    if(this.props.isToday)
        return <div className="day today">{this.props.date}</div> 
      else
        return <div className="day">{this.props.date}</div>
  }
}
