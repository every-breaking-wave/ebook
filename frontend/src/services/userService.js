import config from 'config';
import {postRequest} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';
import axios from "axios";
import Pubsub from "pubsub-js";
import cookie from "react-cookies";

export const loginUser = () => {
    return cookie.load('userAccount')
}

// 用户登录，保存cookie
export const onLogin = (userAccount) => {
    cookie.save('userAccount', userAccount, { path: '/' })
}

export const logout = () => {
    cookie.remove('userAccount')
    window.location.href = '/login'
}

export const checkSession = (callback) => {
    axios.post(`/api/user/check`).then(
        response => {
            console.log("请求成功", response.data);
            if(response.data != null){
                // Pubsub.publish('searchBook',{isLoading:false, bookList: response.data.bookList})
                message.info("ok")
                console.log(response.data)
                callback(response.data)
            }
        },
        error => {
            Pubsub.publish('searchBook',{err: error.message})
        }
    )

    // const url = `${config.apiUrl}/checkSession`;
    // postRequest(url, {}, callback);
};

