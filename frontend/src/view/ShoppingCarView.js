import React from 'react';
import { Layout, Carousel } from 'antd'
import {Link, withRouter} from "react-router-dom";
import CarHead from "../components/ShoppingCar/CarHead";
import BookInCar from "../components/ShoppingCar/BookInCar";
import CarList from "../components/ShoppingCar/CarList";
import '../css/shoppingCar.css'
import '../css/base.css'
import { listBrand, listBrandInCar } from "../components/Brand";
import {getBook} from "../services/bookService";
import Pubsub from "pubsub-js";
import cookie from "react-cookies";
import {createOrder, createOrderItem} from "../services/createOrder";
import "../services/createOrder"
import {getCar} from "../services/shoppingCarService";
import axios from "axios";

export default class ShoppingCarView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { books:[], orderId:0 }
        // this.setState({ books: listBrand })
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    // 获取购物车内总价格
    // getNum = (bookNum) => {
    //     //获取新的priceSum
    //     //更新priceSum
    //     console.log("refresh")
    //     console.log(bookNum)
    //     // this.setState({num:bookNum})
    //     this.setState({ sum: listBrand[this.state.idNum - 1].price * bookNum })
    // }
    //

    componentDidMount(){

    }

    callback=(orderId)=>{
       this.setState({orderId:orderId})
        console.log(this.state.orderId)
    }

    createOrder(){
        const userAccount = cookie.load("userAccount")
        console.log(userAccount)
        //创建 order 并获得order的id
        const orderId = 0
        createOrder(userAccount,this.callback)
        axios.post(`/api/car/cartList`, {
        }).then(
            response => {
                console.log("请求成功", response.data);
                createOrderItem(response.data.bookInCarList,this.state.orderId)
            },
            error => { console.log("请求失败", error); }
        )
        // createOrderItem(this.state.books)
    }
    searchBooks = (bookName)=>{
        console.log("bookView"+bookName);
    }

    render() {
        this.componentDidMount()
        const bookList = this.state.books;
        console.log(this.props)
        console.log(bookList)
        // this.setState({sum:listBrand[bookId-1].price})
        return (
            <div>
                <CarHead />
                <div id="chekoutBody">
                    <div className="checkoutProduct t">
                        <div className="checkoutProductInfo c">
                            <div className="checkoutTable">
                                <input type={"checkbox"} className="checkBox checkIcon"></input>
                                <ul className="checkoutTableHeader">
                                    <li>全选</li>
                                    <li>商品信息</li>
                                    <li>单价（元）</li>
                                    <li>数量</li>
                                    <li>小计（元）</li>
                                    <li>操作</li>
                                </ul>

                                <div className="checkoutProductBody">
                                    <div className="productBodyItem">
                                        <CarList info={bookList}/>
                                        {/*<CarList/>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="checkSubmit" className="t">
                        <div className="checkSubmitInfo c">
                            <div className="checkSubmitInfoBooking">
                                <div className="checkSubmitInfoLeft l">
                                    <input type={"checkbox"} className="checkBox checkIcon l"></input>
                                    <a className="allClick">全选</a>
                                    <a className="allDelete">批量删除</a>
                                    <div className="split"></div>
                                    <a className="callService">联系客服</a>
                                </div>
                                <div className="checkSubmitInfoRight r">
                                    <ul>
                                        <li><span>已选{this.state.bookNum}件商品，合计<span className="pri" >￥{this.state.sum}</span></span></li>
                                        <li>
                                            <span>商品总额：<span className="pri" >￥{this.state.sum}</span></span>
                                            <div className="rightSave"><i></i><span>共节省：￥0.00</span></div>
                                        </li>
                                    </ul>
                                    <div className="rightSubmit r">
                                        <Link to="/car" onClick={this.createOrder.bind(this)}>
                                        立即结算
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="checkTab">
                        <div className="checkTabInfo t">
                            <div className="checkTabInfoContent c">
                                <div className="checkTabHeader">猜你喜欢</div>
                                <div className="checkTabInfoContentBody c">
                                    <div className="longBox">
                                    </div>
                                </div>
                                <div className="checkBtn">
                                    <div className="controlLeft l"></div>
                                    <div className="controlRight r"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

