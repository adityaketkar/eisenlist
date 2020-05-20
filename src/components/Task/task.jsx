import React, { Component } from "react";
import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";
import Popup from "reactjs-popup";
import { connect } from "react-redux";
import NewTaskForm from "../ControlPanel/NewTaskForm/NewTaskForm";
import './task.css';

const Container = styled.div`
    margin-bottom: 8px;
    border-radius : 2px;
    border: 1px solid lightgrey;
    padding: 8px;
    background-color: ${props => (props.isDragging? 'lightgreen' : 'white')};
    overflow: auto;
    text-align: center;
}
`;

class Task extends Component { 
    
    handleSubmitEditedTask = (event) => {
        event.preventDefault(); // Let's stop this event.
        const newTaskObject = {
            id: this.props.task.id,
            content: event.target.task.value,
            descriptio: event.target.description.value,
            timeslots: event.target.timeslots.value
        }
 
        this.props.editTask(this.props.task.id, newTaskObject);
    }

    render(){

        return (
            <Draggable isDragDisabled={false} draggableId={this.props.task.id} index={this.props.index}>
                {
                    (provided, snapshot) => (

                        <Popup 
                            closeOnDocumentClick
                            trigger={
                                <div >
                                    <Container 
                                    {...provided.dragHandleProps} 
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                    isDragging={snapshot.isDragging}
                                    >
                                        {this.props.task.content}
                                    </Container>
                                </div>
                            }    
                            position="bottom center"
                        >

                        {close => (
                            <NewTaskForm
                                prefillWithTaskId={this.props.task.id} 
                                handleSubmit={this.handleSubmitEditedTask} 
                            />
                        )}

                        </Popup>
                        
                    )
                }
            </Draggable>
        );
    }
}

//Redux mappings
const mapStateToProps = state => {
    return {
        tasklist : state.tasklist,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        editTask : (taskID, newTaskObject) => dispatch({
            type : 'EDIT_TASK',
            taskID : taskID,
            newTaskObject: newTaskObject
        }) 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);