import {TasksType} from "../App";


export type ActionType = removeTaskAT

export type removeTaskAT = {
    type: "REMOVE-TASK"
    id: string
    todolistID: string
}

export const tasksReducer = (tasks: TasksType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return ({...tasks, [action.todolistID]: tasks[action.todolistID].filter(f => f.id !== action.id)})
        }

        default:
            return tasks
    }
}

export const removeTaskAC = (id: string, todolistID: string): removeTaskAT => {
    return {
        type: "REMOVE-TASK",
        id,
        todolistID
    } as const
}

