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
					<Input editMode={true} onSubmit={(taskName) => this.props.handleSubmit(taskName,null,null)} prefillvalue={prefillData.content} inputtype="input" name="task" placeholder="" label="Task Name"  ></Input>
					<br></br>
					<Input editMode={true} onSubmit={(description) => this.props.handleSubmit(null, description, null)} prefillvalue={prefillData.description} inputtype="textarea" name="description" placeholder="Description" label="Description"></Input>
					<br></br>
					<Input editMode={true} onSubmit={(timeslots) => this.props.handleSubmit(null, null, timeslots)} prefillvalue={prefillData.timeslots} inputtype="number" name="timeslots" label="Pomodoro Slots"></Input>
					<hr></hr>
					<input onClick={this.props.handleDelete} type="button" value="Delete" style={{backgroundColor: "tomato"}}></input>
				</form>
			);
		}
		return (
			<form onSubmit={this.props.handleSubmit}>
				<Input inputtype="input" name="task" placeholder="" label="Task Name"  ></Input>
				<Input inputtype="textarea" name="description" placeholder="Description" label="Description"></Input>
				<Input inputtype="number" name="timeslots" label="Pomodoro Slots"></Input>
				<div className="checkboxes">
					<Input inputtype="checkbox" name="urgent" label="Urgent"></Input>
					<Input inputtype="checkbox" name="important" label="Important"></Input>
				</div>
				<hr></hr>
				<input type="submit" value="Add"></input>
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