import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import orderReducer from './orderReducer';
import stepReducer from './stepReducer';

export default combineReducers({
    form: formReducer,
    order: orderReducer,
    step: stepReducer,
});