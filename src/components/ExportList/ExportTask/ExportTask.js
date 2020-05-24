import { Component } from "react";
import React from 'react';
import Popup from "reactjs-popup";
import styled from 'styled-components';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { GoogleCalendar } from 'datebook';
import NewTaskForm from "../../ControlPanel/NewTaskForm/NewTaskForm";
import ExportToCalendarLogo from "../../Logo/ExportToCalendarLogo";
import './ExportTask.css';

const Container = styled.div`
    margin: 4px;
    border-radius : 2px;
    border: 1px solid #ccc;
    padding: 8px;
    overflow: auto;
    text-align: center;
    position: inline;
    cursor: pointer;
}
`;



class ExportTask extends Component{

    state = {
        time : []
    }
    
    onTimeChange = (value) => {
        this.setState({time : value});
        this.props.onTimeChange(value);
    }

    isTimeValid = () => {
        if(this.state.time.length !== 2)return false;
        if(!this.state.time[0] || !this.state.time[1])return false;
        return true;
    }

    renderTask = () => {
		const google = new GoogleCalendar({
			title: this.props.tasklist[this.props.task].content,
			location: 'Not Applicable',
			description: this.props.tasklist[this.props.task].description,
			start: (new Date()).setHours(+this.state.time[0].split(':')[0], +this.state.time[0].split(':')[1]),
			end: (new Date()).setHours(+this.state.time[1].split(':')[0], +this.state.time[1].split(':')[1])
		  })
		 
          let link = google.render();	
          console.log(link);
          window.open(link);
          return link;
    }
    
    render() {
        return (
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center'}}>
			<Popup 
                closeOnDocumentClick
                trigger={
                    <div className="modalContainer" >

                        <Container 
                        >
                            <div>
                                {this.props.tasklist[this.props.task].content}
                            </div>
                            <div style={{fontSize:"xx-small"}}>
                                Pomodoro Timeslots : {this.props.tasklist[this.props.task].timeslots}
                            </div>
                                
                        </Container>

                    </div>
                }    
                position="bottom left"
            >

                {close => (
                    <NewTaskForm
                    prefillWithTaskId={this.props.task} 
                    handleSubmit={this.handleSubmitEditedTask} 
                    handleDelete={this.handleDeleteTask}
                />
                )}
            </Popup>
            <div className="Clock">
                <TimeRangePicker 
                    required
                    minuteAriaLabel="Minute"
                    minutePlaceholder="mm"
                    rangeDivider="      to      "
                    secondPlaceholder="ss"
                    clearAriaLabel="Clear"
                    hourPlaceholder="hh"
                    disableClock
                    value={this.state.time}
                    onChange={this.onTimeChange}
                    clearIcon={null}
                />
            </div>
            <div>
                <button disabled={!this.isTimeValid()} onClick={this.renderTask} target="_blank"><ExportToCalendarLogo/></button>
            </div>
		</div>
        );
    }
}

export default ExportTask;