import { createSlice, PayloadAction, createSelector } from "redux-starter-kit";
import { AppThunk } from ".";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResult {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export enum ApiStatus {
  uninitialized,
  loading,
  loaded,
  error
}

export type UsersState =
  | { status: ApiStatus.uninitialized }
  | { status: ApiStatus.loading; users?: User[]; currentPage: number }
  | { status: ApiStatus.error; error: string }
  | {
      status: ApiStatus.loaded;
      users: User[];
      currentPage: number;
    };

export const userListSlice = createSlice({
  name: "usersApi",
  initialState: { status: ApiStatus.uninitialized } as UsersState,
  reducers: {
    loadingStarted(oldState, { payload: page }: PayloadAction<number>) {
      return {
        status: ApiStatus.loading,
        currentPage: page,
        // keep old users in state until loading of new users completed
        users: oldState.status === ApiStatus.loaded ? oldState.users : undefined
      };
    },
    loaded(_, { payload: apiResult }: PayloadAction<ApiResult>) {
      return {
        status: ApiStatus.loaded,
        users: apiResult.data,
        currentPage: apiResult.page
      };
    },
    hadError(_, { payload: error }: PayloadAction<string>) {
      return {
        status: ApiStatus.error,
        error
      };
    }
  }
});

export const { actions } = userListSlice;

function waitForShow(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function loadUsersThunk(page: number): AppThunk {
  return async (dispatch, getState) => {
    dispatch(actions.loadingStarted(page));
    try {
      const apiBase = getState().configuration.apiBase;
      const result = await fetch(`${apiBase}/users?page=${page}`);
      if (!result.ok) {
        throw result.statusText;
      }
      await waitForShow(500);
      dispatch(actions.loaded(await result.json()));
    } catch (e) {
      dispatch(actions.hadError(e.message || e.toString()));
    }
  };
}

export const selectors = {
  status: (state: UsersState) => state.status,
  users: (state: UsersState) =>
    state.status === ApiStatus.loaded || state.status === ApiStatus.loading
      ? state.users
      : undefined,
  page: (state: UsersState) =>
    state.status === ApiStatus.loaded && state.currentPage,
  error: (state: UsersState) => state.status === ApiStatus.error && state.error
};
