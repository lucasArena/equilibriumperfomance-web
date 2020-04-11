import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { signInFailure, signInSuccess } from './actions';

import api from '~/services/api';
import history from '~/services/history';

function* signRequest({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { user, token } = response;

    yield put(signInSuccess(user, token));
    history.push('/account');
  } catch (err) {
    toast.error('Email ou senha inválida');
    yield put(signInFailure());
  }
}

function setToken({ payload }) {
  if (!payload) return;

  api.defaults.headers.authorization = `Bearer ${payload.auth.token}`;
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signRequest),
]);
