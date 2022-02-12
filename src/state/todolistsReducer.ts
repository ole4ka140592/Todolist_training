import {v1} from "uuid";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {AppRootStateType} from "./store";
import {Dispatch} from "redux";


export type ActionType = RemoveTodolistAT
    | AddTodolistAT
    | ChangeFilterAT
    | UpdateTitleTodolistAT
    | SetTodolistsAT

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

export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>

export type filterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: filterType
}


let initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType):
    Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.todolistID)
        }

        case "ADD-TODOLIST": {
            return [{id: action.todolistID, title: action.title, filter: "all", addedDate: "", order: 0},
                ...state]
        }

        case "CHANGE-FILTER-TODOLIST": {
            return state.map(m => m.id === action.todolistID ? {...m, filter: action.value} : m)
        }

        case "UPDATE-TITLE-TODOLIST": {
            return state.map(m => m.id === action.todolistID ? {...m, title: action.title} : m)
        }

        case "SET-TODOLISTS": {
            return action.todolists.map(m => ({...m, filter: "all"})
            )
        }


        default:
            return state
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

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {
        type: "SET-TODOLISTS",
        todolists
    } as const
}

export const setTodolistsTC = () => (dispatch: Dispatch, getState: () => AppRootStateType): void => {
    todolistApi.getTodos()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}