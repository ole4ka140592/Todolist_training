import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
            {id: v1(), title: 'CSS&HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'PHP', isDone: true},
            {id: v1(), title: 'Java', isDone: true},
            {id: v1(), title: 'Python', isDone: false}
        ]
    )

    let [filter, setFilter] = useState<filterType>('all')

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(f=> !f.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(f=> f.isDone)
    }

    const changeFilter = (value: filterType)=> {
        setFilter(value)
    }

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(f=> f.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (title: string)=> {
        let newTitle={id: v1(), title: title, isDone: true}
        let newTasks=[newTitle,...tasks]
        setTasks(newTasks)
    }

    const changeStatus=(isDone: boolean, id: string)=> {
        setTasks(tasks.map(m=> m.id === id ? {...m, isDone: isDone} : m))
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    )


}

export default App;
