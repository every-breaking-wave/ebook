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
import AdminView from "./view/BookManageView"
import UserManagerView from "./view/UserManageView"
import OrderManageView from "./view/OrderManageView";
import UserView from "./view/UserView"
import BookDetail from "./components/BookDetail/BookDetail";
import BookManageView from "./view/BookManageView";
import StatisticView from "./view/StatisticView";



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
                <BrowserRouter >
                    <Switch>
                        <Route  path="/login" component={LoginView} />
                        <Route  path="/register" component={RegisterView} />
                        <PrivateRoute  path="/book/:id" component={BookView} />
                        <PrivateRoute  path="/car" component={ShoppingCarView} />
                        <PrivateRoute  path="/bookManage/:keyValue" component={BookManageView} />
                        <PrivateRoute  path="/userManage" component={UserManagerView} />
                        <PrivateRoute  path="/orderManage/:keyValue" component={OrderManageView} />
                        <PrivateRoute  path="/userCenter" component={UserView} />
                        <PrivateRoute  path="/statistic" component={StatisticView} />
                        <PrivateRoute  path="/:keyValue" component={HomeView} />
                        <Redirect from="/bookManage/*" to="/bookManage/default" />
                        <Redirect from="/orderManage/*" to="/orderManage/default" />
                        <Redirect from="/userCenter/*" to="/userCenter/default" />
                        <Redirect from="/*" to="/default" />
                    </Switch>
                </BrowserRouter>
            </div>

        )
    }
}

export default BasicRoute;
