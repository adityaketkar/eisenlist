import React, { Component } from "react";
import Input from "../../../components/UI/Input/Input";

class NewTaskForm extends Component {  
	render(){
		return (
            <form onSubmit={this.handleSubmit}>
                    <Input inputtype="input" name="task" placeholder="" label="Task Name"></Input>
                    <Input inputtype="textarea" name="description" placeholder="Description" label="Description"></Input>
                    <Input inputtype="number" name="timeslots" placeholder="1" label="Pomodoro Slots"></Input>
                    <Input inputtype="checkbox" name="urgent" label="Urgent"></Input>
                    <Input inputtype="checkbox" name="important" label="Important"></Input>
                    <input type="submit"></input>
                </form>
        );
	}
}

export default NewTaskForm;