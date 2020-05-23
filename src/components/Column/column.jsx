import React, { Component } from "react";
import Task from '../Task/task';
import { Droppable } from 'react-beautiful-dnd';
import './Column.css';
import styled from 'styled-components';
import EdiText from "react-editext";


const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver? 'lightgrey' : 'inherit')};
    flex-grow: 1;
    min-height: 100px;
`;

class ColumnInnerList extends Component{
    shouldComponentUpdate(nextProps){
        if(nextProps.tasks === this.props.tasks)return false;
        return true;
    }

    render(){
        return (
            this.props.tasks.map((task, index) => {
                return <Task key={task.id} task={task} index={index}/>
            })
        );
    }
}

class Column extends Component { 
    state = {
        title : this.props.title
    }

    onChangeTitle = (newTitle) => {
        this.setState({title : newTitle});
    }

    render(){
        return (
            
            <div className="Container" >
                <div className="Title">
                    <EdiText
                        type="text"
                        value={this.state.title}
                        onSave={this.onChangeTitle}
                        showButtonsOnHover
                        editOnViewClick={true}
                        submitOnEnter
                        cancelOnEscape
                        submitOnUnfocus
                    />
                </div>
                <Droppable droppableId={this.props.column.id} type="task">
                    {(provided, snapshot) => (
                        <TaskList 
                        className="TaskList"
                        ref={provided.innerRef}
                        {...provided.droppableProps} 
                        isDraggingOver={snapshot.isDraggingOver}>
                            <ColumnInnerList tasks={this.props.tasks} />
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </div>
                    
        );
    }
}

export default Column;