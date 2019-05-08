import React from "react";

export default class Day extends React.Component {
  render() {
    if(Number(this.props.today) === Number(this.props.date))
    { if(this.props.thismonth)
        return <div className="day today">{this.props.date}</div> 
      else
        return <div className="day">{this.props.date}</div>
    } else {
    return <div className="day">{this.props.date}</div>
  }
  }
}
