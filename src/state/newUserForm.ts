//#region
import { createSlice, PayloadAction } from "redux-starter-kit";
import { AppThunk } from ".";
import { navigateTo as navigateToUserList } from "./usersListApi";
//#endregion

interface FormFields {
  name: string;
  job: string;
}

export interface ApiResult extends FormFields {
  id: string;
  createdAt: string;
}

export interface NewUserState extends FormFields {
  submitting: boolean;
  error?: string;
}

const initialState: NewUserState = {
  name: "",
  job: "",
  submitting: false
};

export const newUserFormSlice = createSlice({
  name: "newUserForm",
  initialState,
  reducers: {
    nameChanged(draft, { payload: newValue }: PayloadAction<string>) {
      draft.name = newValue;
      draft.error = undefined;
    },
    jobChanged(draft, { payload: newValue }: PayloadAction<string>) {
      draft.job = newValue;
      draft.error = undefined;
    },
    submittingStarted(draft) {
      draft.submitting = true;
    },
    submittedSuccessfully() {
      return initialState;
    },
    submittedWithError(draft, { payload: error }: PayloadAction<string>) {
      draft.submitting = false;
      draft.error = error;
    }
  }
});

export const { actions } = newUserFormSlice;

function waitForShow(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function submitForm(): AppThunk {
  return async (dispatch, getState) => {
    dispatch(actions.submittingStarted());
    try {
      const {
        configuration: { apiBase },
        newUserForm: { name, job }
      } = getState();

      const result = await fetch(`${apiBase}/users`, {
        method: "POST",
        body: JSON.stringify({ name, job })
      });
      if (!result.ok) {
        throw result.statusText;
      }
      await waitForShow(500);
      dispatch(actions.submittedSuccessfully());
      dispatch(navigateToUserList(1));
    } catch (e) {
      dispatch(actions.submittedWithError(e.message || e.toString()));
    }
  };
}

export const selectors = {
  name(state: NewUserState) {
    return state.name;
  },
  job(state: NewUserState) {
    return state.job;
  },
  isSubmitting(state: NewUserState) {
    return state.submitting;
  },
  error(state: NewUserState) {
    return state.error;
  }
};
