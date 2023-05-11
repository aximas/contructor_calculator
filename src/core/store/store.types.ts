import { store } from './stote';

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
