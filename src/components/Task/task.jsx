import React, { Component } from "react";
import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";
import Move from "../../assets/move.png";
import Aux from "../../hoc/Aux/Aux";
import './task.css';
import Popup from "reactjs-popup";


const Container = styled.div`
    margin-bottom: 8px;
    border-radius : 2px;
    border: 1px solid lightgrey;
    padding: 8px;
    background-color: ${props => (props.isDragging? 'lightgreen' : 'white')};
    display: flex;
    justify-content: space-between;
`;

const imgStyle = {
    width: '7%',
    height: '7%',
    padding: '4px'
};


class Task extends Component { 

    render(){
        return (
            <Draggable isDragDisabled={false} draggableId={this.props.task.id} index={this.props.index}>
                {
                    (provided, snapshot) => (
                        <Aux>
                            <Container
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                            >
                                <img src={Move} alt="Move" style={imgStyle} {...provided.dragHandleProps}/>
                                <div onDoubleClick={this.doubleClick}>
                                    {this.props.task.content}
                                </div>
                                <div>
                                    {/* TODO */}
                                    <Popup trigger={<button >Edit</button>} position="bottom right">
                                        {close => (
                                            <div> hello </div>
                                        )}
                                    </Popup>
                                </div>
                            </Container>
                        </Aux>
                    )
                }
            </Draggable>
        );
    }
}

export default Task;