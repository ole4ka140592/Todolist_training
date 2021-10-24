import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType} from "./App";

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string) => void
    changeFilter: (value: filterType) => void
    addTask: (title: string) => void
    changeStatus: (isDone: boolean, id: string) => void
    filter: filterType
}

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    const onClickRemoveTask = (id: string) => {
        props.removeTask(id)
    }

    const changeFilterOnClickHandler = (value: filterType) => {
        props.changeFilter(value)
    }

    const onClickAddTaskHandler = (title: string) => {
        if (title.trim() !== "") {
        props.addTask(title)
        setTitle("")
        } else {
            setError("Title is required")
        }
    }

    let [title, setTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError("")
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && title.trim() !== "") {
            props.addTask(title)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        props.changeStatus(e.currentTarget.checked, id)
    }

    let [error, setError]=useState<null | string>(null)

    return (
        <div>
            <h3>
                {props.title}
            </h3>

            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ""}
                />
                <button onClick={() => onClickAddTaskHandler(title)}>+</button>
                {error? <div className='error-message'>{error}</div> : ""}
            </div>

            <ul>
                {props.tasks.map(t =>
                    <li>
                        <button onClick={() => onClickRemoveTask(t.id)}>X</button>
                        <input
                            className={t.isDone ? "is-done" : ""}
                            type="checkbox"
                            checked={t.isDone}
                            onChange={(e) => onChangeStatusHandler(e, t.id)}
                        />
                        <span >{t.title}</span>
                    </li>)
                }
            </ul>

            <div>
                <button className={props.filter==="all" ? "active-filter" : ""}
                        onClick={() => changeFilterOnClickHandler('all')}>All</button>
                <button className={props.filter==="active" ? "active-filter" : ""}
                    onClick={() => changeFilterOnClickHandler('active')}>Active</button>
                <button className={props.filter==="completed" ? "active-filter" : ""}
                    onClick={() => changeFilterOnClickHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}
