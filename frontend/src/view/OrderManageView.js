import React, {Component} from 'react';
import axios from "axios";
import {message, Typography, Tag, Button, Descriptions, Collapse, Modal, Form, DatePicker, List} from "antd";
import {history} from "../utils/history";
import {cancelOrder, getOrderItemsById} from "../services/orderService";
import Footer from "../components/Footer";

import Pubsub from "pubsub-js";
import SearchOrderHeader from "../components/Header/SearchOrderHeader";

const { RangePicker } = DatePicker;

export default class UserManageView extends Component {
    constructor(props) {
        super(props);
        this.state = {sum: 0}
        this.state = {orderList: [], allOrders: []}
    }


    handlePanelClick = async (userId, index) => {
        const orderItemsRes = await getOrderItemsById(userId)
        console.log(orderItemsRes)
        this.setState({orderItems: orderItemsRes})
        // DepartmentSteps.push({departmentId: departmentId, steps: stepsRes})
    }

    callback = (bookInCarList) => {
        this.setState({orderList: bookInCarList})
        console.log(this.state.orderList)
    }


    componentDidMount()  {
        axios.post(`/api/admin/get-full-order`).then(
            response => {
                console.log("请求成功", response.data);
                if (response.data != null) {
                    // history.push({pathname: '/orderManage/default'})
                    this.setState({orderList: response.data})
                    this.setState({allOrders: response.data})
                }
            },
        )
            Pubsub.subscribe('searchOrder',(_,stateObj)=>{
                console.log('收到订单数据!',stateObj.orderList);
                this.setState({orderList : stateObj.orderList})
            })


    }

    timeChange = (value, dateString) => {
        if(dateString[0]===''||dateString[1]==='')
        {
            this.setState(
                {orderList: this.state.orderList}
            );
            return;
        }
        dateString[0] = dateString[0].replace(/-/g, '/');
        dateString[1] = dateString[1].replace(/-/g, '/');
        console.log('Formatted Selected Time: ', dateString);
        const startTime= new Date((dateString[0]));
        const endTime=new Date((dateString[1]));
        let arr = [];
        let list = this.state.allOrders;
        console.log(list)
        for (let i = 0; i < list.length; i++) {
            // list[0] = dateString[0].replace(/-/g, '/');
            let time = new Date(Date.parse(list[i].createTime))
            console.log(time)
            console.log(startTime)
            console.log(endTime)
            if (
                time > startTime && time <= endTime
            ) {
                arr.push(list[i]);
            }
        }
        this.setState(
            {orderList: arr}
        );
        console.log(arr)
    }


    render() {
        // this.componentDidMount()
        const orderList = this.state.orderList
        console.log(orderList)
        var date
        return (
            <div>
                <SearchOrderHeader/>
                <RangePicker onChange ={this.timeChange}/>
                <Collapse accordion={true} style={{marginBottom: 200}}>
                    {

                        orderList &&  orderList.map((order, index) => {
                            {
                                 // order.createTime = new Date(order.createTime)
                               date =  new Date(Date.parse(order.createTime)).toLocaleString()
                                console.log(date)
                            }
                        return (
                            <Collapse.Panel
                                key={index}
                                header={
                                    <div style={{width: "100%"}}>
                                        <Typography.Text strong>
                                            用户Id：{order.userId}   订单创建时间：{date }
                                        </Typography.Text>
                                    </div>
                                }
                            >
                                {
                                    order && order.orderItems.map((orderItem, index1) => {
                                        return (
                                            <Descriptions column={4}>
                                                <Descriptions.Item label="书名">
                                                    《{orderItem.book.bookName}》
                                                </Descriptions.Item>
                                                <Descriptions.Item label="作者">
                                                    {orderItem.book.author}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="单价">
                                                    {orderItem.book.price}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="数量">
                                                    {orderItem.num}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        )
                                    })
                                }

                            </Collapse.Panel>
                        )
                    })}
                </Collapse>
                <Footer/>
            </div>
        );
    }


}

