import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolistsReducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

import {TasksStateType} from "../App";


export type ActionType = RemoveTaskAT
    | AddTaskAT
    | ChangeStatusTaskAT
    | ChangeTitleTaskAT
    | AddTodolistAT
    | RemoveTodolistAT

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
    status: TaskStatuses
    id: string
    todolistID: string
}

export type ChangeTitleTaskAT = {
    type: "CHANGE-TITLE-TASK",
    title: string
    id: string
    todolistID: string
}


let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return ({...state, [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.id)})
        }

        case "ADD-TASK": {
            let newTitle: TaskType = {id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistID,
                startDate: "", deadline: "", order: 0, addedDate: "",
                priority: TaskPriorities.Low, description: ""}
            return ({...state, [action.todolistID]: [newTitle, ...state[action.todolistID]]})
        }

        case "CHANGE-STATUS-TASK": {
            return {
                ...state, [action.todolistID]: state[action.todolistID].map
                (m => m.id === action.id ? {...m, status: action.status} : m)
            }
        }

        case "CHANGE-TITLE-TASK": {
            return ({
                ...state, [action.todolistID]: state[action.todolistID].map
                (m => m.id === action.id ? {...m, title: action.title} : m)
            })
        }

        case "ADD-TODOLIST": {
            return {...state, [action.todolistID]: []}
        }

        case "REMOVE-TODOLIST": {
            let newState = {...state}
            delete newState[action.todolistID]
            return newState
        }


        default:
            return state
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

export const changeStatusTaskAC = (status: TaskStatuses, id: string, todolistID: string): ChangeStatusTaskAT => {
    return {
        type: "CHANGE-STATUS-TASK",
        status,
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



