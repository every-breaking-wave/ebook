import React from 'react';
import {Descriptions, Button, Card, InputNumber, message} from 'antd';
import '../../css/bookDetail.css'
import Input from "./Input"
import {Link} from 'react-router-dom'
import cookie from 'react-cookies'
import {getBook} from "../../services/bookService";
import Pubsub from "pubsub-js";
import axios from "axios";
import {onLogin} from "../../services/userService";


export default class BookDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {book: null, num: 1, carId: 0};
    }

    onChange(value) {
        console.log('changed', value);
        this.setState({num: value})
    }

    handleClick() {
        const userId = cookie.load("userId")
        console.log(userId)
        // console.log(this.props.info.id)
        axios.post(`/api/car/addCart`, {
            bookId: this.props.info.id,
            count: this.state.num,
            userId: userId
        }).then(
            response => {
                console.log("请求成功", response.data);
                message.info("购物车添加成功")
            },
            error => {
                console.log("请求失败", error);
            }
        )
    }


    render() {
        const {info} = this.props;
        // const {book} = this.state;
        console.log(this.props);
        console.log(this.state);
        console.log({info})
        // const {id} =  this.props.match.params;
        if (info == null) {
            return null;
        }
        // getBooks(id,book);

        return (
            <div id="productDetail t" style={{background: "white"}}>
                <div className="detailContent c">
                    <div className="productImg">
                        {/*<div className="../assetsVideo"><div/>*/}
                        <img className="picture l" src={info.cover} style={{width: 300}}/>
                        <div className="bigImgVideo">
                            {/*<img className="bpicture" src={`/assets/list/${info.src}`}/>*/}
                        </div>
                        <div className="square"></div>

                    </div>
                    <div className="productInfo l">
                        <div className="productTitle l">
                            <div className="titleBox l">
                                <h1>{info.bookName}</h1>
                                <p className="p2">{info.bookDesciption}</p>
                            </div>
                        </div>
                        <div className="productPrice l">
                            <p className="one l">价格</p>
                            <p className="three l">￥ {info.price}</p>
                            <p className="four l">新品</p>
                        </div>

                        <div className="size l">
                            <p className="actTitle l">状态</p>
                            <p className="size1 l"><a href="#">{info.inventory > 0 ? ("有货") : ("缺货")}</a></p>
                        </div>
                        <div>


                            <div className="goButton l">
                                {/*<div className="number l">*/}
                                <InputNumber min={1} max={10} defaultValue={1} onChange={this.onChange.bind(this)}
                                             size={"large"}/>

                            </div>

                            <div className="addCar l" style={{marginTop: 20, marginLeft: 20}}>

                                <Link to={`/car`}
                                      // target="_blank"
                                      onClick={this.handleClick.bind(this)}
                                >
                                    <p>
                                        加入购物车
                                    </p>
                                </Link>
                                <div className="goCar l"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        )

    }

}
