import React from 'react';
import {Layout, Carousel} from 'antd'
import {withRouter} from "react-router-dom";
import CarHead from "../components/ShoppingCar/CarHead";
import BookInCar from "../components/ShoppingCar/BookInCar";
import CarList from "../components/ShoppingCar/CarList";
import '../css/shoppingCar.css'
import '../css/base.css'
import {listBrand,listBrandInCar} from "../components/Brand";

export default class ShoppingCarView extends React.Component{

    constructor(props) {
        super(props);
        this.state  = {num:1,books:[],idNum:1,sum:0}
        this.setState({books:listBrand})
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    // 获取购物车内总价格
    getNum = (bookNum) =>{
        //获取新的priceSum
        //更新priceSum
        console.log("refresh")
        console.log(bookNum)
        // this.setState({num:bookNum})
        this.setState({sum: listBrand[this.state.idNum-1].price * bookNum})
    }

    updateBooks = (bookList) =>{

    }

    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});
        const query = this.props.location.search;
        const arr = query.split('&');
        if(arr.length === 0){
            this.setState({idNum:-1})
        }
       else {
            const bookId = arr[0].substr(4);
            console.log(bookId)
            this.setState({idNum: Number(bookId)});
            this.setState({num:listBrand[this.state.idNum-1].price * this.state.num})
            console.log(listBrand[this.state.idNum - 1].price * this.state.num)
            console.log(this.state.num)
            console.log(this.state.idNum)
        }
    }


    render() {
        const bookId = this.state.idNum;
        console.log(bookId)
        // this.setState({sum:listBrand[bookId-1].price})
        return(
            <div>
                <CarHead/>
                <div id="chekoutBody">
                    <div className="checkoutProduct t">
                        <div className="checkoutProductInfo c">
                            <div className="checkoutTable">
                                <input type={"checkbox"}className="checkBox checkIcon"></input>
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
                                        <CarList  bookId={bookId} updateBooks={this.updateBooks.bind(this)} getNum={this.getNum.bind(this)}/>
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
                        <div className="rightSubmit r">立即结算</div>
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


// 优惠券组件
{/*<div id="checkoutCoupons">*/}
{/*    <div className="checkoutCouponsInfo t">*/}
{/*        <div className="CouponsInfoContent c">*/}
{/*            <p className="CouponsInfoContentH c">*/}
{/*                <span className="sp1">优惠券</span>*/}
{/*                <span className="sp2">了解优惠券</span>*/}
{/*                <span className="sp3">使用规则</span>*/}
{/*                <input type="button" value="+ 输入优惠码" />*/}
{/*            </p>*/}
{/*            <div className="CouponsInfoContentBody">*/}
{/*                <div className="couponBody">*/}
{/*                    <div className="couponNone"></div>*/}
{/*                    <span>您目前没有优惠券</span>*/}
{/*                </div>*/}
{/*            </div>*/}
{/*        </div>*/}
{/*    </div>*/}
{/*</div>*/}
