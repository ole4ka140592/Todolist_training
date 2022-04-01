import React from 'react';
import './App.css';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import Container from "@material-ui/core/Container";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {RequestStatusType} from "./app-reducer";
import LinearProgress from "@material-ui/core/LinearProgress";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

import AppBar from "@mui/material/AppBar";
import {Toolbar, Typography} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import {Button} from "@mui/material";
import {Login} from "../features/Login/Login";
import {Route, Routes} from "react-router-dom";




export const App = () => {

    const status = useSelector<AppRootStateType, RequestStatusType>(state=> state.app.status)

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
                    <Route path="/login" element={<Login/>}/>

                </Routes>
            </Container>
        </div>
    )
}



