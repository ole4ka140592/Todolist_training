import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";


export default {
    title: 'Todolist/Task',
    component: Task,
    args: {
        removeTask: action("removeTask"),
        changeStatus: action("changeStatus"),
        updateTask: action("updateTask")
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    task: {id: "123", title: "React", isDone: true},
};

export const TaskNotDoneStory = Template.bind({});
TaskNotDoneStory.args = {
    task: {id: "123", title: "React", isDone: false},

};





