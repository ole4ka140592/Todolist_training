import {EditableSpan} from "./EditableSpan";
import React, {ChangeEvent, useCallback} from "react";
import {TasksType} from "../AppWithRedux";
import {TaskPropsType} from "../Todolist";


type TasksPropsType = {
    task: TaskPropsType
    removeTask: (id: string, todolistID: string) => void
    changeStatus: (isDone: boolean, id: string, todolistID: string) => void
    updateTask: (id: string, title: string, todolistID: string) => void
    todolistID: string
}

export const Task = React.memo(({task, removeTask, changeStatus, updateTask, todolistID}: TasksPropsType) => {

    const onClickRemoveTask = (id: string, todolistID: string) => {
        removeTask(id, todolistID)
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string, todolistID: string) => {
        changeStatus(e.currentTarget.checked, id, todolistID)
    }

    const updateTaskHandler = (id: string, title: string) => {
        updateTask(id, title, todolistID)
    }

    return (
        <li key={task.id}>
            <button onClick={() => onClickRemoveTask(task.id, todolistID)}>X</button>
            <input
                className={task.isDone ? "is-done" : ""}
                type="checkbox"
                checked={task.isDone}
                onChange={(e) => onChangeStatusHandler(e, task.id, todolistID)}

            />

            <EditableSpan title={task.title} callBack={(title: string) => updateTaskHandler(task.id, title)}/>

        </li>)
})

