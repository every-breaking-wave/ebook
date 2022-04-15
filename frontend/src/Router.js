import React from 'react';
import { Router, Route, Switch, Redirect, HashRouter} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import LoginRoute from  './LoginRoute'
import HomeView from "./view/HomeView";
import LoginView from './view/LoginView'
import BookView from "./view/BookView";
import {history} from "./utils/history";
import ShoppingCarView from "./view/ShoppingCarView";

class BasicRoute extends React.Component{
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }

    render(){
        return(
            <Router history={history}>
                <Switch>
                    <Route  path="/login" component={LoginView} />
                    <Route  path="/book" component={BookView} />
                    <Route  path="/car" component={ShoppingCarView} />
                    <Route  path="/" component={HomeView} />
                </Switch>
            </Router>
        )
    }
}

export default BasicRoute;
