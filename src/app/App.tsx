import React, {useEffect} from 'react';
import './App.css';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import Container from "@material-ui/core/Container";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import LinearProgress from "@material-ui/core/LinearProgress";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

import AppBar from "@mui/material/AppBar";
import {Toolbar, Typography} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import {Button} from "@mui/material";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";


export const App = () => {

    const status = useSelector<AppRootStateType, RequestStatusType>(state=> state.app.status)
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    useEffect( ()=> {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
       return <LinearProgress color="secondary" />
    }


    return (
        <div >
            <ErrorSnackbar/>
            {/*<Box sx={{flexGrow: 1}}>*/}
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" >

                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            {/*</Box>*/}

            {status==="loading" && <LinearProgress color="secondary" />}
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    )
}



