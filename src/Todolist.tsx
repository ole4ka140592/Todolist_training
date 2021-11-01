import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType} from "./App";
import {AddItemForm} from "./components/AddItemForm";

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: filterType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeStatus: (isDone: boolean, id: string, todolistID: string) => void
    filter: filterType
    todolistID: string
}

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    const onClickRemoveTask = (id: string, todolistID: string) => {
        props.removeTask(id, props.todolistID)
    }

    const changeFilterOnClickHandler = (value: filterType, todolistID: string) => {
        props.changeFilter(value, todolistID)
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string, todolistID: string) => {
        props.changeStatus(e.currentTarget.checked, id, props.todolistID)
    }

    // let [error, setError]=useState<null | string>(null)

    const addTaskHandler=(title: string)=> {
        props.addTask(title, props.todolistID)
    }

    return (
        <div>
            <h3>
                {props.title}
            </h3>

            <AddItemForm callBack={addTaskHandler}/>

            <ul>
                {props.tasks.map(t =>
                    <li>
                        <button onClick={() => onClickRemoveTask(t.id, props.todolistID)}>X</button>
                        <input
                            className={t.isDone ? "is-done" : ""}
                            type="checkbox"
                            checked={t.isDone}
                            onChange={(e) => onChangeStatusHandler(e, t.id, props.todolistID)}
                        />
                        <span >{t.title}</span>
                    </li>)
                }
            </ul>

            <div>
                 <button className={props.filter==="all" ? "active-filter" : ""}
                        onClick={() => changeFilterOnClickHandler('all', props.todolistID)}>All</button>
                <button className={props.filter==="active" ? "active-filter" : ""}
                    onClick={() => changeFilterOnClickHandler('active', props.todolistID)}>Active</button>
                <button className={props.filter==="completed" ? "active-filter" : ""}
                    onClick={() => changeFilterOnClickHandler('completed', props.todolistID)}>Completed</button>
            </div>
        </div>
    )
}
