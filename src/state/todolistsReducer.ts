import {filterType, TodolistsType} from "../App";
import {v1} from "uuid";


export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeFilterAT | UpdateTitleTodolistAT

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    todolistID: string
}

export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistID: string
}

export type ChangeFilterAT = {
    type: "CHANGE-FILTER-TODOLIST"
    value: filterType
    todolistID: string
}

export type UpdateTitleTodolistAT = {
    type: "UPDATE-TITLE-TODOLIST"
    title: string
    todolistID: string
}

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.todolistID)
        }

        case "ADD-TODOLIST": {
            return [...state, {id: action.todolistID, title: action.title, filter: "all"}]
        }

        case "CHANGE-FILTER-TODOLIST": {
            return state.map(m => m.id === action.todolistID ? {...m, filter: action.value} : m)
        }

        case "UPDATE-TITLE-TODOLIST": {
            return state.map(m => m.id === action.todolistID ? {...m, title: action.title} : m)
        }



        default:
            return {...state}
    }
}

export const removeTodolistAC = (todolistID: string): RemoveTodolistAT => {
    return {
        type: "REMOVE-TODOLIST",
        todolistID
    }
}

export const addTodolistAC = (title: string): AddTodolistAT => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistID: v1()
    }
}

export const changeFilterAC = (value: filterType, todolistID: string): ChangeFilterAT => {
    return {
        type: "CHANGE-FILTER-TODOLIST",
        value,
        todolistID
    }
}

export const updateTitleTodolistAC = (title: string, todolistID: string): UpdateTitleTodolistAT => {
    return {
        type: "UPDATE-TITLE-TODOLIST",
        title,
        todolistID
    }
}