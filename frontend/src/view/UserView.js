import React, {Component, useEffect} from 'react';
import cookie from "react-cookies";
import {useCookies} from 'react-cookie';
import axios from "axios";
import {message, Typography, Tag, Button, Descriptions, Collapse, Modal, DatePicker} from "antd";
import {history} from "../utils/history";
import {cancelOrder, compare, getOrderItemsById} from "../services/orderService";
import HeaderL from "../components/Header/Header";
import Footer from "../components/Footer";
import SearchOrderHeader from "../components/Header/SearchOrderHeader";
import SearchOrder from "../components/Header/SearchOrder";
import Pubsub from "pubsub-js";

const { RangePicker } = DatePicker;

export default class UserManageView extends Component {
    constructor(props) {
        super(props);
        this.state = {sum: 0}
        this.state = {orderList: [], allOrders: [], status: 0, arr:[]}
    }

    componentDidMount() {
        console.log(this.state.list)
        let userId = cookie.load("userId")
        axios.post(`/api/order/get-user-full-order/${userId}`,userId).then(
            response => {
                console.log("请求成功", response.data);
                if (response.data != null) {
                    // history.push({pathname: '/default'})
                    this.setState({orderList: response.data})
                    this.setState({allOrders: response.data})
                }
            },
        )

        Pubsub.subscribe('searchOrder',(_,stateObj)=>{
            console.log('收到订单数据!',stateObj);
            this.setState(stateObj)
        })
    }

    timeChange = (value, dateString) => {
        if(dateString[0]===''||dateString[1]==='')
        {
            this.setState({orderList:this.state.data})
            return;
        }
        console.log('Formatted Selected Time: ', dateString);
        dateString[0] = dateString[0].replace(/-/g, '/');
        dateString[1] = dateString[1].replace(/-/g, '/');
        console.log(dateString[0], dateString[1])
        const startTime= new Date(Date.parse(dateString[0]));
        const endTime=new Date(Date.parse(dateString[1]));
        let data = this.state.allOrders;
        let number = new Array(40);
        let bookName = new Array(40);
        let sum = new Array(40);
        let author = new Array((40))
        let arr =[];
        let sumCount=0;
        let numberCount=0;
        for(let index = 0;index < 40;index++){
            number[index] = 0;
            bookName[index] = '';
            sum[index] = 0;
        }
        console.log(data)
        for(let i = 0;i <=data.length-1;i++)
        {
            let time = new Date(Date.parse(data[i].createTime));
            if (
                time > startTime && time<=endTime
            ) {
                for (let j = 0; j <= data[i].orderItems.length - 1; j++) {
                    let item = data[i].orderItems[j];
                    let book = item.book;
                    let bookId = book.id;
                    number[bookId]++;
                    bookName[bookId] = book.bookName;
                    author[bookId] = book.author
                    sum[bookId] += Number((item.num * item.price));
                }
            }
        }
        for(let index = 0;index < 40;index++){
            if(number[index] !== 0)
            {
                let json = {bookId:index,author: author[index], bookName:bookName[index],bookNumber:number[index],sum:sum[index].toFixed(1)};
                sumCount+=sum[index];
                numberCount+=number[index]
                arr.push(json)
            }
        }
        arr.sort(compare('bookNumber'))
        this.setState({
            arr:arr,number:numberCount,sum:sumCount,status:1
        })
        console.log(arr)
    }


    handlePanelClick = async (userId, index) => {
        const orderItemsRes = await getOrderItemsById(userId)
        console.log(orderItemsRes)
        this.setState({orderItems: orderItemsRes})
    }

    callback = (bookInCarList) => {
        this.setState({orderList: bookInCarList})
        console.log(this.state.orderList)
    }

    changeStatus = ()=>{
        this.setState({status:0})
    }


    render() {
        const orderList = this.state.orderList || []
        const bookList = this.state.arr || []
        let date
        return (
            <div>
                <div>
                    <SearchOrderHeader/>
                </div>
                <Button onClick={this.changeStatus}> 查看所有订单 </Button>
                <RangePicker onChange ={this.timeChange} />
                {
                    this.state.status  ?
                                bookList &&  bookList.map((book, index) => {
                                    return (
                                    <Descriptions column={4}>
                                        <Descriptions.Item label="书名">
                                            《{book.bookName}》
                                        </Descriptions.Item>
                                        <Descriptions.Item label="作者">
                                            {book.author}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="总价">
                                            {book.sum}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="数量">
                                            {book.bookNumber}
                                        </Descriptions.Item>
                                    </Descriptions>
                                    )})

                        :
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
                                                    订单创建时间：{ date}
                                                </Typography.Text>
                                            </div>
                                        }
                                    >
                                        {
                                            order.orderItems && order.orderItems.map((orderItem, index1) => {
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
                }
                <Footer/>
            </div>
        );
    }


}
