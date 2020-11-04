import produce from 'immer';
import { CHANGE_USERNAME } from './constants';

export const initialState = {
  username: '',
};

const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_USERNAME:
        // Delete prefixed '@' from the github username
        draft.username = action.username.replace(/@/gi, '');
        break;
    }
  });

export default homeReducer;
