import { defineMessages } from 'react-intl';

export const scope = 'loginPage';

export default defineMessages({
  titlePage: {
    id: `${ scope }.titlePage`,
    defaultMessage: 'Đăng nhập',
  },
  userIDPlaceholder: {
    id: `${ scope }.userIDPlaceholder`,
    defaultMessage: 'ID',
  },
  inValidEmail: {
    id: `${ scope }.validate.email.invalid`,
    defaultMessage: 'email is invalid',
  },
  logInFailed: {
    id: `${ scope }.login.failed`,
    defaultMessage: 'Log in failed',
  },
  passwordPlaceholder: {
    id: `${ scope }.passwordPlaceholder`,
    defaultMessage: 'Mật khẩu',
  },
  signIn: {
    id: `${ scope }.signIn`,
    defaultMessage: 'Đăng nhập',
  },
  forgotPassword: {
    id: `${ scope }.forgotPassword`,
    defaultMessage: 'Quên mật khẩu',
  }
});
