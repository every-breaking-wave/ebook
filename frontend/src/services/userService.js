import config from 'config';
import {postRequest} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';
import axios from "axios";
import Pubsub from "pubsub-js";
import cookie from "react-cookies";

export const loginUser = () => {
    return cookie.load('userId')
}

// 用户登录，保存cookie
export const onLogin = (id) => {
    cookie.save('userId', id, { path: '/' })
}

export const logout = () => {
    cookie.remove('userId')
    window.location.href = '/login'
    axios.post(`/api/user/logout`).then(
        response => {
            console.log("请求成功", response.data);
            if(response.data != null){
                // Pubsub.publish('searchBook',{isLoading:false, bookList: response.data.bookList})
                message.info("ok")
                console.log(response.data)
            }
        },
        error => {
            error.isPrototypeOf(error.message)
        }
    )
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
            error.isPrototypeOf(error.message)
        }
    )
};


export async function getRole ()  {
    let role
    await axios.post(`/api/user/role`).then(
        response => {
            console.log("请求成功", response.data);
            if(response.data != null){
                // Pubsub.publish('searchBook',{isLoading:false, bookList: response.data.bookList})
                console.log(response.data)
                role = response.data
                // callback(role)
            }
        },
        error => {
            error.isPrototypeOf(error.message)
        }
    )
    return role
}

// export async function delUser (userId)  {
//     await axios.post(`/api/admin/del-user`,
//         {
//             'userId' : userId
//     }).then(
//         response => {
//             console.log("请求成功", response.data);
//             if(response.data != null){
//                 console.log(response.data)
//             }
//         },
//         error => {
//             error.isPrototypeOf(error.message)
//         }
//     )
// }
export const banUser = async (userId) => {
    const res = await fetch( "/api/admin/ban-user", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(userId)
    }).then(
        () => {

        }
    )
    // return await res.json()
}


