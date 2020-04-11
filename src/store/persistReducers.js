import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persitedReducers = persistReducer(
    {
      key: 'equilibriumperformance',
      storage,
      whitelist: ['auth', 'profile'],
    },
    reducers
  );

  return persitedReducers;
};
