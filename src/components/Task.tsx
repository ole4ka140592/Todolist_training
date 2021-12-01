import {EditableSpan} from "./EditableSpan";
import React, {ChangeEvent, useCallback} from "react";
import {TasksType} from "../AppWithRedux";
import {TaskPropsType} from "../Todolist";


type TasksPropsType = {
    task: TaskPropsType
    removeTask: (id: string) => void
    changeStatus: (isDone: boolean, id: string) => void
    updateTask: (id: string, title: string) => void

}

export const Task = React.memo(({task, removeTask, changeStatus, updateTask}: TasksPropsType) => {

    const onClickRemoveTask = (id: string) => {
        removeTask(id)
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        changeStatus(e.currentTarget.checked, id)
    }

    const updateTaskHandler = (id: string, title: string) => {
        updateTask(id, title)
    }

    return (
        <li key={task.id}>
            <button onClick={() => onClickRemoveTask(task.id)}>X</button>
            <input
                className={task.isDone ? "is-done" : ""}
                type="checkbox"
                checked={task.isDone}
                onChange={(e) => onChangeStatusHandler(e, task.id)}

            />

            <EditableSpan title={task.title} callBack={(title: string) => updateTaskHandler(task.id, title)}/>

        </li>)
})

