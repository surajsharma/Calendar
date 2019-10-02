import React from "react";

import styled from "styled-components";

import Swal from "sweetalert2";

export default class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled: false
        };
    }

    handleDoubleClick = (e) => {
        this.setState({
            toggled: !this.state.toggled
        });
    };

    handleSuccess = (e) => {
        console.log(e);
    };

    handleClick = (e) => {
        const handleSuccess = () => {
            console.log("hello");
        };
        const Btn = styled.button`
            background: transparent;
            border-radius: 3px;
            border: 2px solid palevioletred;
            color: palevioletred;
            margin: 0 1em;
            padding: 0.25em 1em;
        `;

        Swal.mixin({
            input: "text",
            confirmButtonText: "Next &rarr;",
            showCancelButton: true,
            progressSteps: ["1", "2", "3"],
            animation: false,
            customClass: { popup: "animated headShake" }
        })
            .queue([
                {
                    title: "Start Time",
                    text: "In 24-hour format, eg: 0000, 1234, 1920",
                    html:
                        "You can use <b>bold text</b>, " +
                        '<a href="//sweetalert2.github.io">links</a> ' +
                        "and other HTML tags" +
                        "<Btn><Btn/>"
                },
                {
                    title: "Stop Time",
                    text: "In 24-hour format, eg: 0000, 1234, 1920"
                },
                { title: "Event Name", text: "Give your event a name" }
            ])
            .then((result) => {
                if (result.value) {
                    Swal.fire({
                        title: "All done!",
                        html:
                            "Your answers: <pre><code>" +
                            JSON.stringify(result.value) +
                            "</code></pre>",
                        confirmButtonText: "Lovely!"
                    });
                }
            });
    };

    render() {
        if (this.props.isToday)
            return (
                <button
                    onClick={this.handleClick}
                    onDoubleClick={this.handleDoubleClick}
                    className={
                        this.state.toggled ? "toggled day today" : "day today"
                    }
                >
                    <div className="day-date">{this.props.date}</div>
                    <br />
                    <div className="day-name">{this.props.dayName}</div>
                </button>
            );
        else
            return (
                <button
                    onClick={this.handleClick}
                    onDoubleClick={this.handleDoubleClick}
                    className={
                        this.state.toggled
                            ? this.props.dayName === "Sun"
                                ? "toggled day sunday"
                                : "toggled day t"
                            : this.props.dayName === "Sun"
                            ? "day sunday"
                            : "day t"
                    }
                >
                    <div className="day-date">{this.props.date}</div>
                    <br />
                    <div className="day-name">{this.props.dayName}</div>
                </button>
            );
    }
}
