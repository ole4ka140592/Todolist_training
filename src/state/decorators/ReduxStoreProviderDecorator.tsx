import {Provider} from "react-redux";
import {AppRootStateType} from "../store";
import React from "react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../taskReducer";
import {todolistsReducer} from "../todolistsReducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {appReducer, RequestStatusType} from "../../app/app-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

let initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: "idle", addedDate: "", order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: "idle", addedDate: "", order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistId1",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId:"todolistId2",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: "todolistId2",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""}
        ]
    },
    app: {
        status: 'idle',
        error: "ERROR" as string | null,
        isInitialized: false
    },
    login: {
        isLoggedIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) =>
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>

