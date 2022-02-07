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
        return instance.post<BaseType<{item: TodoType}>>("todo-lists", {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<BaseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<BaseType>(`todo-lists/${todolistId}`, {title})
    }
}

export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },

    postTasks(todolistId: string, title: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    },


    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<BaseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

type TodoType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type BaseType<T = {}> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: T
}

type GetTaskResponseType = {
    error: null | string
    items: Array<TaskResponseType>
    totalCount: number
}

type TaskResponseType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

