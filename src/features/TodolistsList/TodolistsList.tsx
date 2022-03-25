import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
    addTodolistTC,
    changeFilterAC,
    filterType, removeTodolistTC,
    setTodolistsTC,
    TodolistDomainType, updateTitleTodolistTC
} from "../../state/todolistsReducer";
import {TasksStateType} from "../../trash/App";
import React, {useCallback, useEffect} from "react";
import {addTaskTC, changeStatusTC, removeTaskTC, updateTaskTitleTC} from "../../state/taskReducer";
import {TaskStatuses} from "../../api/todolist-api";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Container, Grid, Toolbar, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {Todolist} from "./Todolist/Todolist";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import {Box} from "@mui/material";
import classes from "./TodolistsList.module.css";

export const TodolistsList = () => {
    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
debugger
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    const removeTask = useCallback((id: string, todolistID: string) => {
        // dispatch(removeTaskTC(todolistID, id))
        // // const action = removeTaskAC(id, todolistID);
        dispatch(removeTaskTC(todolistID, id));
    }, [dispatch])

    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskTC(todolistID, title))
    }, [dispatch])

    const changeStatus = useCallback((todolistID: string, id: string, status: TaskStatuses) => {
        dispatch(changeStatusTC(todolistID, id, status))
        // dispatch(changeStatusTaskAC(todolistID, id, status))
    }, [dispatch])

    const updateTask = useCallback((todolistID: string, id: string, title: string) => {
        dispatch(updateTaskTitleTC(todolistID, id, title))
        // dispatch(changeTitleTaskAC(title, id, todolistID))
    }, [dispatch])

    const changeFilter = useCallback((value: filterType, todolistID: string) => {
        dispatch(changeFilterAC(value, todolistID))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
        // let action = addTodolistAC(title)
        // dispatch(action)
    }, [dispatch])

    const updateTitleTodolist = useCallback((title: string, todolistID: string) => {
        dispatch(updateTitleTodolistTC(title, todolistID))
        // dispatch(updateTitleTodolistAC(title, todolistID))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID))
        // dispatch(removeTodolistAC(todolistID))
    }, [dispatch])

    return (
        <div className="App">

            <Container fixed>

                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(m => {

                            return (
                                // <div className={classes.todo}>
                                    <Grid item key={m.id}>
                                        <Paper style={{padding: '10px', width: '300px', display:"flex-row", margin: "20px"}}>
                                            <Todolist
                                                todolistID={m.id}
                                                key={m.id}
                                                title={m.title}
                                                entityStatus={m.entityStatus}
                                                tasks={tasks[m.id]}
                                                removeTask={removeTask}
                                                changeFilter={changeFilter}
                                                addTask={addTask}
                                                changeStatus={changeStatus}
                                                filter={m.filter}
                                                updateTask={updateTask}
                                                updateTitleTodolist={updateTitleTodolist}
                                                removeTodolist={removeTodolist}
                                            />
                                        </Paper>
                                    </Grid>
                                // </div>
                            )
                        }
                    )
                    }
                </Grid>
            </Container>
        </div>
    )
}