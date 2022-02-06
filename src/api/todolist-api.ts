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
        return instance.get("todo-lists")
    },
    createTodo(title: string) {
        return instance.post("todo-lists",
            {title}, settings)
    },
    deleteTodo(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, {title})
    }
}