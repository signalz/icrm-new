import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR,
  LOG_OUT,
  RESET_LOG_IN_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './constants';

export function logIn(payload) {
    return {
        type: LOG_IN,
        payload,
    }
}

export function logInSuccess(payload) {
    return {
        type: LOG_IN_SUCCESS,
        payload,
    }
}

export function logInError(error) {
  return {
        type: LOG_IN_ERROR,
        error,
    };
}

export function logOutSuccess() {
  return {
    type: LOG_OUT_SUCCESS,
  }
}

export function logOutError(error) {
  return {
    type: LOG_OUT_ERROR,
    error,
  };
}

export function logOut() {
    return {
        type: LOG_OUT,
    };
}

export function resetLogInError() {
    return {
        type: RESET_LOG_IN_ERROR,
    };
}

export function resetPassword(payload) {
  return {
    type: RESET_PASSWORD,
    payload,
  }
}

export function resetPasswordSuccess(payload) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload,
  }
}

export function resetPasswordError(error) {
  return {
    type: RESET_PASSWORD_ERROR,
    error,
  };
}
