import initialData from "../data/initial-data";

const initialState = {
    ...initialData,
    taskOrder : ['task-1', 'task-2', 'task-3', 'task-4']
};

const sortTasks = (state) => {
    //Make a copy of the tasklist 
    let newTaskListArray = [];

    //Now we sort the tasklist in this order -> UI, UNI, NUI, NUNI [U = Urgent, I = Important, N = Not]
    newTaskListArray = newTaskListArray.concat(state.columns.UrgentImportant.taskIds);
    newTaskListArray = newTaskListArray.concat(state.columns.UrgentNotImportant.taskIds);
    newTaskListArray = newTaskListArray.concat(state.columns.NotUrgentImportant.taskIds);
    newTaskListArray = newTaskListArray.concat(state.columns.NotUrgentNotImportant.taskIds);
    console.log(newTaskListArray);

    //Replace the current tasklist in the state with new one
    // let columns = {...state.columns};
    // columns[action.providedData.targetColumn].taskIds.push(action.providedData.taskID);

    return newTaskListArray;
}

const reducer = (state = initialState, action) => {
    
    //Update state if source droppable and destination droppable are different
    if(action.type === "DND_IN_DIFF_LIST"){
        const providedData = action.providedData;

        //Make a copy of all the content
        let columns = {...state.columns};
        let taskListOfSourceDroppable = Array.from(columns[providedData.sourceDroppableID].taskIds);
        let taskListOfDestinationDroppable = Array.from(columns[providedData.destinationDroppableID].taskIds);

        //remove task from source list, and add to destination list
        taskListOfSourceDroppable.splice(providedData.sourceIndex,1);
        taskListOfDestinationDroppable.splice(providedData.destinationIndex,0, providedData.draggableID);

        //reassign new lists to state
        columns[providedData.sourceDroppableID].taskIds = taskListOfSourceDroppable;
        columns[providedData.destinationDroppableID].taskIds = taskListOfDestinationDroppable;

        return {
            ...state,
            columns : columns
        }
    }

    //Update state if source droppable and destination droppable are same (ie. a list is reordered)
    if(action.type === "DND_IN_SAME_LIST"){

        const providedData = action.providedData;

        //Make a copy of all the 4 columns' content
        let columns = {...state.columns};
        const newTasksList = Array.from(columns[providedData.columnID].taskIds);
        
        //reorder tasks in the list
        newTasksList.splice(providedData.sourceIndex, 1);
        newTasksList.splice(providedData.destinationIndex, 0, providedData.draggableId);

        //reassign new lists to state
        columns[providedData.columnID].taskIds = newTasksList;
        return {
            ...state,
            columns : columns
        }
    } 

    //Update state if new task added
    if(action.type === "ADD_TASK"){
        
        //Make a copy of the tasklist and add new task to it
        let tasklist = { ...state.tasklist };
        tasklist[action.providedData.taskID] = { id: action.providedData.taskID, content: action.providedData.taskname, timeslots: action.providedData.timeslots, description: action.providedData.description};

        //Replace the current tasklist in the state with new one
        let columns = {...state.columns};
        columns[action.providedData.targetColumn].taskIds.push(action.providedData.taskID);

        let newTaskOrder = sortTasks(state);

        return {
            ...state,
            tasklist: tasklist,
            columns : columns,
            taskOrder:newTaskOrder
        }
    }

    if( action.type === "EDIT_TASK"){

        let newTaskList = { ...state.tasklist }
        newTaskList[action.taskID] = action.newTaskObject
        
        return {
            ...state,
            tasklist: newTaskList
        };
    }

    if( action.type === "DELETE_TASK"){

        let newTaskList = { ...state.tasklist };
        delete newTaskList[action.taskID]; 
        
        let newColumns = {
            ...state.columns
        };
        newColumns.NotUrgentImportant.taskIds = newColumns.NotUrgentImportant.taskIds.filter(value =>value!==action.taskID);    
        newColumns.UrgentImportant.taskIds = newColumns.UrgentImportant.taskIds.filter(value => value!==action.taskID);
        newColumns.NotUrgentNotImportant.taskIds = newColumns.NotUrgentNotImportant.taskIds.filter(value => value!==action.taskID);
        newColumns.UrgentNotImportant.taskIds = newColumns.UrgentNotImportant.taskIds.filter(value => value!==action.taskID);

        console.log(state);

        let newTaskOrder = sortTasks(state);
        
        return {
            ...state,
            tasklist: newTaskList,
            columns: newColumns,
            taskOrder: newTaskOrder
        };
    }
    
    return state;
};

export default reducer;