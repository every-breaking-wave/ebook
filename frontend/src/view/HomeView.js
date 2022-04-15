import React from 'react';
import {Layout} from 'antd'
import {withRouter} from "react-router-dom";
import {BookCarousel} from "../components/BookCarousel";
import {SearchBar} from "../components/SearchBar";
import BookList from "../components/BookList";
import HeaderL from "../components/Header/Header";
import Footer from "../components/Footer";
import "../components/Brand.js"
import '../css/list.css'
import '../css/base.css'
import '../css/home.css'
import {listBrand} from "../components/Brand";
import LeftNav from "../components/leftNav";


class HomeView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {list:listBrand}
        // this.getSearchList = this.getSearchList.bind(this)
        this.search  = this.search.bind(this);
    }

    // componentDidMount(){
    //     let user = localStorage.getItem("user");
    //     this.setState({user:user});
    // }

    search =(e)=>{
        this.setState({list:listBrand})
        console.log(this.keyWordElement.value)
        var arr = this.state.list.filter((item,index)=>item.name.indexOf(this.keyWordElement.value)>-1);
        this.setState(Object.assign({}, this.state, {
            list: arr
        }));
        this.forceUpdate();
        // console.log(this.state.list)
    };


    render(){
        const booklist = this.state.list;
        return(
            <Layout>
           <div style={{background:"white"}}  >
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
				<a href="#">帮助中心</a>
			</span>
		    </span>
                       </div>
                   </div>

                   <div id="search" className="t">
                       <div id="searchInfo" className="c">
                           <div className="searchIContent c">
                               <div className="searchIContentLogo l">
                                   <a href="/">
                                       {/*<img src={require("/../assets/header/logo.png")} width="230px" height="px"/>*/}
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
                                       <a href="/car">
                                           <em className="bagIcon"></em>
                                           购物车<span className="num">3</span>件
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


            <div id="productCategory" className="t">
                <div className="brandNav c" style={{border:20}}>
                    <ul className="navLeft l">
                        {/*<li><a href="#">首页</a></li>*/}
                    </ul>
                </div>

                <div id="sortProduct" className="t">
                    <div className="layout c">
                        <div className="sortProductLeft l">
                            <span className="sIcon1">综合</span>
                            <span>销量</span>
                            <span>新品</span>
                            <span>人气</span>
                            <span>价格</span>
                        </div>
                    </div>
                </div>

                <div id="sortProduct" className="fixedsort t">
                    <div className="layout c">
                        <div className="sortProductLeft l">
                            <span className="sIcon1">综合</span>
                            <span>销量</span>
                            <span>新品</span>
                            <span>人气</span>
                            <span>价格></span>
                        </div>
                        <div className="checkTick l">
                           <span>仅看有货</span>
                        </div>
                    </div>
                </div>

                <div>
                    <BookList info={booklist}/>
                </div>
            </div>
               <Footer/>
            </div>

            </Layout>
        );
    }
}




export default withRouter(HomeView);

