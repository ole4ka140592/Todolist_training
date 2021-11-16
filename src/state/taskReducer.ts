import {TasksType} from "../App";
import {v1} from "uuid";


export type ActionType = RemoveTaskAT | AddTaskAT | ChangeStatusTaskAT | ChangeTitleTaskAT

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

export type ChangeTitleTaskAT = {
    type: "CHANGE-TITLE-TASK",
    title: string
    id: string
    todolistID: string
}


export const tasksReducer = (state: TasksType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return ({...state, [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.id)})
        }

        case "ADD-TASK": {
            let newTitle = {id: v1(), title: action.title, isDone: false}
            return ({...state, [action.todolistID]: [newTitle, ...state[action.todolistID]]})
        }

        case "CHANGE-STATUS-TASK": {
            return {
                ...state, [action.todolistID]: state[action.todolistID].map
                (m => m.id === action.id ? {...m, isDone: action.isDone} : m)
            }
        }

        case "CHANGE-TITLE-TASK": {
            return ({...state, [action.todolistID]: state[action.todolistID].map
                (m => m.id === action.id ? {...m, title: action.title} : m)})
        }


        default:
            return {...state}
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

export const changeTitleTaskAC = (title: string, id: string, todolistID: string): ChangeTitleTaskAT => {
    return {
        type: "CHANGE-TITLE-TASK",
        title,
        id,
        todolistID
    }
}

