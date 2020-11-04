import { call, put, takeEvery} from 'redux-saga/effects';
import {
    LOG_IN,
    LOG_OUT,
    RESET_PASSWORD,
} from './constants';
import {
    logInSuccess,
    logInError,
    logOutSuccess,
    logOutError,
    resetPasswordSuccess,
    resetPasswordError,
} from './actions';
import {RestfulEntityApi} from '../../restfulApi';

const logInApi = RestfulEntityApi('authenticate');
const resetPasswordApi = RestfulEntityApi('password/email');
const logOutApi = RestfulEntityApi('logout');

const logIn = function* ({payload}) {
    try {
        const response = yield call(logInApi.POST, payload);
        yield put(logInSuccess(response.data));
    } catch (err) {
        yield put(logInError(err));
    }
};

const logOut = function* ({payload}) {
    try {
        yield call(logOutApi.GET, '', payload);
        yield put(logOutSuccess());
    } catch (err) {
        yield put(logOutError(err));
    }
};

const resetPassword = function* ({payload}) {
    try {
        const response = yield call(resetPasswordApi.POST, payload);
        yield put(resetPasswordSuccess(response.data));
    } catch (err) {
        yield put(resetPasswordError(err));
    }
};

/**
 * Root saga manages watcher lifecycle
 */
export default function* saga() {
    yield takeEvery(LOG_IN, logIn);
    yield takeEvery(LOG_OUT, logOut);
    yield takeEvery(RESET_PASSWORD, resetPassword);
}
