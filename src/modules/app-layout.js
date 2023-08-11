import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import AppNavbar from "shared/navbar.js";
import routes from "../routes";
import {useSelector} from "react-redux";
import MyComponent from "react-fullpage-custom-loader";

const AppLayout = (props) => {

    const isLogged = useSelector(state => state.loginReducer.isLogged);
    const showLoader = useSelector(state => state.httpClientReducer.showLoader);
    const mainContent = React.useRef(null);


    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout) {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    if (isLogged) {
        return (
            <>
                <div className="main-content" ref={mainContent}>
                    <AppNavbar/>
                    <Switch>
                        {getRoutes(routes)}
                        <Redirect from="*" to="/connexion"/>
                    </Switch>
                </div>
                {showLoader ?
                    <MyComponent sentences={[]}/>
                    : null}
            </>
        );
    } else {
        return <Redirect to="/connexion"/>
    }
};

export default AppLayout;
