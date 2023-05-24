import React, {Reducer, createContext, useContext, useReducer} from 'react';
import {User} from '~/modules/user/types';

interface State {
  user: User | null;
  users: User[];
  error: any;
}

interface Action {
  type: string;
  payload: any;
}

const storeReducer: Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

const initialState: State = {
  user: null,
  users: [],
  error: null,
};

const StoreContext = createContext(initialState);
const StoreDispatchContext = createContext((_action: Action) => {});

export function useStore() {
  return useContext(StoreContext);
}

export function useDispatch() {
  return useContext(StoreDispatchContext);
}

const Store = ({children}: any) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
};

export default Store;
