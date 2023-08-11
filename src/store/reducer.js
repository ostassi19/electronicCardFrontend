import {combineReducers} from 'redux';
import loginReducer from '../modules/login/reducer';
import httpClientReducer from "../core/http/reducer";
import maintenancesReducer from "../modules/maintenance/reducer";
import supervisedMachinesReducer from "../modules/supervisedMachine/reducer";
import productivitiesReducer from "../modules/productivity/reducer";
import workPlanificationsReducer from "../modules/workPlanification/reducer";
import alertesReducer from "../modules/alerte/reducer";


export default combineReducers({
    loginReducer,
    httpClientReducer,
    maintenancesReducer,
    supervisedMachinesReducer,
    productivitiesReducer,
    workPlanificationsReducer,
    alertesReducer
})
