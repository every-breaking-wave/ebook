import React, {Component, useEffect} from 'react';
import cookie from "react-cookies";
import {useCookies} from 'react-cookie';
import axios from "axios";
import {message, Typography, Tag, Button, Descriptions, Collapse, Modal} from "antd";
import {history} from "../utils/history";
import {cancelOrder, getOrderItemsById} from "../services/orderService";
import HeaderL from "../components/Header/Header";
import Footer from "../components/Footer";

export default class UserManageView extends Component {
    constructor(props) {
        super(props);
        this.state = {sum: 0}
        this.state = {orderList: [[]], orderItems: []}
        // console.log(this.props.bookId)

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

    componentDidMount() {
        console.log(this.state.list)
        let userId = cookie.load("userId")
        axios.post(`/api/user/get-user-full-order/${userId}`,userId).then(
            response => {
                console.log("请求成功", response.data);
                if (response.data != null) {
                    // history.push({pathname: '/default'})
                    this.setState({orderList: response.data})
                }
            },
            error => {
                message.error("你没有此权限！")
                history.push("/")
            }
        )
    }

    render() {
        // this.componentDidMount()
        const orderList = this.state.orderList || []
        // const bookList = cookie.loadAll().list;
        // console.log(this.props)
        console.log(orderList)
        return (
            <div>
                <HeaderL/>
                <Collapse accordion={true} style={{marginBottom: 200}}>
                    <Typography.Text strong>
                        {/*创建时间：{item.createTime}*/}
                    </Typography.Text>
                    {orderList.map((item, index) => {
                        return (
                            <Collapse.Panel
                                key={index}
                                // onClick={() => this.handlePanelClick(item[0].orderId, index)}
                                header={
                                    <div style={{width: "100%"}}>
                                        <Typography.Text strong>
                                            创建时间：{item[0] &&  item[0].createTime}
                                        </Typography.Text>
                                    </div>
                                }

                            >

                                <Typography.Text >{
                                    console.log(item[0])
                                }

                                </Typography.Text>
                                {
                                    item.map((orderItem, index1) => {
                                        return (
                                            <Descriptions>
                                                <Descriptions.Item label="书名">
                                                    {orderItem.bookName}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="单价">
                                                    {orderItem.price}
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

