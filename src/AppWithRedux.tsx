import React, {useCallback, useReducer} from 'react';
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

    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask =useCallback((id: string, todolistID: string) => {
        (removeTaskAC(id, todolistID))
    },[dispatch])

    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID))
    }, [dispatch])

    const changeStatus =useCallback((isDone: boolean, id: string, todolistID: string) => {
        dispatch(changeStatusTaskAC(isDone, id, todolistID))
    },[dispatch])

    const updateTask =useCallback((id: string, title: string, todolistID: string) => {
        dispatch(changeTitleTaskAC(title, id, todolistID))
    },[dispatch])

    const changeFilter =useCallback((value: filterType, todolistID: string) => {
        dispatch(changeFilterAC(value, todolistID))
    },[dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const updateTitleTodolist =useCallback((title: string, todolistID: string) => {
        dispatch(updateTitleTodolistAC(title, todolistID))
    },[dispatch])

    const removeTodolist =useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    },[dispatch])

    return (
        <div className="App">b
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


