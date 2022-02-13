import {tasksReducer} from './taskReducer';
import {todolistsReducer} from './todolistsReducer';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

//все типы actions для всего App
// export type AppActionsType = TodolistsActionType | TasksActionType

// @ts-ignore
window.store = store;