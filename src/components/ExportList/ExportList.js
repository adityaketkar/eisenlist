import React, { Component } from "react";
import { connect } from "react-redux";
import './ExportList.css';
import ExportTask from "./ExportTask/ExportTask";


class ExportList extends Component {

	state = {
        times : {}
    }

    onTimeChange = (value, idx) => {
		let newTimes = {...this.state.times};
		newTimes[this.props.taskOrder[idx]] = value;

		this.setState({
			times : newTimes
		});
		console.log(this.state);
		
	}
	
	exportAllTasks = () => {
		console.log(this.props.taskOrder.map((taskID) => {
			return (this.props.tasklist[taskID].content + "  :  " + this.state.times[taskID]);
		}));
	}

	

  render() {
	  console.log(this.props.tasklist);
	  console.log(this.props.taskOrder);
	  
	
	let tasksToExport = this.props.taskOrder.map((task, index) => {
		return (
			<div key={index}>
				<ExportTask onTimeChange={(value) => this.onTimeChange(value, index)}  task={task} tasklist={this.props.tasklist}></ExportTask>	
			</div>
		);
	});


	return (
		<div>
			{tasksToExport}
		</div>
	);
  }
}

const mapStateToProps = state => {
  return {
	tasklist: state.tasklist,
	taskOrder: state.taskOrder
  };
};

export default connect(
  mapStateToProps,
  null
)(ExportList);