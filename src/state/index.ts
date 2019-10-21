import { ThunkAction } from "redux-thunk";
import {
  configureStore,
  Action,
  getDefaultMiddleware,
  combineReducers
} from "redux-starter-kit";
import { userListSlice, UsersState } from "./usersListApi";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { newUserFormSlice, NewUserState } from "./newUserForm";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";
import { Reducer } from "react";

export function createStore({
  history,
  apiBase
}: {
  history: History<any>;
  apiBase: string;
}) {
  const configurationReducer = (state = { apiBase }) => state;

  return configureStore({
    reducer: combineReducers({
      configuration: configurationReducer,
      usersList: userListSlice.reducer,
      newUserForm: newUserFormSlice.reducer,
      router: connectRouter(history)
    }),
    middleware: [...getDefaultMiddleware(), routerMiddleware(history)]
  });
}

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk = ThunkAction<any, RootState, any, Action<string>>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const fromUsersList = <T>(selector: (state: UsersState) => T) => (
  state: RootState
): T => selector(state.usersList);

export const fromNewUserForm = <T>(selector: (state: NewUserState) => T) => (
  state: RootState
): T => selector(state.newUserForm);
