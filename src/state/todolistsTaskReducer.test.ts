import {TasksType, TodolistsType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./taskReducer";

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistsType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistID);
    expect(idFromTodolists).toBe(action.todolistID);
});




