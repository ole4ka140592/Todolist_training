import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolist-api";



export default {
    title: 'Todolist/Task2ActiveChangeStatus',
    component: Task,
    args: {}
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = () => {
    const [task, setTask] = useState({id: "123", title: "React",  status: TaskStatuses.New,
        todoListId: "todolistId1", startDate: "", deadline: "", order: 0, addedDate: "",
        priority: TaskPriorities.Low, description: ""})
    const changeStatus = ()=> setTask({id: "123", title: "React", status: TaskStatuses.Completed,
        todoListId: "todolistId1", startDate: "", deadline: "", order: 0, addedDate: "",
        priority: TaskPriorities.Low, description: ""})


    return <Task
        task={task}
        removeTask={action("removeTask")}
        changeStatus={changeStatus}
        updateTask={action("updateTask")}
    />;
};

export const Task2Story = Template.bind({});
Task2Story.args = {};





