import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodolistAC,
    changeFilterAC, filterType,
    removeTodolistAC, setTodolistsTC, TodolistDomainType,
    updateTitleTodolistAC
} from "./state/todolistsReducer";
import {
    addTaskTC,
    changeStatusTaskAC,
    changeTitleTaskAC, removeTaskTC,

} from "./state/taskReducer";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import {TaskStatuses} from "./api/todolist-api";
import {TasksStateType} from "./App";


export const AppWithRedux = () => {

    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    const removeTask = useCallback((id: string, todolistID: string) => {
        // dispatch(removeTaskTC(todolistID, id))
        // // const action = removeTaskAC(id, todolistID);
        dispatch(removeTaskTC(todolistID, id));
    }, [dispatch])

    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskTC(todolistID, title))
    }, [dispatch])

    const changeStatus = useCallback((status: TaskStatuses, id: string, todolistID: string) => {
        dispatch(changeStatusTaskAC(status, id, todolistID))
    }, [dispatch])

    const updateTask = useCallback((id: string, title: string, todolistID: string) => {
        dispatch(changeTitleTaskAC(title, id, todolistID))
    }, [dispatch])

    const changeFilter = useCallback((value: filterType, todolistID: string) => {
        dispatch(changeFilterAC(value, todolistID))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const updateTitleTodolist = useCallback((title: string, todolistID: string) => {
        dispatch(updateTitleTodolistAC(title, todolistID))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }, [dispatch])

    return (
        <div className="App">
            <AddItemForm callBack={addTodolist}/>
            {todolists.map(m => {

                    return (
                        <Todolist
                            todolistID={m.id}
                            key={m.id}
                            title={m.title}
                            tasks={tasks[m.id]}
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


