import React from "react";
import Week from "./Week";
import Weather from "./WeatherLocal";

export default class Month extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstDay: new Date(this.props.year, this.props.month).getDay(),
            numDays:
                32 - new Date(this.props.year, this.props.month, 32).getDate(),
            rDays: [],
            today: { dd: null, mm: null, yyyy: null, name: null },
            monthDisplay: this.props.month,
            yearDisplay: this.props.year,
            prog: 0,
            leap: this.props.month === 2 && this.props.year % 4 === 0
        };

        this.months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
    }

    getDayName = (dd, mm, yyyy, locale, longShort) => {
        return new Date(Date.UTC(yyyy, mm, dd + 1)).toLocaleDateString(locale, {
            weekday: longShort
        });
    };

    getYearProgress = () => {
        // (36* - days elapsed)/365*100
        // (36*−182.5)/365×100

        let elapsed = 0;
        let prog = 0;
        for (let i = 0; i < this.props.month; i++) {
            elapsed += 32 - new Date(this.props.year, i, 32).getDate();
        }
        prog = this.state.leap
            ? 100 - ((366 - elapsed) / 366) * 100
            : 100 - ((365 - elapsed) / 365) * 100;
        return prog;
    };

    componentDidMount() {
        let dd = this.props.today.getDate();
        let mm = this.props.today.getMonth();
        let yyyy = this.props.today.getFullYear();
        let name = this.getDayName(dd, mm, yyyy, "en-US", "short");
        this.daysInMonth(this.state.monthDisplay, this.state.monthDisplay);
        this.setState({
            today: { dd: dd, mm: mm, yyyy: yyyy, name: name },
            prog: this.getYearProgress()
        });
    }

    daysInMonth = (iMonth, iYear) => {
        let days = [];
        let day = {};
        let dim = 32 - new Date(iYear, iMonth, 32).getDate();

        for (let i = 0; i < dim; i++) {
            day = {
                dd: i,
                mm: this.state.monthDisplay,
                yyyy: this.state.yearDisplay
            };
            days.push(day);
        }

        this.setState({ numDays: dim, rDays: days });
        return dim;
    };

    nextMonth = () => {
        if (this.state.monthDisplay % this.months.length === 11) {
            let HNY = Number(this.state.yearDisplay) + 1;
            this.setState({ monthDisplay: 0, yearDisplay: HNY });
        } else {
            this.setState({
                monthDisplay: (this.state.monthDisplay + 1) % this.months.length
            });
        }
        this.daysInMonth(this.state.monthDisplay + 1, this.state.yearDisplay);
    };

    prevMonth = () => {
        if ((this.state.monthDisplay - 1) % this.months.length < 0) {
            this.setState({
                monthDisplay: this.months.length - 1,
                yearDisplay: this.state.yearDisplay - 1,
                today: {
                    mm: this.months.length - 1,
                    yyyy: this.state.yearDisplay - 1
                }
            });
        } else {
            let newMonth = (this.state.monthDisplay - 1) % this.months.length;
            this.setState({ monthDisplay: newMonth, today: { mm: newMonth } });
        }
        this.daysInMonth(this.state.monthDisplay - 1, this.state.yearDisplay);
    };

    zoomOut = () => {
        this.setState({
            yearDisplay: this.props.year,
            monthDisplay: this.props.month
        });
    };

    render() {
        var selectedMonthName = this.months[this.state.monthDisplay];
        return (
            <div className="month">
                <div className="monthTop">
                    <button
                        onClick={this.prevMonth}
                        className="prev-btn button arrow fa fa-caret-left"
                        aria-hidden="true"
                    ></button>
                    <button onClick={this.zoomOut} className="button">
                        <p className="header">
                            {selectedMonthName}, {this.state.yearDisplay}
                        </p>
                    </button>
                    <button
                        onClick={this.nextMonth}
                        className="next-btn button arrow fa fa-caret-right"
                        aria-hidden="true"
                    ></button>
                </div>
                <div className="progress-area">
                    <progress
                        className="progress is-danger"
                        value={this.state.prog}
                        max="100"
                    />
                    <p className="progress-text tag tagmod is-inverted is-outlined is-link">
                        {Math.round(this.state.prog)}%{""}
                    </p>
                </div>
                <div className="weatherlocal">
                    <Weather />
                </div>
                <div className="monthdays">
                    <Week
                        year={this.state.yearDisplay}
                        month={this.state.monthDisplay}
                        today={this.props.today}
                        numWeek={1}
                    />
                    <Week
                        year={this.state.yearDisplay}
                        month={this.state.monthDisplay}
                        today={this.props.today}
                        numWeek={2}
                    />
                    <Week
                        year={this.state.yearDisplay}
                        month={this.state.monthDisplay}
                        today={this.props.today}
                        numWeek={3}
                    />
                    <Week
                        year={this.state.yearDisplay}
                        month={this.state.monthDisplay}
                        today={this.props.today}
                        numWeek={4}
                    />
                    <Week
                        year={this.state.yearDisplay}
                        month={this.state.monthDisplay}
                        today={this.props.today}
                        numWeek={5}
                    />
                </div>
            </div>
        );
    }
}
