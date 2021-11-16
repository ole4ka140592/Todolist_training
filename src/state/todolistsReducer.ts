import {filterType, TodolistsType} from "../App";
import {v1} from "uuid";


export type ActionType = removeTodolistAT | addTodolistAT | changeFilterAT | updateTitleTodolistAT

export type removeTodolistAT = {
    type: "REMOVE-TODOLIST"
    todolistID: string
}

export type addTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
}

export type changeFilterAT = {
    type: "CHANGE-FILTER-TODOLIST"
    value: filterType
    todolistID: string
}

export type updateTitleTodolistAT = {
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
            let newTodolistID = v1()
            return [...state, {id: newTodolistID, title: action.title, filter: "all"}]
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

export const removeTodolistAC = (todolistID: string): removeTodolistAT => {
    return {
        type: "REMOVE-TODOLIST",
        todolistID
    }
}

export const addTodolistAC = (title: string): addTodolistAT => {
    return {
        type: "ADD-TODOLIST",
        title
    }
}

export const changeFilterAC = (value: filterType, todolistID: string): changeFilterAT => {
    return {
        type: "CHANGE-FILTER-TODOLIST",
        value,
        todolistID
    }
}

export const updateTitleTodolistAC = (title: string, todolistID: string): updateTitleTodolistAT => {
    return {
        type: "UPDATE-TITLE-TODOLIST",
        title,
        todolistID
    }
}