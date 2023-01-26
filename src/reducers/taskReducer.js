const generateId = () => Math.random().toString(36).substring(2, 18);

//exportamos al principio
export const taskReducer = (state, action) => { // state = representa el array con todas las tareas
    
    switch (action.type) {
        case "ADD":

            const inputsValues = action.payload;
            const newTask = {
                ...inputsValues,
                id: generateId(),
                active: false,
                completed: false,
                date: new Date().toLocaleString()
            };

            return [...state, newTask];
        
        case "UPDATE":
            const taskToUpdate = action.payload;
            const tasksUpdated = state.map((task) => {
                if(task.id === taskToUpdate.id) {
                    return {
                        ...task,
                        ...taskToUpdate
                    }
                }
                return task;
            });
            return tasksUpdated;

        case "DELETE":
            const idTaskToDelete = action.payload;
            console.log(idTaskToDelete);
            const restTask = state.filter(task => task.id !== idTaskToDelete)

            return restTask;
        
        case "TOGGLE_ACTIVE":
            const idTaskToActive = action.payload;
            const tasksUpdatedActive = state.map((task) => {
                if(task.id === idTaskToActive) {
                    return {
                        ...task,
                        active: !task.active,
                        completed: task.completed ? false : task.completed
                    }
                }
                return task
            })

            return tasksUpdatedActive;

        case "TOGGLE_COMPLETE":
            const idTaskToCompleted = action.payload;
            const tasksUpdatedCompleted = state.map((task) => {
                if(task.id === idTaskToCompleted) {
                    return {
                        ...task,
                        completed: !task.completed,
                        active: task.active ? false : task.active
                    }
                }
                return task
            })

            return tasksUpdatedCompleted;
    
        default:
            return state;
    }

}