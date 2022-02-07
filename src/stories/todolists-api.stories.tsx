import React, {useEffect, useState} from 'react'
import {taskApi, todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodos()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = "xxx"
        todolistApi.createTodo(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "6216083d-59cf-4162-88d5-f6415827b75d"
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "fc724001-24c3-4f5b-aa21-b9732096ada5"
        let title = "MIRA"
        todolistApi.updateTodoTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "fe0ec3d1-164d-4f71-b0ea-054b51d9f881"
        taskApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const PostTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "fe0ec3d1-164d-4f71-b0ea-054b51d9f881"
        let title = "JS3333"
        taskApi.postTasks(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTaskTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "fe0ec3d1-164d-4f71-b0ea-054b51d9f881"
        let taskId = "9d0037de-2886-4306-a76c-3a3890f0ba25"
        taskApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}