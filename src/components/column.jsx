import React, { Component } from "react";
import styled from 'styled-components';
import Task from './Task/task';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    background-color:white;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 20px;
`;
const Title = styled.h3`
    padding: 8px;
    text-align: center;
`;
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
    render(){
        return (
            
            <Container >
                <Title>{this.props.title}</Title>
                <Droppable droppableId={this.props.column.id} type="task">
                    {(provided, snapshot) => (
                        <TaskList 
                        ref={provided.innerRef}
                        {...provided.droppableProps} 
                        isDraggingOver={snapshot.isDraggingOver}>
                            <ColumnInnerList tasks={this.props.tasks} />
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
                    
        );
    }
}

export default Column;