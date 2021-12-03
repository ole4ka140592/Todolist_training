import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";



export default {
    title: 'Todolist/Task2ActiveChangeStatus',
    component: Task,
    args: {}
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = () => {
    const [task, setTask] = useState({id: "123", title: "React", isDone: false})
    const changeStatus = ()=> setTask({id: "123", title: "React", isDone: !task.isDone})


    return <Task
        task={task}
        removeTask={action("removeTask")}
        changeStatus={changeStatus}
        updateTask={action("updateTask")}
    />;
};

export const Task2Story = Template.bind({});
Task2Story.args = {};





