import React from "react"

export default class Hour extends React.Component {
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
    return(
        <button className='hour' > {this.props.hour}</button>
        )
  }
}
