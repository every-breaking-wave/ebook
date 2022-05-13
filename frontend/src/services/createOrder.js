import axios from "axios";
import Pubsub from "pubsub-js";
import {message} from "antd";


export const createOrder = (userAccount, callback) => {

    axios.post(`/api/order/create`, {
        userAccount: userAccount,
    }).then(
        response => {
            console.log("请求成功", response.data);
            message.info("订单创建添加成功")
            console.log(response.data.id)
            callback(response.data.id)
        },
        error => { console.log("请求失败", error); }
    )

};


export const createOrderItem = (bookList,orderId) => {

    axios.post(`/api/orderitem/create`, {
       bookList:bookList,
       orderId:orderId
    }).then(
        response => {
            console.log("请求成功", response.data);
        },
        error => { console.log("请求失败", error); }
    )
};