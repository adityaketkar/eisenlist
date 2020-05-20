const initialData = {
    tasklist: {
        'task-1': {
            id: 'task-1', 
            content: 'Study for CS-101 test', 
            timeslots: 4,
            description : 'Chapters 3,4,5 are important for the exam'
        },
        'task-2': {
            id: 'task-2', 
            content: 'Project work for OOP', 
            timeslots: 2,
            description : 'Due in 3 days'
        },
        'task-3': {
            id: 'task-3', 
            content: 'Take dog to Vet due checkup', 
            timeslots: 4,
            description : 'call and ask lil brother to do this'
        },
        'task-4': {
            id: 'task-4', 
            content: 'Complete Money Heist', 
            timeslots: 2,
            description : '3 episodes left'
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
            taskIds: ['task-3', ]
        },
        'NotUrgentNotImportant':{
            id: 'NotUrgentNotImportant',
            title: 'Not-Urget-Not-Important',
            taskIds: ['task-4']
        },
    }
};

export default initialData;