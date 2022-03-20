import {setAppErrorAC, SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {BaseTodolistType} from "../api/todolist-api";

export const handleServerNetworkError = (dispatch: Dispatch<SetAppStatusType|SetAppErrorType>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T>(dispatch: Dispatch<SetAppStatusType|SetAppErrorType>, data: BaseTodolistType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

