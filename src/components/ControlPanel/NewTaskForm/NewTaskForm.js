import React, { Component } from "react";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import './NewTaskForm.css';

class NewTaskForm extends Component {  
	render(){
		let prefillData = {};
		if(this.props.prefillWithTaskId) {
			prefillData = {
				...this.props.tasklist[this.props.prefillWithTaskId]
			}
			return (
				<form onSubmit={this.props.handleSubmit}>
					<Input prefillvalue={prefillData.content} inputtype="input" name="task" placeholder="" label="Task Name"  ></Input>
					<Input prefillvalue={prefillData.description} inputtype="textarea" name="description" placeholder="Description" label="Description"></Input>
					<Input prefillvalue={prefillData.timeslots} inputtype="number" name="timeslots" label="Pomodoro Slots"></Input>
					<hr></hr>
					<input type="submit" value="Update" ></input>
				</form>
			);
		}
		return (
			<form onSubmit={this.props.handleSubmit}>
				<Input inputtype="input" name="task" placeholder="" label="Task Name"  ></Input>
				<Input inputtype="textarea" name="description" placeholder="Description" label="Description"></Input>
				<Input inputtype="number" name="timeslots" label="Pomodoro Slots"></Input>
				<Input inputtype="checkbox" name="urgent" label="Urgent"></Input>
				<Input inputtype="checkbox" name="important" label="Important"></Input>
				<hr></hr>
				<input type="submit"></input>
			</form>
		);
		
	}
}

const mapStateToProps = state => {
    return {
        tasklist : state.tasklist,
    };
}
export default connect(mapStateToProps, null)(NewTaskForm);