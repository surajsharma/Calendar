import React from "react"

export default class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        today: {dd:this.props.today.dd, mm:this.props.today.mm, yyyy:this.props.today.yyyy},
        thisday: false
    };
  }

  componentDidMount(){
    let today = new Date()
    if(this.props.isday) {
        console.log(this.props.isday)
        this.setState({thisday:true})
    }
}

  render() {
    if(this.state.thisday)
        return <div className="day today">{this.props.date}</div> 
      else
        return <div className="day">{this.props.date}</div>
  }
}
