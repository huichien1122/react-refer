import { combineReducers, createStore,
  //  applyMiddleware 
  } from 'redux';
import {
  themeReducer,
  profileReducer,
  headerReducer,
  scopeReducer,
  internetSpeedReducer,
  routeReducer,
  menuReducer,
} from '../../redux/reducers/index';


const reducer = combineReducers({
  theme: themeReducer,
  profile: profileReducer,
  header: headerReducer,
  scope: scopeReducer,
  speed: internetSpeedReducer,
  route: routeReducer,
  menu: menuReducer,
});

const store = createStore(reducer, 
  // applyMiddleware(createMySocketMiddleware())
);

export default store;