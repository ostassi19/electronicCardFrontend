import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";


import {Provider} from "react-redux";
import {createStore} from "redux";
import reducer from "store/reducer";
import Login from "modules/login/components/Login";
import AppLayout from "./modules/app-layout";

let store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/connexion"><Login/></Route>
                <Route path="*"><AppLayout/></Route>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
