import React from 'react';
import {Descriptions, Button, Card} from 'antd';
import '../../css/bookDetail.css'
import Input from "./Input"
import {Link} from 'react-router-dom'
export default class BookDetail extends React.Component{


    render() {

        const {info} = this.props;

        if(info == null){
            return null;
        }

        return (
        <div id="productDetail t" style={{background:"white"}}>
            <div className="detailContent c">
                <div className="detailNav">
                    <a href="list.html">首页</a>
                    <span> > </span>
                    <a href="#">书本详情</a>
                </div>
                <div className="productImg">
                    {/*<div className="../assetsVideo"><div/>*/}
                        <img className="picture l" src={`/assets/list/${info.src}`} style={{width:300}}/>
                        <div className="bigImgVideo">
                            {/*<img className="bpicture" src={`/assets/list/${info.src}`}/>*/}
                        </div>
                        <div className="square"></div>

                </div>
                <div className="productInfo l">
                    <div className="productTitle l">
                        <div className="titleBox l">
                            <h1>{info.name}</h1>
                            <p className="p2">{info.description}</p>
                        </div>
                    </div>
                    <div className="productPrice l">
                        <p className="one l">价格</p>
                        <p className="three l">￥  {info.price}</p>
                        <p className="four l">新品</p>
                    </div>
                    <div className="activity l">
                        <p className="actTitle l">活动</p>
                        <p className="mainList l">满赠</p>
                        <p className="main l">购买任意儿童书目，赠送价值20元的儿童玩具</p>
                        <div className="salemain l">
                            促销详情
                            <i className="popup cant"></i>
                            <div className="popupInfo">
                                <div className="popupInfoContent">
                                    <div className="popupInfoContentT">
                                        <span className="popupInfoContentText1">满赠</span>
                                        <span
                                            className="popupInfoContentText2">购买任意书目满300元，赠送价值50元的儿童玩具。限量1000份，赠完即止</span>
                                    </div>
                                    <div className="popupProduct">
                                        <span className="popupProductT">赠品档位一: 满300即可获赠1件赠品</span>
                                    </div>
                                    <div className="popupProductList">
                                        <div className="popupProductListDetail">
                                            <img src="../../assets/detail/lego.jpg"/>
                                            <span>X1</span>
                                        </div>
                                        <div className="popupProductListBottom">
                                            <span>玩具</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="size l">
                        <p className="actTitle l">状态</p>
                        <p className="size1 l"><a href="#">有货</a></p>
                    </div>
                    <div className="goButton l">
                        <div className="number l">

                           <Input />

                            {/*<div className="arrow l">*/}
                            {/*    <div className="topArrow">*/}
                            {/*        <div className="icon1"></div>*/}
                            {/*    </div>*/}
                            {/*    <div className="bottomArrow l">*/}
                            {/*        <div className="icon2 l"></div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                        <div className="addCar l">

                            <Link to={{
                                pathname: '/car',
                                search: '?id=' + info.id}}
                                  target="_blank"
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
