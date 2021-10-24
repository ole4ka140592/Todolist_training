import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType} from "./App";

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string) => void
    changeFilter: (value: filterType) => void
    addTask: (title: string)=> void
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

    const changeFilterOnClickHandler=(value: filterType)=> {
        props.changeFilter(value)
    }

    const onClickAddTaskHandler=(title:string)=> {
        props.addTask(title)
        setTitle("")
    }

    let [title, setTitle]= useState("")

    const onChangeHandler=(e: ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler=(e: KeyboardEvent<HTMLInputElement>)=> {
        if (e.key==="Enter") {
            props.addTask(title)
            setTitle("")
        }
    }

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
                />
                <button onClick={()=>onClickAddTaskHandler(title)}>+</button>
            </div>

            <ul>
                {props.tasks.map(t =>
                    <li>
                        <button onClick={() => onClickRemoveTask(t.id)}>X</button>
                        <input type="checkbox" checked={t.isDone}/><span>{t.title}</span></li>)
                }
            </ul>

            <div>
                <button onClick={() => changeFilterOnClickHandler('all')}>All</button>
                <button onClick={() => changeFilterOnClickHandler('active')}>Active</button>
                <button onClick={() => changeFilterOnClickHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}
