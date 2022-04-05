import {Dispatch} from "redux";
import {todolistApi} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/loginReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as NullableType<string>,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}

        case "APP/SET-ERROR":
            return {...state, error: action.error}

        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}

        default:
            return state
    }
}


//actions
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: "APP/SET-STATUS",
        status
    } as const
}

export const setAppErrorAC = (error: string | null) => {
    return {
        type: "APP/SET-ERROR",
        error
    } as const
}

export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: "APP/SET-INITIALIZED",
        isInitialized
    } as const
}

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC("succeeded"))
                dispatch(setIsLoggedInAC(true));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
                handleServerNetworkError(dispatch, error.message)
            })
        .finally(()=> {
            dispatch(setIsInitializedAC(true))
        })
}


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type NullableType<T> = null | T
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>
export type AppReducerActionsType = SetAppStatusType | SetAppErrorType | SetIsInitializedType