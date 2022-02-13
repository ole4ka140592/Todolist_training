import {v1} from "uuid";
import {
    TodolistsActionType,
    addTodolistAC,
    changeFilterAC, filterType,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer, updateTitleTodolistAC
} from "./todolistsReducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    const todolist = {
        id: todolistId1, title: "New Todolist",
        filter: "all", addedDate: "", order: 0
    }

    const endState = todolistsReducer(startState, addTodolistAC(todolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("New Todolist");
});

test('correct filter of todolist should be changed', () => {

    let newFilter: filterType = "completed";

    const action: TodolistsActionType = {
        type: 'CHANGE-FILTER-TODOLIST',
        value: newFilter,
        todolistID: todolistId2,

    };

    const endState = todolistsReducer(startState, changeFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct todolist should change its name', () => {

    const todolist = {
        title: "New Todolist",
        filter: "all",
        addedDate: "",
        order: 0
    }

    const endState = todolistsReducer(startState, updateTitleTodolistAC(todolistId1, todolist.title));

    expect(endState[0].title).toBe("New Todolist");
    expect(endState[1].title).toBe("What to buy");
});

test('todolists should be set to the state', () => {

    let action = setTodolistsAC(startState);

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});



