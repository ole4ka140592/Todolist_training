import {todolistApi, TodolistType} from "../api/todolist-api";
import {AppRootStateType} from "./store";
import {Dispatch} from "redux";
import {setAppStatusAC, SetAppStatusType} from "../app/app-reducer";


let initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionType):
    Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.todolistID)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]
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


//actions
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todolistID
    } as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: "ADD-TODOLIST",
        todolist
    } as const
}
export const changeFilterAC = (value: filterType, todolistID: string) => {
    return {
        type: "CHANGE-FILTER-TODOLIST",
        value,
        todolistID
    } as const
}
export const updateTitleTodolistAC = (todolistID: string, title: string) => {
    return {
        type: "UPDATE-TITLE-TODOLIST",
        title,
        todolistID
    } as const
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {
        type: "SET-TODOLISTS",
        todolists
    } as const
}


//thunk
export const setTodolistsTC = () => (dispatch: Dispatch<TodolistsActionType>, getState: () => AppRootStateType): void => {
    dispatch(setAppStatusAC("loading"))
    todolistApi.getTodos()
        .then((res) => {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistsActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistApi.deleteTodo(todolistId)
        .then((res) => {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodolistsActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistApi.createTodo(title)
        .then((res) => {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const updateTitleTodolistTC = (title: string, todolistID: string) =>
    (dispatch: Dispatch<TodolistsActionType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistApi.updateTodoTitle(todolistID, title)
            .then(() => {
                dispatch(setAppStatusAC("succeeded"))
                dispatch(updateTitleTodolistAC(todolistID, title))
            })
    }


//types
export type TodolistsActionType =
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof updateTitleTodolistAC>
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | SetAppStatusType

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>

export type filterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: filterType
}