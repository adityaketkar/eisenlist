const initialData = {
    tasklist: {
        'task-1': {
            id: 'task-1', 
            content: 'Take garbage out', 
            timeslots: 5,
            description : 'Desrcription 1'
        },
        'task-2': {
            id: 'task-2', 
            content: 'Watch TV', 
            timeslots: 4,
            description : 'Desrcription 2'
        },
        'task-3': {
            id: 'task-3', 
            content: 'Charge phone', 
            timeslots: 3,
            description : 'Desrcription 3'
        },
        'task-4': {
            id: 'task-4', 
            content: 'Dinner', 
            timeslots: 2,
            description : 'Desrcription 4'
        }
    },
    columns: {
        'UrgentImportant':{
            id: 'UrgentImportant',
            title: 'Urgent-Important',
            taskIds: ['task-1']
        },
        'UrgentNotImportant':{
            id: 'UrgentNotImportant',
            title: 'Urget-Not-Important',
            taskIds: ['task-2']
        },
        'NotUrgentImportant':{
            id: 'NotUrgentImportant',
            title: 'Not-Urgent-Important',
            taskIds: ['task-3']
        },
        'NotUrgentNotImportant':{
            id: 'NotUrgentNotImportant',
            title: 'Not-Urget-Not-Important',
            taskIds: ['task-4']
        },
    }
};

export default initialData;