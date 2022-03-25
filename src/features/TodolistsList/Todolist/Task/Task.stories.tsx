import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolist-api";


export default {
    title: 'Todolist/Task',
    component: Task,
    args: {
        removeTask: action("removeTask"),
        changeStatus: action("changeStatus"),
        updateTask: action("updateTask"),
        todoListId: "1"
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    task: {id: "123", title: "React", status: TaskStatuses.Completed, todoListId: "todolistId1",
        startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""}
};

export const TaskNotDoneStory = Template.bind({});
TaskNotDoneStory.args = {
    task: {id: "123", title: "React", status: TaskStatuses.New, todoListId: "todolistId1",
    startDate: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, description: ""}
};





