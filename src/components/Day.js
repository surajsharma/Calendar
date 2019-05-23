import React from "react"

export default class Day extends React.Component {
  constructor(props){
    super(props)
    this.state={
      toggled: false
    }
  }

  handleDoubleClick = (e) => {
    this.setState({
      toggled: !this.state.toggled
    })
  }

  render() {
    if(this.props.isToday)
        return <button  onDoubleClick={this.handleDoubleClick} 
                        className={this.state.toggled ? "toggled day today" : "day today"}>
		  <div className="day-date">{this.props.date}</div><br /> 
		  <div className="day-name">{this.props.dayName}</div>
	       </button> 
      else
        return <button  onDoubleClick={this.handleDoubleClick} 
                        className={ this.state.toggled ? 
                                    this.props.dayName === 'Sun'? "toggled day sunday" : "toggled day t" :  this.props.dayName === 'Sun'? "day sunday" : "day t"}
                >
		  <div className="day-date">{this.props.date}</div><br /> 
		  <div className="day-name">{this.props.dayName}</div>
	      </button>
  }
}
