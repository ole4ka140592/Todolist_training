import React, {useState} from 'react';
import '../app/App.css';
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {Container, Grid} from "@material-ui/core";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";
import {filterType, TodolistDomainType} from "../state/todolistsReducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: todolistID2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""
            },
            {
                id: v1(), title: "ReactJS", status: TaskStatuses.New, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""
            },
            {
                id: v1(), title: "Rest API", status: TaskStatuses.New, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""
            },
            {
                id: v1(), title: "GraphQL", status: TaskStatuses.New, todoListId: todolistID1,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""
            },
        ],
        [todolistID2]: [
            {
                id: v1(), title: "HTML&CSS2", status: TaskStatuses.Completed, todoListId: todolistID2,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""
            },
            {
                id: v1(), title: "JS2", status: TaskStatuses.Completed, todoListId: todolistID2,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""
            },
            {
                id: v1(), title: "ReactJS2", status: TaskStatuses.New, todoListId: todolistID2,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""
            },
            {
                id: v1(), title: "Rest API2", status: TaskStatuses.New, todoListId: todolistID2,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""
            },
            {
                id: v1(), title: "GraphQL2", status: TaskStatuses.New, todoListId: todolistID2,
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""
            },
        ]
    });

    const changeFilter = (value: filterType, todolistID: string) => {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
    }

    const removeTask = (id: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
    }

    const addTask = (title: string, todolistID: string) => {
        let newTitle = {
            id: v1(), title: title, status: TaskStatuses.New, todoListId: todolistID,
            startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""
        }
        setTasks({...tasks, [todolistID]: [newTitle, ...tasks[todolistID]]})
    }

    const changeStatus = (todolistID: string, id: string, status: TaskStatuses) => {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].map
            (m => m.id === id ? {...m, status: status} : m)
        })
    }

    const addTodolist = (title: string) => {
        let newTodolistID = v1()
        let newTodolist: TodolistDomainType = {id: newTodolistID, title: title, filter: "all", addedDate: "", order: 0, entityStatus: "idle"}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistID]: []
        })
    }

    const updateTask = (id: string, title: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === id ? {...m, title: title} : m)})
    }

    const updateTitleTodolist = (title: string, todolistID: string) => {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, title: title} : m))
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(f => f.id !== todolistID))
    }


    return (
        <div className="App">
            <Container fixed>
                <Grid container>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(m => {
                            let tasksForTodolist = tasks[m.id]

                            if (m.filter === 'active') {
                                tasksForTodolist = tasks[m.id].filter(f => TaskStatuses.New)
                            }

                            if (m.filter === 'completed') {
                                tasksForTodolist = tasks[m.id].filter(f => TaskStatuses.Completed)
                            }

                            return (
                                <Grid item>
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
                                    />
                                </Grid>)
                        }
                    )
                    }
                </Grid>
            </Container>
        </div>
    )


}

export default App;
