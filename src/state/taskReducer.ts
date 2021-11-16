import {TasksType} from "../App";
import {v1} from "uuid";


export type ActionType = RemoveTaskAT | AddTaskAT | ChangeStatusTaskAT

export type RemoveTaskAT = {
    type: "REMOVE-TASK"
    id: string
    todolistID: string
}

export type AddTaskAT = {
    type: "ADD-TASK"
    title: string
    todolistID: string
}

export type ChangeStatusTaskAT = {
    type: "CHANGE-STATUS-TASK",
    isDone: boolean
    id: string
    todolistID: string
}


export const tasksReducer = (tasks: TasksType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return ({...tasks, [action.todolistID]: tasks[action.todolistID].filter(f => f.id !== action.id)})
        }

        case "ADD-TASK": {
            let newTitle = {id: v1(), title: action.title, isDone: false}
            return ({...tasks, [action.todolistID]: [newTitle, ...tasks[action.todolistID]]})
        }

        case "CHANGE-STATUS-TASK": {
            return {
                ...tasks, [action.todolistID]: tasks[action.todolistID].map
                (m => m.id === action.id ? {...m, isDone: action.isDone} : m)
            }
        }


        default:
            return {...tasks}
    }
}

export const removeTaskAC = (id: string, todolistID: string): RemoveTaskAT => {
    return {
        type: "REMOVE-TASK",
        id,
        todolistID
    }
}

export const addTaskAC = (title: string, todolistID: string): AddTaskAT => {
    return {
        type: "ADD-TASK",
        title,
        todolistID
    }
}

export const changeStatusTaskAC = (isDone: boolean, id: string, todolistID: string): ChangeStatusTaskAT => {
    return {
        type: "CHANGE-STATUS-TASK",
        isDone,
        id,
        todolistID
    }
}

