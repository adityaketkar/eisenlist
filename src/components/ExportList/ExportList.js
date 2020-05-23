import React, { Component } from "react";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import Task from '../Task/task';
import { connect } from "react-redux";


const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver? 'lightgrey' : 'inherit')};
    flex-grow: 1;
    min-height: 100px;
`;

class ColumnInnerList extends Component{
    shouldComponentUpdate(nextProps){
        if(nextProps.tasks === this.props.tasks && nextProps.taskOrder === this.props.taskOrder)return false;
        return true;
    }

    render(){
        return (
            this.props.taskOrder.map((task, index) => {
                return <Task key={this.props.tasks[task].id} task={this.props.tasks[task]} index={index}/>
            })
        );
    }
}

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

class ExportList extends Component {  

    state = {
        items: getItems(10)
    }

    // onDragEnd = (result) => {
    //     const { destination, source, draggableId } = result;    
    //     console.log("[OnDragEnd]");
    //     console.log(destination, source, draggableId);
        
    //     // if destination is not a droppable, do nothing
    //     if(!destination)return;

    //     // if element is dropped right back to its place, do nothing
    //     if (
    //         destination.droppableId === source.droppableId &&
    //         destination.index === source.index
    //     ) {return;}
        
    //     // If draggable dropped in same droppable, but different position
    //     if(source.droppableId === destination.droppableId){
    //         this.props.reorderTasksInExportList(source.index, 
    //             destination.index,  
    //             draggableId
    //         );
    //         return;
    //     } 

    //     // this.props.sortList();
    //     return;
    // }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          this.state.items,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          items
        });
      }

    onDragStart = () => {
        console.log("Drag Start!")
    }

    onDragUpdate = () => {
        console.log("Drag updtae");
        
    }

	render(){
		return (
            <div className="Container" >
                <div className="Title">
                    Tasks to Export
                </div>
                <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
                {/* <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable isDropDisabled={false} droppableId="droppable">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef}
                            {...provided.droppableProps} 
                            isDraggingOver={snapshot.isDraggingOver}>
                            <TaskList 
                            className="TaskList"
                            >
                                <ColumnInnerList taskOrder={this.props.taskOrder} tasks={this.props.tasklist}/>
                                
                            </TaskList>
                            {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext> */}
            </div>
        );
	}
}


const mapStateToProps = state => {
    return {
        tasklist : state.tasklist,
        taskOrder : state.taskOrder
    };
}

const mapDispatchToProps = dispatch => {
    return {
        sortList : () => dispatch({
            type : 'SORT_TASKS'
        }),
        reorderTasksInExportList : (sourceIndex, destinationIndex, draggableId) => dispatch({
            type : 'REORDER_EXPORTLIST',
            providedData : {
                sourceIndex :sourceIndex, 
                destinationIndex :destinationIndex,  
                draggableId :draggableId
            }  
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportList);