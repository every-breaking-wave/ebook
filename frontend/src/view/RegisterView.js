import React from 'react';
import { Input, Form, Button, message } from 'antd';
import WrappedLoginForm from '../components/LoginForm';
import { withRouter, Link, useNavigate } from "react-router-dom";
import { history } from '../utils/history';
import '../css/login.css'
import '../css/base.css'
import axios from 'axios';


// import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


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


    handleRegister = () => {

        const userAccount = this.state.userAccount
        const userPassword = this.state.userPassword
        console.log(userAccount)
        console.log(userPassword)
        // console.log(value)
        // axios.get(`http://api.github.com/search/users?q=${value}`).then(
        //     response => {console.log("chenggong", response.data);},
        //     error => {console.log("shibai", error);}
        // )
        // axios.get("/api/user/login").then(
        //     response => {console.log("chenggong", response.data);},
        //     error => {console.log("shibai", error);}
        // )
        axios.post(`/api/user/register`, {
            userAccount: userAccount,
            userPassword: userPassword
        }).then(
            response => {
                console.log("请求成功", response.data);
                if (response.data.status == 'USER_ALL_OK') {
                    message.info("注册成功，祝您购物愉快")
                    let { history } = this.props
                    history.push({ pathname: '/login' })
                }
                else message.error("登录失败：用户不存在或密码错误")
            },
            error => { console.log("请求失败", error); }
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
                                                message: "请输入新账号",
                                            }
                                        ]}
                                    >
                                        <input
                                            ref={a => this.keyWordElement = a}
                                            type="text"
                                            placeholder="请输入新账号"
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
                                                message: "请输入新密码",
                                            }
                                        ]}
                                    >
                                        <input
                                            ref={c => this.keyWordElement = c}
                                            type="text"
                                            placeholder="请输入新密码"
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
                                onClick={this.handleRegister}
                            // loading={loading[0]}
                            >
                                立刻注册
                            </Button>
                       
    
                            <div className="forgetpass l">
                                <p  style={{marginLeft:170}}>
                                    已有账号？
                                    <Link to="/login" className="red">马上登录</Link>
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


