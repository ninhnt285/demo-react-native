import React, {createContext, useContext, useReducer} from 'react';

const Reducer = (state, action) => {
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
      break;
  }
};

const initialState = {
  user: null,
  users: {},
  footer: null,
  error: null,
};

const Context = createContext([null, null]);
export function useStore() {
  return useContext(Context);
}

export default Store = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
};
