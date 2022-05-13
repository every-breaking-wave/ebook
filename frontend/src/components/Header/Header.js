
import React from "react";
import '../../css/header.css'
import '../../css/base.css'
import LeftNav from "../leftNav";
import {listBrand} from "../Brand";
import {logout} from "../../services/userService";
import axios from "axios";
import {message} from "antd";


class HeaderL extends React.Component{

    constructor(props) {
        super(props);
        this.state = {list:[]};
        this.search = this.search.bind(this);
        // this.onSearch = this.onSearch.bind(this);
        // this.props.getSearchList(this.state.list);
    }

    search =(e)=>{
       var arr = this.state.list.filter((item,index)=>item.name.indexOf(e.target.value)>-1);
       this.setState({list:arr});
    };

    handleOnclick(){
        axios.post(`/api/car/cartList`, {
        }).then(
            response => {
                console.log("请求成功", response.data);
                message.info("购物车添加成功")
                // let { history } = this.props
                // onLogin(response.data.userAccount)
                // history.push({ pathname: '/car' })

                // else message.error("登录失败：用户不存在或密码错误")
            },
            error => { console.log("请求失败", error); }
        )
    }

    render() {

        return(

     <div>
        <div id="headTop" className="t">
              <div id="topContent" className="c">
		      <span className="topContentLeft l">
			  <span className="a1">欢迎来到EBook</span>
			  <a href='/login'>请登录</a>
			  <a href="">免费注册</a>
			  <a href="#">手机验证码登录</a>
		</span>
                <span className="topContentRight r"><span>
				<span className="icon1"></span>
				<a href="#" className="a1">我的EBook</a>
				<span className="icon2"></span>
				<ul className="icon2Hover">
					<li>
						<a href="#">我的订单</a>
					</li>
				</ul>
			</span>
			<span>
				<span className="icon4"></span>
				<a href="#" className="a1">手机书店</a>
			</span>
			<span>
				<a href="#">阅读计划</a>
			</span>
			<span>
				<a  onClick={logout} href="#">退出登录</a>
			</span>
		</span>
                </div>
            </div>

        <div id="search" className="t">
            <div id="searchInfo" className="c">
                <div className="searchIContent c">
                    <div className="searchIContentLogo l">
                        <a href="/">
                            <img src={require("../../assets/header/logo.png")} width="230px" height="px"/>
                        </a>
                    </div>
                    <div className="searchBox l">

                        {/*search功能*/}

                        <div className="searchBoxMain">
                            <div className="searchBoxInput l">
                                <input ref={c => this.keyWordElement = c} type="text" placeholder="搜索你想要的书目"/>&nbsp;
                            </div>
                                <a onClick={this.search.bind(this)} className="searchButton" >搜索</a>
                        </div>

                        <ul className="searchBoxKey">
                            <a href="">三体</a>
                            <a href="">冰菓</a>
                            <a href="">X的悲剧</a>
                            <a href="">Y的悲剧</a>
                            <a href="">Z的悲剧</a>
                            <a href="">射雕英雄传</a>
                            <a href="">神雕侠侣</a>
                            <a href="">倚天屠龙记</a>
                        </ul>
                    </div>

                    <div className="searchIContentBag r">
                        <div className="searchIContentBag01 r">
                            <a href="/car" onClick={this.handleOnclick.bind(this)}>
                                <em className="bagIcon"></em>
                                购物车<span className="num"></span>
                            </a>
                        </div>
                        <div className="searchIContentBag02 r">
                            <div className="searchIContentDown">
                                <div className="notLogin">
                                    <em></em>
                                    <span>购物车内暂时没有商品，登录后将显示您之前加入的商品</span>
                                    <a href="/car">查看</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="navigaition" className="t">
            <div id="navInfo" className="c">
                <div className="navInfoContent c">
                    <div className="navInfoMenu l">
                        <p className="navInfoMenuA">全部商品类目</p>
                        <div className="navInfoMenuD l">
                            <em className="heart"></em>
                            <ul className="leftMenu">
                                <LeftNav cato="诗书古籍/经典文著" cato1="诗" cato2="书" cato3="礼" cato4="易" cato5="乐" cato6="春秋"/>
                                <LeftNav cato="期刊/报纸" cato1="诗" cato2="书" cato3="礼" cato4="易" cato5="乐" cato6="春秋"/>
                                <LeftNav cato="小说/文学" cato1="诗" cato2="书" cato3="礼" cato4="易" cato5="乐" cato6="春秋"/>
                                <LeftNav cato="历史/地理/艺术" cato1="诗" cato2="书" cato3="礼" cato4="易" cato5="乐" cato6="春秋"/>
                                <LeftNav cato="哲学/心理/宗教" cato1="诗" cato2="书" cato3="礼" cato4="易" cato5="乐" cato6="春秋"/>
                            </ul>
                            <em className="heart01"></em>
                        </div>
                    </div>
                    <div className="navHoverInfoC">
                        <ul className="InfoC">
                            <li className="InfoC00"><a href="#">畅销榜单</a></li>
                            <li className="InfoC00"><a href="#">独家发售</a></li>
                            <li className="InfoC00"><a href="#">礼物套装</a></li>
                            <li className="InfoC00">
                                <a href="#">全部品牌</a>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
        )
    }
    }

export default HeaderL




