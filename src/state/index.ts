import { ThunkAction } from "redux-thunk";
import { configureStore, combineReducers, Action } from "redux-starter-kit";
import { userSlice } from "./usersApi";

const configurationReducer = (
  state = {
    apiBase: "https://reqres.in/api"
  }
) => state;

const reducer = combineReducers({
  configuration: configurationReducer,
  usersApi: userSlice.reducer
});

export const store = configureStore({
  reducer
});

export type RootState = ReturnType<typeof store["getState"]>;
export type AppThunk = ThunkAction<any, RootState, any, Action<string>>;
