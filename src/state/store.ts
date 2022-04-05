import {tasksReducer} from './taskReducer';
import {todolistsReducer} from './todolistsReducer';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {appReducer} from "../app/app-reducer";
import {loginReducer} from "../features/Login/loginReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    login: loginReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

//все типы actions для всего App
// export type AppActionsType = TodolistsActionType | TasksActionType | AppReducerActionsType

// @ts-ignore
window.store = store;