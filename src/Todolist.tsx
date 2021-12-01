import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {filterType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Task} from "./components/Task";

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: filterType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeStatus: (isDone: boolean, id: string, todolistID: string) => void
    filter: filterType
    todolistID: string
    updateTask: (id: string, title: string, todolistID: string) => void
    updateTitleTodolist: (title: string, todolistID: string) => void
    removeTodolist: (todolistID: string)=> void
}

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const changeFilterOnClickHandler = useCallback((value: filterType, todolistID: string) => {
        props.changeFilter(value, todolistID)
    },[props.changeFilter])

    // let [error, setError]=useState<null | string>(null)

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(title, props.todolistID)
    }, [props.addTask, props.todolistID])

    const updateTitleTodolistHandler = (title: string) => {
        props.updateTitleTodolist(title, props.todolistID)
    }

    const removeTodolistHandler=()=> {
        props.removeTodolist(props.todolistID)
    }

    const removeTask = (id: string, todolistID: string) => {
        props.removeTask(id, todolistID)
    }

    const changeStatus = (isDone: boolean, id: string, todolistID: string) => {
        props.changeStatus(isDone, id, todolistID)
    }

    const updateTask = (id: string, title: string, todolistID: string) => {
        props.updateTask(id, title, todolistID)
    }



    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(f => !f.isDone)
    }

    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(f => f.isDone)
    }


    return (
        <div>

            <h3>
                <EditableSpan title={props.title} callBack={updateTitleTodolistHandler}/>
                <button onClick={removeTodolistHandler}>X</button>
                {/*{props.title}*/}
            </h3>

            <AddItemForm callBack={addTaskHandler}/>

            <ul>
                {tasksForTodolist.map(t => <Task
                    key={t.id}
                    task={t}
                    removeTask={removeTask}
                    changeStatus={changeStatus}
                    updateTask={updateTask}
                    todolistID={props.todolistID}/>)
                    // <li key={t.id}>
                    //     <button  onClick={() => onClickRemoveTask(t.id, props.todolistID)}>X</button>
                    //     <input
                    //         className={t.isDone ? "is-done" : ""}
                    //         type="checkbox"
                    //         checked={t.isDone}
                    //         onChange={(e) => onChangeStatusHandler(e, t.id, props.todolistID)}
                    //
                    //     />
                    //
                    //     <EditableSpan title={t.title} callBack={(title: string) => updateTaskHandler(t.id, title)}/>
                    //     {/*<span >{t.title}</span>*/}
                    // </li>)
                }
            </ul>

            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={() => changeFilterOnClickHandler('all', props.todolistID)}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={() => changeFilterOnClickHandler('active', props.todolistID)}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={() => changeFilterOnClickHandler('completed', props.todolistID)}>Completed
                </button>
            </div>
        </div>
    )
})
