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
        let todolistId = "222eab46-64f3-42cb-85fc-ba8168e6fbc4"
        taskApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "eada874d-16e5-4f89-821e-529c2784bd5b"
        let title = "!!!!!!!"
        taskApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "222eab46-64f3-42cb-85fc-ba8168e6fbc4"
        let taskId = "f98aa0dd-fd6b-4eac-a637-f208a9619447"
        let title = "111111111111"
        let description = "2222222"
        let status =  2
        let priority = 3
        let startDate = null
        let deadline = null
        taskApi.updateTask(todolistId, taskId,
            {title,
                description, status, priority, startDate, deadline})
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const DeleteTaskTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "222eab46-64f3-42cb-85fc-ba8168e6fbc4"
        let taskId = "7f6472a6-1eb8-4d31-a541-dde02e26d7bd"
        taskApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

