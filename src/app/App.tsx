import React from 'react';
import './App.css';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import Container from "@material-ui/core/Container";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {RequestStatusType} from "./app-reducer";
import LinearProgress from "@material-ui/core/LinearProgress";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Box} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import {Toolbar, Typography} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@material-ui/icons/Menu";



export const App = () => {

    const status = useSelector<AppRootStateType, RequestStatusType>(state=> state.app.status)

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            Todolists
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <ErrorSnackbar/>
            {status==="loading" && <LinearProgress color="secondary" />}
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}



