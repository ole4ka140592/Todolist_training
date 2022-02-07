import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '3ffd8bee-6a2a-4b2d-9367-b8070697f4c5'
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    headers: {
        'API-KEY': '3ffd8bee-6a2a-4b2d-9367-b8070697f4c5'
    },
    withCredentials: true
})

export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodoType>>("todo-lists")
    },
    createTodo(title: string) {
        return instance.post<BaseTodolistType<{item: TodoType}>>("todo-lists", {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<BaseTodolistType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<BaseTodolistType>(`todo-lists/${todolistId}`, {title})
    }
}

export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<BaseTaskType<{item: TaskResponseType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },

    updateTask(todolistId: string, taskId: string, model: UpdateModelTaskType) {
        return instance.put<BaseTaskType<{item: UpdateModelTaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<BaseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

type TodoType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type BaseTodolistType<T = {}> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: T
}

type TaskResponseType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTaskResponseType = {
    items: Array<TaskResponseType>
    error: null | string
    totalCount: number
}

type UpdateModelTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

type BaseTaskType<T = {}> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: T
}

type CreateTaskType = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: {item: TaskResponseType}
}

type UpdateTaskType = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: {item: UpdateModelTaskType}
}

type DeleteTaskType = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: {}
}



