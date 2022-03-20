import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolistsReducer";
import {TaskStatuses, TaskType, todolistApi, UpdateModelTaskType} from "../api/todolist-api";
import {TasksStateType} from "../trash/App";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return ({...state, [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.id)})
        }
        case "ADD-TASK": {
            return ({...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]})
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
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            let newState = {...state}
            delete newState[action.todolistID]
            return newState
        }
        case "SET-TODOLISTS": {
            let copyState = {...state}
            action.todolists.forEach(tl => {
                return (
                    copyState[tl.id] = []
                )
            })
            return copyState
        }
        case "SET-TASKS": {
            let copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }

        default:
            return state
    }
}

//actions
export const removeTaskAC = (id: string, todolistID: string) => {
    return {
        type: "REMOVE-TASK",
        id,
        todolistID
    } as const
}
export const addTaskAC = (task: TaskType) => {
    return {
        type: "ADD-TASK",
        task
    } as const
}
export const changeStatusTaskAC = (todolistID: string, id: string, status: TaskStatuses) => {
    return {
        type: "CHANGE-STATUS-TASK",
        status,
        id,
        todolistID
    } as const
}
export const changeTitleTaskAC = (todolistID: string, id: string, title: string) => {
    return {
        type: "CHANGE-TITLE-TASK",
        todolistID,
        id,
        title
    } as const
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {
        type: "SET-TASKS",
        todolistId,
        tasks
    } as const
}


//thunk
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch<TasksActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistApi.getTasks(todolistId)
        .then((res) => {
            dispatch(setAppStatusAC("succeeded"))
            let tasks = res.data.items
            dispatch(setTasksAC(todolistId, tasks))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TasksActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistApi.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC("succeeded"))
                dispatch(removeTaskAC(taskId, todolistId))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<TasksActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistApi.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC("succeeded"))
                let task = res.data.data.item
                dispatch(addTaskAC(task))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
}
export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch<TasksActionType>, getState: () => AppRootStateType) => {
        let currentTask = getState().tasks[todolistId].find(f => (f.id === taskId ? taskId : ""))
        if (currentTask) {
            const model: UpdateModelTaskType = {
                title: title,
                description: currentTask.description,
                status: currentTask.status,
                priority: currentTask.priority,
                deadline: currentTask.deadline,
                startDate: currentTask.startDate
            }
            dispatch(setAppStatusAC("loading"))
            todolistApi.updateTask(todolistId, taskId, model)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(setAppStatusAC("succeeded"))
                        dispatch(changeTitleTaskAC(todolistId, taskId, title))
                    } else {
                        handleServerAppError(dispatch, res.data)
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(dispatch, error.message)
                })
        }
    }
export const changeStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch<TasksActionType>, getState: () => AppRootStateType) => {

        let currentTask = getState().tasks[todolistId].find(f => (f.id === taskId ? taskId : ""))
        if (currentTask) {
            const model: UpdateModelTaskType = {
                title: currentTask.title,
                description: currentTask.description,
                status: status,
                priority: currentTask.priority,
                deadline: currentTask.deadline,
                startDate: currentTask.startDate
            }
            dispatch(setAppStatusAC("loading"))
            todolistApi.updateTask(todolistId, taskId, model)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(setAppStatusAC("succeeded"))
                        dispatch(changeStatusTaskAC(todolistId, taskId, status))
                    } else {
                        handleServerAppError(dispatch, res.data)
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(dispatch, error.message)
                })
        }
    }


//types
type TasksActionType =
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeStatusTaskAC>
    | ReturnType<typeof changeTitleTaskAC>
    | ReturnType<typeof setTasksAC>
    | SetAppStatusType
    | SetAppErrorType
