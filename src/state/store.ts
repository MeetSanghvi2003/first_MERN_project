import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./NotesSlice";
import userReducer from "./UserSlice";
const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
