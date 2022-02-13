import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../components/AddItemForm";
import {EditableSpan} from "../components/EditableSpan";
import {Task} from "../components/Task";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {filterType} from "../state/todolistsReducer";
import {setTasksTC} from "../state/taskReducer";
import {useDispatch} from "react-redux";

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: filterType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeStatus: (todolistID: string, id: string, status: TaskStatuses) => void
    filter: filterType
    todolistID: string
    updateTask: (todolistID: string, id: string, title: string) => void
    updateTitleTodolist: (title: string, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
}

// export type TaskPropsType = {
//     id: string
//     title: string
//     isDone: boolean
// }

export const Todolist = React.memo((props: TodolistPropsType) => {
    const dispatch = useDispatch()

    useEffect(()=> {
       dispatch(setTasksTC(props.todolistID))
    }, [])

    const changeFilterOnClickHandler = useCallback((value: filterType, todolistID: string) => {
        props.changeFilter(value, todolistID)
    }, [props.changeFilter])

    // let [error, setError]=useState<null | string>(null)

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(title, props.todolistID)
    }, [props.addTask, props.todolistID])

    const updateTitleTodolistHandler = (title: string) => {
        props.updateTitleTodolist(title, props.todolistID)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const removeTask = useCallback((id: string) => {
        props.removeTask(id, props.todolistID)
    }, [])

    const changeStatus = useCallback((status: TaskStatuses, id: string) => {
        props.changeStatus(props.todolistID, id, status)
    }, [])

    const updateTask = useCallback((id: string, title: string) => {
        props.updateTask(props.todolistID, id, title)
    }, [])


    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(f => TaskStatuses.New)
    }

    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(f => TaskStatuses.Completed)
    }


    return (
        <div>

            <h3>
                <EditableSpan title={props.title} callBack={updateTitleTodolistHandler}/>

                <IconButton aria-label="delete">
                    <Delete onClick={removeTodolistHandler}/>
                </IconButton>
                {/*<button onClick={removeTodolistHandler}>X</button>*/}
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
                />)

                }
            </ul>

            <div>
                <Button variant={props.filter === "all" ? "contained" : "outlined"}
                        onClick={() => changeFilterOnClickHandler('all', props.todolistID)}>
                    All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "outlined"}
                        onClick={() => changeFilterOnClickHandler('active', props.todolistID)}>
                    Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "outlined"}
                        onClick={() => changeFilterOnClickHandler('completed', props.todolistID)}>
                    Completed
                </Button>
            </div>
        </div>
    )
})
