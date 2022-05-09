import React from 'react';
import { Router, Route, Switch, Redirect,BrowserRouter, HashRouter, Link } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import LoginRoute from './LoginRoute'
import HomeView from "./view/HomeView";
import LoginView from './view/LoginView'
import BookView from "./view/BookView";
import RegisterView from "./view/RegisterView"
import { history } from "./utils/history";
import ShoppingCarView from "./view/ShoppingCarView";


// TODO: 尚未实现前端鉴权
class BasicRoute extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location, action);
        });
    }

    render() {
        return (
            <div>
                
                <BrowserRouter history={history}>
                    <Switch>
                        <Route exact path="/login" component={LoginView} />
                        <Route exact path="/book" component={BookView} />
                        <Route exact path="/car" component={ShoppingCarView} />
                        <Route exact path="/register" component={RegisterView} />
                        <Route exact path="/" component={HomeView} />
                    </Switch>
                </BrowserRouter>
            </div>

        )
    }
}

export default BasicRoute;
