import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {AppWithRedux} from "./AppWithRedux";
import {store} from "./state/store";
import {Provider} from "react-redux";


export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = (args) =>
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>;

export const AppWithReduxStory = Template.bind({});

AppWithReduxStory.args = {};


