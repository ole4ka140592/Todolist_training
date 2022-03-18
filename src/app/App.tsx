import React from 'react';
import './App.css';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import Container from "@material-ui/core/Container";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {RequestStatusType} from "./app-reducer";
import LinearProgress from "@material-ui/core/LinearProgress";



export const App = () => {

    const status = useSelector<AppRootStateType, RequestStatusType>(state=> state.app.status)
    return (
        <div>
            {status==="loading" && <LinearProgress color="secondary" />}
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}



