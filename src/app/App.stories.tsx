import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {ReduxStoreProviderDecorator} from "../state/decorators/ReduxStoreProviderDecorator";
import {App} from "./App";


export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App/>

export const AppWithReduxStory = Template.bind({});

AppWithReduxStory.args = {};


