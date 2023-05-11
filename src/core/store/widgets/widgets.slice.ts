import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IWidgetInterface {
    widgets: string[];
}

const initialState: IWidgetInterface = {
    widgets: []
};

export const widgetsSlice = createSlice({
    name: 'widgets',
    initialState,
    reducers: {
        addWidget: (state, action: PayloadAction<string>) => {
            const { widgets } = state;
            return { ...state, widgets: [...widgets, action.payload] };
        }
    }
});

export const { actions: addWidget, reducer: widgetReducer } = widgetsSlice;