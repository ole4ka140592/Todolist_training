import React, {useReducer} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    todolistsReducer,
    updateTitleTodolistAC
} from "./state/todolistsReducer";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./state/taskReducer";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";

export type filterType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string,
    filter: filterType
}

export type TasksType = {
    [key: string]: Array<TaskPropsType>
}

export const AppWithRedux = () => {

    // let todolistID1 = v1()
    // let todolistID2 = v1()

    // let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    //     {id: todolistID1, title: "What to learn", filter: "all"},
    //     {id: todolistID2, title: "What to buy", filter: "all"}
    // ])

    // let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todolistID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: "HTML&CSS2", isDone: true},
    //         {id: v1(), title: "JS2", isDone: true},
    //         {id: v1(), title: "ReactJS2", isDone: false},
    //         {id: v1(), title: "Rest API2", isDone: false},
    //         {id: v1(), title: "GraphQL2", isDone: false},
    //     ]
    // });

    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = (id: string, todolistID: string) => {
        (removeTaskAC(id, todolistID))
    }

    const addTask = (title: string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID))
    }

    const changeStatus = (isDone: boolean, id: string, todolistID: string) => {
        dispatch(changeStatusTaskAC(isDone, id, todolistID))
    }

    const updateTask = (id: string, title: string, todolistID: string) => {
        dispatch(changeTitleTaskAC(title, id, todolistID))
    }

    const changeFilter = (value: filterType, todolistID: string) => {
        dispatch(changeFilterAC(value, todolistID))
    }

    const addTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)

    }

    const updateTitleTodolist = (title: string, todolistID: string) => {
        dispatch(updateTitleTodolistAC(title, todolistID))
    }

    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))

    }

    return (
        <div className="App">

            <AddItemForm callBack={addTodolist}/>
            {todolists.map(m => {
                    let tasksForTodolist = tasks[m.id]

                    if (m.filter === 'active') {
                        tasksForTodolist = tasks[m.id].filter(f => !f.isDone)
                    }

                    if (m.filter === 'completed') {
                        tasksForTodolist = tasks[m.id].filter(f => f.isDone)
                    }

                    return (
                        <Todolist
                            todolistID={m.id}
                            key={m.id}
                            title={m.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={m.filter}
                            updateTask={updateTask}
                            updateTitleTodolist={updateTitleTodolist}
                            removeTodolist={removeTodolist}
                        />)
                }
            )
            }


        </div>
    )


}

