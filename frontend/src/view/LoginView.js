import React from 'react';
import WrappedLoginForm from '../components/LoginForm';
import {withRouter} from "react-router-dom";
import '../css/login.css'
import '../css/base.css'

class LoginView extends React.Component{

    render(){
        return(
                <div className="BodyBg t l">
                    <div className="BgPicture t"></div>
                    <div className="bodyMiddle c">
                        <div className="bodyMain">
                            <div className="MainContent">
                                <em>登录EBook</em>
                                <div className="input1 l">
                                    <div className="userIcon leftIcon"></div>
                                    <div className="user u1 l">
                                        <div className="clear cl1"></div>
                                        <input className="in1" type="text" placeholder="手机号/邮箱"/>
                                    </div>
                                </div>
                                <div className="input2 l">
                                    <div className="pswordIcon leftIcon"></div>
                                    <div className="user l">
                                        <div className="clear cl2"></div>
                                        <input className="in2" type="text" placeholder="密码"/>
                                    </div>
                                </div>
                                <div className="forgetpass l">
                                    <p><a href="/#">忘记密码？</a></p>
                                </div>
                                <div  className="okLogin">
                                    <a href={"/"}>登录</a>
                                </div>
                                <div className="freeRegister l">
                                    <div className="rightArraw r"></div>
                                    <p className="r">
                                        还没有账号？<a href="register.html" className="red">免费注册</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        );

    }
}

export default withRouter(LoginView);

