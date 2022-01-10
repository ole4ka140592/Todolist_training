import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {Container, Grid, Paper} from "@material-ui/core";


export type filterType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string,
    filter: filterType
}

export type TasksType = {
    [key: string]: Array<TaskPropsType>
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const changeFilter = (value: filterType, todolistID: string) => {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
    }

    const removeTask = (id: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
    }

    const addTask = (title: string, todolistID: string) => {
        let newTitle = {id: v1(), title: title, isDone: true}
        setTasks({...tasks, [todolistID]: [newTitle, ...tasks[todolistID]]})
    }

    const changeStatus = (isDone: boolean, id: string, todolistID: string) => {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].map
            (m => m.id === id ? {...m, isDone: isDone} : m)
        })
    }

    const addTodolist = (title: string) => {
        let newTodolistID = v1()
        let newTodolist: TodolistsType = {id: newTodolistID, title: title, filter: "all"}
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
                            tasksForTodolist = tasks[m.id].filter(f => !f.isDone)
                        }

                        if (m.filter === 'completed') {
                            tasksForTodolist = tasks[m.id].filter(f => f.isDone)
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
