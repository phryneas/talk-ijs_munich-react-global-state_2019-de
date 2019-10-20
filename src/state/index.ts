import { ThunkAction } from "redux-thunk";
import { configureStore, combineReducers, Action } from "redux-starter-kit";
import { userListSlice, UsersState } from "./usersListApi";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { UsersList } from "../components/UsersList";

const configurationReducer = (
  state = {
    apiBase: "https://reqres.in/api"
  }
) => state;

const reducer = combineReducers({
  configuration: configurationReducer,
  usersList: userListSlice.reducer
});

export const store = configureStore({
  reducer
});

export type RootState = ReturnType<typeof store["getState"]>;
export type AppThunk = ThunkAction<any, RootState, any, Action<string>>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const fromUsersList = <T>(selector: (state: UsersState) => T) => (
  state: RootState
): T => selector(state.usersList);
