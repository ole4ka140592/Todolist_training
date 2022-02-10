import {EditableSpan} from "./EditableSpan";
import React, {ChangeEvent} from "react";
import {Delete} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {TaskStatuses, TaskType} from "../api/todolist-api";


type TasksPropsType = {
    task: TaskType
    removeTask: (id: string) => void
    changeStatus: (status: TaskStatuses, id: string) => void
    updateTask: (id: string, title: string) => void

}

export const Task = React.memo(({task, removeTask, changeStatus, updateTask}: TasksPropsType) => {

    const onClickRemoveTask = (id: string) => {
        removeTask(id)
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        let newIsDoneValue = e.currentTarget.checked
        changeStatus(newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.Completed, id)
    }

    const updateTaskHandler = (id: string, title: string) => {
        updateTask(id, title)
    }

    return (
        <li key={task.id}>

            <input
                className={task.status === TaskStatuses.Completed ? "is-done" : ""}
                type="checkbox"
                checked={task.status === TaskStatuses.Completed}
                onChange={(e) => onChangeStatusHandler(e, task.id)}

            />


            <EditableSpan title={task.title} callBack={(title: string) => updateTaskHandler(task.id, title)}/>
            {/*<button onClick={() => onClickRemoveTask(task.id)}>X</button>*/}
            <IconButton aria-label="delete">
                <Delete onClick={() => onClickRemoveTask(task.id)}/>
            </IconButton>

        </li>)
})

