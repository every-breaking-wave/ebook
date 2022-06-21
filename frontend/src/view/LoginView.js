import React from 'react';
import { Input, Form, Button, message } from 'antd';
import WrappedLoginForm from '../components/LoginForm';
 import { withRouter, Link, useNavigate } from "react-router-dom";
import { history } from '../utils/history';
import cookie from "react-cookies";
import '../css/login.css'
import '../css/base.css'
import axios from 'axios';
import '../services/userService'


// import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {onLogin} from "../services/userService";


class LoginView extends React.Component {


    // navigate = useNavigate()
    // const [userAccount, setUserAccount] : useState
    // const [userPassword, setUserPassword] : useState
    constructor(props) {
        super(props);
        this.state = { userAccount: "", userPassword: "" }
    }

    handleInputChange = (event, name) => {
        const value = event.target.value
        switch (name) {
            case "userAccount":
                // console.log(value)
                this.setState({ userAccount: value })
                break
            case "userPassword":
                // console.log(value)
                this.setState({ userPassword: value })
                break
        }
    }


    handleLogin = () => {

        const userAccount = this.state.userAccount
        const userPassword = this.state.userPassword
        console.log(userAccount)
        console.log(userPassword)

        axios.post(`/api/user/login`, {
            userAccount: userAccount,
            userPassword: userPassword
        }).then(
            response => {
                console.log("请求成功", response.data);
                if (response.data.status == 'USER_ALL_OK') {
                    message.info("登陆成功，祝您购物愉快")
                    let { history } = this.props
                    onLogin(response.data.id)
                    history.push({ pathname: '/' })
                }
                else if("USER_NOT_EXIST" == response.data.status){
                    message.error("登录失败：用户不存在或密码错误")
                }
                else if("USER_BEEN_BANNED" == response.data.status){
                    message.error("登录失败：用户被禁用")
                }
                else if("USER_ACCOUNT_PASSWORD_NULL" == response.data.status){
                    message.error("登录失败：账号或密码不能为空")
                }
                else if("USER_ACCOUNT_ILLEGAL" == response.data.status){
                    message.error("登录失败：账号不能包含非法字符")
                }

                // switch (response.data.status) {
                //     case "USER_ALL_OK":
                //         message.info("登陆成功，祝您购物愉快")
                //         let { history } = this.props
                //         onLogin(response.data.id)
                //         console.log("hhh")
                //         history.push({ pathname: '/default' })
                //         break
                //     case "USER_NOT_EXIST":
                //         message.error("登录失败：用户不存在或密码错误")
                //         break
                //     case "USER_BEEN_BANNED":
                //         message.error("登录失败：用户被禁用")
                //         break
                //     case "USER_ACCOUNT_PASSWORD_NULL":
                //         message.error("登录失败：账号或密码不能为空")
                //         break
                //     case "USER_ACCOUNT_ILLEGAL":
                //         message.error("登录失败：账号不能包含非法字符")
                //         break
                //     default:
                //         message.error("登录失败：")
                //         break
                // }
                // if (response.data.status == 'USER_ALL_OK') {
                //     message.info("登陆成功，祝您购物愉快")
                //     let { history } = this.props
                //     onLogin(response.data.id)
                //     history.push({ pathname: '/' })
                // }

            },
            error => { console.log("请求失败", error);
            }
        )
    }


    render() {
        return (
            <div className="BodyBg t l">
                <div className="BgPicture t"></div>
                <div className="bodyMiddle c" style={{ height:30 }}>
                    <div className="bodyMain">
                        <div className="MainContent">
                            <em>登录EBook</em>
                            <div className="input1 l" style={{ marginLeft: 30 }}>
                                <div className="userIcon leftIcon"></div>
                                <div className="user u1 l">
                                    <div className="clear cl1"></div>
                                    <Form
                                        // validateStatus="success"
                                        label="用户账号"
                                        name="userAccount"
                                        rules={[
                                            {
                                                required: true,
                                                message: "请输入有效的账号",
                                            }
                                        ]}
                                    >
                                        <input
                                            ref={a => this.keyWordElement = a}
                                            type="text"
                                            placeholder="请输入账号"
                                            style={{ width: "230px" }}
                                            onChange={(e) => this.handleInputChange(e, "userAccount")}
                                        />
                                    </Form>
                                </div>
                            </div>
                            <div className="input2 l" style={{ marginLeft: 30 }}>
                                <div className="pswordIcon leftIcon"></div>
                                <div className="user l">
                                    <div className="clear cl2"></div>
                                    <Form
                                        // validateStatus="success"
                                        label="用户密码"
                                        name="userPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message: "请输入有效密码",
                                            }
                                        ]}
                                    >
                                        <input
                                            ref={c => this.keyWordElement = c}
                                            type="text"
                                            placeholder="请输入密码"
                                            style={{ width: "230px" }}
                                            onChange={(e) => this.handleInputChange(e, "userPassword")}
                                        />
                                    </Form>
                                </div>
                            </div>
                            
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "80%", marginLeft: "10%" ,marginTop:40}}
                                onClick={this.handleLogin}
                            // loading={loading[0]}
                            >
                                登录
                            </Button>
                       
    
                            <div className="forgetpass l">
                                <p>
                                    <a href="/#">忘记密码？</a>
                                    还没有账号？
                                    <Link to="/register" className="red">免费注册</Link>
                                </p>
                                {/* <div className="rightArraw r"></div> */}
                                {/* <p className="r">
                                  
                                </p> */}
                            </div>

                            {/* <div className="freeRegister l">
                           
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}

export default LoginView;


