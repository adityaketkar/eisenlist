import React, { Component } from "react";
import Column from "../Column/column";


class InnerList extends Component {  
	render(){
		const { column, taskMap, index } = this.props;
		const tasks = column.taskIds.map( 
			taskId => taskMap[taskId]
		);
		return <Column title={column.title} column={column} tasks={tasks} index={index} />;
	}
}

export default InnerList;