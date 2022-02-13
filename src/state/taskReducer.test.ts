import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, setTasksAC, tasksReducer} from "./taskReducer";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolistsReducer";
import {TaskPriorities, TaskStatuses, UpdateModelTaskType} from "../api/todolist-api";
import {TasksStateType} from "../App";

let startState: TasksStateType

beforeEach(()=> {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""}
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""},
            {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2",
                startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""}
        ]
    });
});


test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        description: "",
        title: "juce",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "12345",
        todoListId: "todolistId2",
        order: 0,
        addedDate: ""});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toEqual(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})


test('status of specified task should be changed', () => {
    const task: UpdateModelTaskType = {
        title: "rice",
        description: "",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        deadline: "",
        startDate: ""
    }

    const action = changeStatusTaskAC("todolistId2", "2", task.status);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});


test('title of specified task should be changed', () => {
    const task: UpdateModelTaskType = {
        title: "rice",
        description: "",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        deadline: "",
        startDate: ""
    }
    const action = changeTitleTaskAC("todolistId2", "2",  task.title);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("rice");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({id: "todolistId3",
        title: "new todolist",
        addedDate: "",
        order: 0});

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistsAC([
        {id: "1", title: "What to learn", addedDate: "", order: 0},
        {id: "2", title: "What to buy", addedDate: "", order: 0}
    ]);

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["1"]).toStrictEqual([]);
    expect(endState["2"]).toStrictEqual([]);
});

test('tasks should be added for todolist', () => {

    const action = setTasksAC("todolistId1", startState["todolistId1"]);

    const endState = tasksReducer({
        "todolistId1": [],
        "todolistId2": []
    }, action)

    expect(endState["todolistId1"].length).toBe(3);
});



