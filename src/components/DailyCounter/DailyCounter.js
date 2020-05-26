import { Component } from "react";
import React from 'react';
import './DailyCounter.css'

function Button(props) {
    const label = props.label;
  
    return (
      <button className="Button" onClick={props.onClick}>
        {label}
      </button>
    );
}

function Count(props) {
    return (
      <span style={{fontSize:"x-large"}}>
        {props.counter}
      </span>
    );
}

class DailyCounter extends Component {
    render(){
        return (
            <div className="DailyCounter">
            <h5 className="heading">
              Daily Pomodoro Target
            </h5>
            <Button
              label="-"
              onClick={this.props.onClickDecrease}
            />
            <span>
              <Count counter={this.props.dailyPomodoroTarget} />
            </span>
            <Button
              label="+"
              onClick={this.props.onClickIncrease}
            />
          </div>
        )
    }
}

export default DailyCounter;
