import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITaskInterface {
   digits: string;
   method: string;
   result: string;
   operations: string[];
}

const initialState: ITaskInterface = {
   digits: '',
   method: '',
   result: '',
   operations: []
};

export const taskSlice = createSlice({
   name: 'task',
   initialState,
   reducers: {
      addDigit: (state, action: PayloadAction<string>) => {
         const { digits } = state;
         if (action.payload) {
            if (action.payload === 'backspace') {
               if (digits.length > 0)
                  return { ...state, digits: digits.slice(0, -1) };
            } else if (digits.length < 10) {
               if (action.payload === ',')
                  return { ...state, digits: digits.concat('.') };
               return { ...state, digits: digits.concat(action.payload) };
            }
         } else return { ...state, digits: '' };
      },
      addMethod: (state, action) => {
         return { ...state, method: action.payload };
      },
      addOperations: (state, action: PayloadAction<string>) => {
         const { operations } = state;
         if (action.payload) {
            if (operations) {
               return { ...state, operations: [...operations, action.payload] };
            } else return { ...state, operations: [action.payload] };
         } else return { ...state, operations: [] };
      },
      addResult: (state, action) => {
         return { ...state, result: action.payload };
      }
   }
});

export const {
   actions: { addDigit, addResult, addMethod, addOperations },
   reducer: taskReducer
} = taskSlice;
