import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import orderReducer from './orderReducer';
import { stepReducer, curStepReducer } from './stepReducer';
import paymentInfoReducer from './paymentInfoReducer';
import storeReducer from './storeReducer';

export default combineReducers({
    form: formReducer,
    order: orderReducer,
    steps: stepReducer,
    curStep: curStepReducer,
    paymentInfo: paymentInfoReducer,
    stores: storeReducer,
});