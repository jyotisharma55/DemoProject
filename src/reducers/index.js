import { combineReducers } from 'redux';
import employeeReducer from './empolyeeReducer'


export default combineReducers({
    employeeReducer: employeeReducer
});