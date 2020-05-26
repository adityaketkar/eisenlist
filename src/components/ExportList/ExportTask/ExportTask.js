import { Component } from "react";
import React from 'react';
import Popup from "reactjs-popup";
import styled from 'styled-components';
import { GoogleCalendar } from 'datebook';
import NewTaskForm from "../../ControlPanel/NewTaskForm/NewTaskForm";
import ExportToCalendarLogo from "../../Logo/ExportToCalendarLogo";
import './ExportTask.css';
import 'antd/dist/antd.css';
import { TimePicker } from 'antd';

const TaskCard = styled.div`
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
    
    onTimeChange = (time, timeString) => {
        // console.log(time, timeString);
        console.log(timeString);
        
        this.setState({time : timeString});
        this.props.onTimeChange(timeString);
    }

    isTimeValid = () => {
        if(this.state.time.length !== 2)return false;
        if(!this.state.time[0] || !this.state.time[1])return false;
        return true;
    }

    renderTask = () => {
		const google = new GoogleCalendar({
			title: this.props.tasklist[this.props.task].content,
			description: this.props.tasklist[this.props.task].description,
			start: (new Date()).setHours(+this.state.time[0].split(':')[0], +this.state.time[0].split(':')[1]),
			end: (new Date()).setHours(+this.state.time[1].split(':')[0], +this.state.time[1].split(':')[1])
		  })
		 
          let link = google.render();	
          console.log(link);
          window.open(link);
          return link;
    }
    
    handleSubmitEditedTask = () => {
        alert("Please edit tasks on main board!");
    }

    handleDeleteTask = () => {
        alert("Please delete tasks on main board!");
    }

    render() {
        const { RangePicker } = TimePicker;

        return (
            <div className="Task">
			<Popup 
                closeOnDocumentClick
                trigger={
                    <TaskCard>
                        <div>
                            {this.props.tasklist[this.props.task].content}
                        </div>
                        <div style={{fontSize:"xx-small"}}>
                            Pomodoro Timeslots : {this.props.tasklist[this.props.task].timeslots}
                        </div>  
                    </TaskCard>
                }    
                position="bottom left"
            >
                { close => (
                    <NewTaskForm
                        prefillWithTaskId={this.props.task} 
                        handleSubmit={this.handleSubmitEditedTask} 
                        handleDelete={this.handleDeleteTask}
                    />
                )}
            </Popup>
            <div className="Clock">
            
                <RangePicker size="small" format="HH:mm" minuteStep={5} onChange={this.onTimeChange}/>
            </div>
            <div>
                <button disabled={!this.isTimeValid()} onClick={this.renderTask} target="_blank"><ExportToCalendarLogo/></button>
            </div>
		</div>
        );
    }
}

export default ExportTask;