import produce from 'immer';

const INITIAL_STATE = {
  signed: false,
  loading: false,
  token: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        const { token } = action.payload;
        draft.loading = false;
        draft.signed = true;
        draft.token = token;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.signed = false;
        draft.token = null;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
