//#region
import { createSlice, PayloadAction } from "redux-starter-kit";
import { AppThunk } from ".";
import { LOCATION_CHANGE, push } from "connected-react-router";
import { matchPath, generatePath } from "react-router";
//#endregion

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ApiResult {
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
  | { status: ApiStatus.uninitialized; currentPage?: number }
  | { status: ApiStatus.loading; users?: User[]; currentPage: number }
  | { status: ApiStatus.error; error: string; currentPage?: number }
  | {
      status: ApiStatus.loaded;
      users: User[];
      currentPage: number;
    };

export const PATH_MATCH = "/page/:page?";

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
  },
  extraReducers: {
    [LOCATION_CHANGE](
      draft,
      { payload: { location } }: PayloadAction<{ location: Location }>
    ) {
      const match = matchPath<{ page?: string }>(location.pathname, {
        path: PATH_MATCH
      });
      if (match) {
        draft.currentPage = Number.parseInt(match.params.page || "1");
      }
      console.log(match);
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

export function navigateTo(page: number) {
  return push(generatePath(PATH_MATCH, { page }));
}

export const selectors = {
  isLoading: (state: UsersState) => state.status === ApiStatus.loading,
  isLoaded: (state: UsersState) => state.status === ApiStatus.loaded,
  users: (state: UsersState) =>
    state.status === ApiStatus.loaded || state.status === ApiStatus.loading
      ? state.users
      : undefined,
  page: (state: UsersState) => state.currentPage,
  error: (state: UsersState) => state.status === ApiStatus.error && state.error
};
