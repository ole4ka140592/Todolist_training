import { Dispatch } from 'redux'
import {SetAppErrorType, setAppStatusAC, SetAppStatusType} from '../../app/app-reducer'
import {todolistApi} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)


// thunks
export const loginTC = (data: any) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusType
    | SetAppErrorType
