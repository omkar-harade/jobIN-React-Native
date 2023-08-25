import { createStore, combineReducers} from 'redux';
import LoginReducer from './reducers/loginReducer';
 
const rootReducer = combineReducers({
  auth: LoginReducer,
});

export const store = createStore(rootReducer);   