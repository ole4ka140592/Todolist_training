import React, {useCallback, useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodolistAC,
    changeFilterAC, filterType,
    removeTodolistAC,
    todolistsReducer,
    updateTitleTodolistAC
} from "./state/todolistsReducer";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./state/taskReducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";


export const AppWithReducer = () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todolistID2, title: "What to buy", filter: "all", addedDate: "", order: 0}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: v1(), title: "ReactJS", status: TaskStatuses.New, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: v1(), title: "Rest API", status: TaskStatuses.New, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: v1(), title: "GraphQL", status: TaskStatuses.New, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", status: TaskStatuses.Completed, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: v1(), title: "JS2", status: TaskStatuses.Completed, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: v1(), title: "ReactJS2", status: TaskStatuses.New, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: v1(), title: "Rest API2", status: TaskStatuses.New, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: v1(), title: "GraphQL2", status: TaskStatuses.New, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""}
        ]
    }) ;

    const removeTask = (id: string, todolistID: string) => {
        dispatchToTasks(removeTaskAC(id, todolistID))
    }

    const addTask = (title: string, todolistID: string) => {
        dispatchToTasks(addTaskAC(title, todolistID))
    }

    const changeStatus = (status: TaskStatuses, id: string, todolistID: string) => {
        dispatchToTasks(changeStatusTaskAC(status, id, todolistID))
    }

    const updateTask = (id: string, title: string, todolistID: string) => {
        dispatchToTasks(changeTitleTaskAC(title, id, todolistID))
    }

    const changeFilter = (value: filterType, todolistID: string) => {
        dispatchToTodolists(changeFilterAC(value, todolistID))
    }

    const addTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const updateTitleTodolist = (title: string, todolistID: string) => {
        dispatchToTodolists(updateTitleTodolistAC(title, todolistID))
    }

    const removeTodolist = (todolistID: string) => {
        dispatchToTodolists(removeTodolistAC(todolistID))
        dispatchToTasks(removeTodolistAC(todolistID))
    }

    return (
        <div className="App">

            <AddItemForm callBack={addTodolist}/>
            {todolists.map(m => {
                    let tasksForTodolist = tasks[m.id]

                    if (m.filter === 'active') {
                        tasksForTodolist = tasks[m.id].filter(f => TaskStatuses.New)
                    }

                    if (m.filter === 'completed') {
                        tasksForTodolist = tasks[m.id].filter(f => TaskStatuses.Completed)
                    }

                    return (
                        <Todolist
                            todolistID={m.id}
                            key={m.id}
                            title={m.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={m.filter}
                            updateTask={updateTask}
                            updateTitleTodolist={updateTitleTodolist}
                            removeTodolist={removeTodolist}
                        />)
                }
            )
            }


        </div>
    )


}


