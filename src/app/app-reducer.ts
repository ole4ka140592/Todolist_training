const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as NullableType<string>
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}

        case "APP/SET-ERROR":
            return {...state, error: action.error}

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


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type NullableType<T> = null | T

export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type AppReducerActionsType = SetAppStatusType | SetAppErrorType