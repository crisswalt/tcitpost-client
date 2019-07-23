import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
<<<<<<< HEAD
  applyMiddleware(thunk)
=======
  applyMiddleware(thunk, loggerMiddleware)
>>>>>>> 95fa61eb755e5207f5bb473540d2ee7fc5c07ea8
);

export default store;
