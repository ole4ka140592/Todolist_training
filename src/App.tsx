import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterType = 'all' | 'active' | 'completed'

export type todolistsType = {
    id: string
    title: string,
    filter: filterType
}

function App() {

    // let [tasks, setTasks] = useState([
    //         {id: v1(), title: 'CSS&HTML', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'React', isDone: false},
    //         {id: v1(), title: 'PHP', isDone: true},
    //         {id: v1(), title: 'Java', isDone: true},
    //         {id: v1(), title: 'Python', isDone: false}
    //     ]
    // )

    let todolistID1=v1()
    let todolistID2= v1()

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
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

    // let [filter, setFilter] = useState<filterType>('all')


    const changeFilter = (value: filterType, todolistID: string) => {
        // setTodolists(...todolists.find(f => f.id===todolistID? {...f, filter:value} : f))

        // let currentTodolist = todolists.find(f => f.id === todolistID)
        // if (currentTodolist) {
        //     currentTodolist.filter = value
        //     setTodolists([...todolists])
        //     console.log(currentTodolist.id)
        // }

        setTodolists(todolists.map(m=> m.id===todolistID? {...m, filter: value} : m))

    }

    const removeTask = (id: string, todolistID: string) => {

        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
    }

    const addTask = (title: string, todolistID: string) => {
        let newTitle = {id: v1(), title: title, isDone: true}

        setTasks({...tasks, [todolistID]: [newTitle,...tasks[todolistID]]})
    }

    const changeStatus = (isDone: boolean, id: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map
            (m=> m.id===id ? {...m, isDone:isDone} : m)})
    }

    return (
        <div className="App">
            {todolists.map(m => {
                    let tasksForTodolist = tasks[m.id]

                    if (m.filter === 'active') {
                        tasksForTodolist = tasks[m.id].filter(f => !f.isDone)
                    }

                    if (m.filter === 'completed') {
                        tasksForTodolist = tasks[m.id].filter(f => f.isDone)
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
                        />)
                }
            )
            }


        </div>
    )


}

export default App;
