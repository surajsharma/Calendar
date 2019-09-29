//YEARS ZOOM

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

    ComponentDidMount = () => {
        this.callBackendAPI()
            .then((res) => this.setState({ data: res.express }))
            .catch((err) => console.log(err));
    };

    callBackendAPI = async () => {
        const response = await fetch("/express_backend");
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    };
    render() {
        return (
            <div className="grid">
                <div>
                    <Month
                        year={this.state.cYear}
                        month={this.state.cMonth}
                        today={this.state.today}
                    />
                </div>
            </div>
        );
    }
}
