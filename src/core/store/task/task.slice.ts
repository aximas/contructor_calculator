import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ITaskInterface {
    digits: string,
    methods: string,
    result: string
}

const initialState: ITaskInterface = {
    digits: '',
    methods: '',
    result: ''
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addDigit: (state, action) => {
            return { ...state, digits: action.payload };
        },
        addMethod: (state, action) => {
            return { ...state, methods: action.payload };
        },
        addResult: (state, action) => {
            return { ...state, result: action.payload };
        }
    }
});

export const { actions: { addDigit, addResult, addMethod }, reducer: taskReducer } = taskSlice;