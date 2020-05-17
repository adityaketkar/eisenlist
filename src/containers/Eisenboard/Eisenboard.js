import React, { Component } from "react";
import initialData from '../../data/initial-data';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import InnerList from "../../components/InnerList/InnerList";
import Aux from "../../hoc/Aux/Aux";
import Popup from 'reactjs-popup';
import NewTaskForm from "../../components/ControlPanel/NewTaskForm/NewTaskForm";
import  "./Eisenboard.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

class Eisenboard extends Component{
    state = {
        ...initialData,
        addingNew: false,
        newValue: "",
        taskCounter: 5
    };

    onDragEnd = (result) => {
        const { destination, source, draggableId } = result;    
        document.body.style.color = 'inherit';

        // if destination is not a droppable, do nothing
        if(!destination)return;

        // if element is dropped right back to its place, do nothing
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {return;}


        const startingDroppable = this.state.columns[source.droppableId];
        const endingDroppable = this.state.columns[destination.droppableId];

        // If draggable dropped in same droppable, but different position
        if(startingDroppable === endingDroppable){
            const newTaskIds = Array.from(startingDroppable.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...startingDroppable,
                taskIds: newTaskIds
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            }

            this.setState(newState);
            return;
        } 

        //If draggable dropped in another droppable
        const startTaskIds = Array.from(startingDroppable.taskIds);
        startTaskIds.splice(source.index,1);
        const newStart = {
            ...startingDroppable,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(endingDroppable.taskIds);
        finishTaskIds.splice(destination.index,0, draggableId);
        const newFinish = {
            ...endingDroppable,
            taskIds: finishTaskIds
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            }
        }

        this.setState(newState);
        return;
    }
    
    //Submitting the popup form
    handleSubmit = (event) => {
        // Prevent auto reload
        event.preventDefault();

        // Store all form values
        const description = event.target.description.value;
        const taskname = event.target.task.value;
        const timeslots = event.target.timeslots.value;
        const urgent = event.target.urgent.checked;
        const important = event.target.important.checked;
        
        //Determine which quadrant to put the task in
        let targetColumn = "";
        if (!urgent){
            targetColumn += "Not";
        }
        targetColumn += "Urgent";
        if (!important){
            targetColumn += "Not";
        }
        targetColumn += "Important";
        const taskID = 'task-'+this.state.taskCounter;

        let columns = this.state.columns;
        columns[targetColumn].taskIds.push(taskID);
        let tasklist = this.state.tasklist;
        tasklist[taskID] = { id: taskID, content: taskname, timeslots: timeslots, description: description};

        this.setState({
            tasklist:tasklist,
            columns:columns
        });

        const taskCounter = this.state.taskCounter+1;
        this.setState({taskCounter:taskCounter});
    }

  render(){
    return (
		//Parent component, allows drag and drop
		<Aux>            
            <Popup trigger={<a href="#" className="float"> <i className="fa fa-plus my-float"></i> </a>} position="bottom left">
                {close => (
                    <NewTaskForm/>
                )}
            </Popup>

        <DragDropContext onDragEnd={this.onDragEnd} >
			{/*first row of droppable columns*/}
			<div>
				<Droppable droppableId="Urgent" direction="horizontal" type="column">
                    { 
                        (provided) => {
                            return (
                                <Container {...provided.droppableProps} ref={provided.innerRef} >

                                    <InnerList
                                        key="UrgentImportant" taskMap={this.state.tasklist}
                                        column={this.state.columns.UrgentImportant} index={0}
                                    /> 

                                    <InnerList 
                                        key="UrgentNotImportant" taskMap={this.state.tasklist}
                                        column={this.state.columns.UrgentNotImportant} index={1} 
                                    /> 

                                    {provided.placeholder}
                                    
                                </Container>
                            )
					    }
                    }
				</Droppable>
			</div>

			<div>
				{/*second row of droppable columns */}
				<Droppable droppableId="NotUrgent" direction="horizontal" type="column">
                    {
                        (provided) => {
                            return (
                                <Container {...provided.droppableProps} ref={provided.innerRef} >
                                    
                                    <InnerList
                                        key="NotUrgentImportant" taskMap={this.state.tasklist}
                                        column={this.state.columns.NotUrgentImportant} index={0}
                                    /> 

                                    <InnerList
                                        key="NotUrgentNotImportant" taskMap={this.state.tasklist}
                                        column={this.state.columns.NotUrgentNotImportant} index={1}
                                    /> 

                                    {provided.placeholder}
                                </Container>
                            )
					    }
                    }
				</Droppable>
			</div>
            
        </DragDropContext>
        </Aux>
    );
    }
}

export default Eisenboard;