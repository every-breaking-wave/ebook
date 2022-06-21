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

    handleCancel  = (event, id) =>{
        event.stopPropagation()
        Modal.confirm({
            okText: "确定",
            cancelText: "取消",
            content: "你确定要取消该挂号吗？",
            onOk: () => {
                cancelOrder(id).then()
            }
        })
    }

    handlePanelClick = async (userId, index) => {
        // if (typeof DepartmentSteps.find((item) => {
        //     return item.departmentId === departmentId
        // }) != "undefined") {
        //     return
        // }
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
        axios.post(`/api/admin/get-full-order`).then(
            response => {
                console.log("请求成功", response.data);
                if (response.data != null) {
                    history.push({pathname: '/default'})
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

