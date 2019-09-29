//YEARS
//ZOOM

import React from "react";
import "./styles.css";
import Month from "./components/Month";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            today: new Date(),
            cMonth: new Date().getMonth(),
            cYear: new Date().getFullYear()
        };
    }

    componentDidMount() {
        // let grid = new Muuri('.grid', {
        //   dragEnabled: true
        // })
    }

    render() {
        return (
            <div className="grid columns">
                <div className="column">
                    <div className="item">
                        <Month
                            year={this.state.cYear}
                            month={this.state.cMonth}
                            today={this.state.today}
                        />
                    </div>
                </div>
                <div className="column">
                    <div className="item"></div>
                </div>
            </div>
        );
    }
}

// Month
// week
// Days
// week
// week
// week
// week
