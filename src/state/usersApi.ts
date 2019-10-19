import { createSlice, PayloadAction } from "redux-starter-kit";
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

enum Status {
  uninitialized,
  loading,
  loaded,
  error
}

type UsersState =
  | { status: Status.uninitialized }
  | { status: Status.loading; users?: User[]; currentPage: number }
  | { status: Status.error; error: string }
  | {
      status: Status.loaded;
      users: User[];
      currentPage: number;
    };

export const userSlice = createSlice({
  name: "usersApi",
  initialState: { status: Status.uninitialized } as UsersState,
  reducers: {
    loadingStarted(oldState, { payload: page }: PayloadAction<number>) {
      return {
        status: Status.loading,
        currentPage: page,
        // keep old users in state until loading of new users completed
        users: oldState.status === Status.loaded ? oldState.users : undefined
      };
    },
    loaded(_, { payload: apiResult }: PayloadAction<ApiResult>) {
      return {
        status: Status.loaded,
        users: apiResult.data,
        currentPage: apiResult.page
      };
    },
    hadError(_, { payload: error }: PayloadAction<string>) {
      return {
        status: Status.error,
        error
      };
    }
  }
});

export const { actions } = userSlice;

export function loadUsersThunk(page: number): AppThunk {
  return async (dispatch, getState) => {
    dispatch(actions.loadingStarted(page));
    try {
      const apiBase = getState().configuration.apiBase;
      const result = await fetch(`${apiBase}/users?page=${page}`);
      if (!result.ok) {
        throw result.statusText;
      }
      dispatch(actions.loaded(await result.json()));
    } catch (e) {
      dispatch(actions.hadError(e.message || e.toString()));
    }
  };
}
