import React, { Component } from "react";
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import InnerList from "../../components/InnerList/InnerList";
import Aux from "../../hoc/Aux/Aux";
import Popup from 'reactjs-popup';
import NewTaskForm from "../../components/ControlPanel/NewTaskForm/NewTaskForm";
import  "./Eisenboard.css";
import { connect } from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

class Eisenboard extends Component{
    state = {
        taskCounter: 5
    };

    onDragEnd = (result) => {
        const { destination, source, draggableId } = result;    

        // if destination is not a droppable, do nothing
        if(!destination)return;

        // if element is dropped right back to its place, do nothing
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {return;}
        
        // If draggable dropped in same droppable, but different position
        if(source.droppableId === destination.droppableId){
            this.props.reorderTaskInSameColumn(source.index, 
                destination.index, 
                source.droppableId, 
                draggableId
            );
            return;
        } 

        //If draggable dropped in another droppable
        this.props.reorderTaskInDifferentColumn(
            source.index, 
            destination.index, 
            source.droppableId, 
            destination.droppableId, 
            draggableId
        );
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

        this.props.addNewTask(taskID, targetColumn, taskname, timeslots, description);        

        const taskCounter = this.state.taskCounter+1;
        this.setState({taskCounter:taskCounter});
    }

  render(){
    return (
		//Parent component, allows drag and drop
		<Aux>            
            <Popup trigger={<a href="#" className="float"> <i className="fa fa-plus my-float"></i> </a>} position="bottom left">
                {close => (
                    <NewTaskForm handleSubmit={this.handleSubmit}/>
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
                                        key="UrgentImportant" taskMap={this.props.tasklist}
                                        column={this.props.columns.UrgentImportant} index={0}
                                    /> 

                                    <InnerList 
                                        key="UrgentNotImportant" taskMap={this.props.tasklist}
                                        column={this.props.columns.UrgentNotImportant} index={1} 
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
                                        key="NotUrgentImportant" taskMap={this.props.tasklist}
                                        column={this.props.columns.NotUrgentImportant} index={0}
                                    /> 

                                    <InnerList
                                        key="NotUrgentNotImportant" taskMap={this.props.tasklist}
                                        column={this.props.columns.NotUrgentNotImportant} index={1}
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

//Redux mappings
const mapStateToProps = state => {
    return {
        tasklist : state.tasklist,
        columns: state.columns
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addNewTask : (taskID, targetColumn, taskname, timeslots, description) => dispatch({
            type : 'ADD_TASK', providedData : {
                taskID : taskID,
                targetColumn : targetColumn,
                taskname:taskname,
                timeslots : timeslots,
                description : description
            }
        }),
        reorderTaskInSameColumn : (sourceIndex, destinationIndex, columnID, draggableId) => dispatch({
            type : 'DND_IN_SAME_LIST', providedData : {
                sourceIndex : sourceIndex,
                destinationIndex : destinationIndex,
                columnID: columnID,
                draggableId: draggableId
            }
        }) ,
        reorderTaskInDifferentColumn : (sourceIndex, destinationIndex, sourceDroppableID, destinationDroppableID, draggableID ) => dispatch({
            type : 'DND_IN_DIFF_LIST', providedData : {
                sourceIndex : sourceIndex,
                destinationIndex : destinationIndex,
                sourceDroppableID : sourceDroppableID,
                destinationDroppableID : destinationDroppableID,
                draggableID : draggableID
            }
        }) 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Eisenboard);