import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '3ffd8bee-6a2a-4b2d-9367-b8070697f4c5'
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

//api
export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodolistType>>("todo-lists")
    },
    createTodo(title: string) {
        return instance.post<BaseTodolistType<{ item: TodolistType }>>("todo-lists", {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<BaseTodolistType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<BaseTodolistType>(`todo-lists/${todolistId}`, {title})
    },

    getTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<BaseTaskType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateModelTaskType) {
        return instance.put<BaseTaskType<{ item: UpdateModelTaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`,
            model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<BaseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    login(data: LoginParamsType) {
        return instance.post<BaseTaskType<{userId: number}>>("auth/login", data)
    }
}


//types
type LoginParamsType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string
}


export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}
export type BaseTodolistType<T = {}> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: T
}
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type GetTaskResponseType = {
    items: Array<TaskType>
    error: null | string
    totalCount: number
}
export type UpdateModelTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
}
type BaseTaskType<T = {}> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: T
}





// type CreateTaskType = {
//     fieldsErrors: Array<string>
//     messages: Array<string>
//     resultCode: number
//     data: { item: TaskType }
// }
//
// type UpdateTaskType = {
//     fieldsErrors: Array<string>
//     messages: Array<string>
//     resultCode: number
//     data: { item: UpdateModelTaskType }
// }
//
// type DeleteTaskType = {
//     fieldsErrors: Array<string>
//     messages: Array<string>
//     resultCode: number
//     data: {}
// }



