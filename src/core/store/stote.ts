import { configureStore } from '@reduxjs/toolkit';
import { widgetReducer } from './widgets/widgets.slice';
import { taskReducer } from './task/task.slice';

export const store = configureStore({
    reducer: {
        widgets: widgetReducer,
        task: taskReducer
    }
});