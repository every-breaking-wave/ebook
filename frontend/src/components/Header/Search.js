import React, {Component} from 'react';
import {listBrand} from "../Brand";
import '../../css/header.css'
import '../../css/home.css'
import {Input, message} from "antd";
import Pubsub from 'pubsub-js'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {history} from "../../utils/history";
const {SearchInput} = Input
class Search extends Component {

    constructor(props) {
        super(props);
        // this.state  = {keyValue:"未输入"}
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(){
        const keyword = this.keyWordElement.value
        Pubsub.publish('searchBook',{isFirst:false,isLoading:true})
        if(keyword == null){
            axios.post(`/api/book/search`).then(
                response => {
                    console.log("请求成功", response.data);
                        if(response.data.bookList != null){
                            Pubsub.publish('searchBook',{isLoading:false, bookList: response.data.bookList})
                            message.info("ok")
                            history.push({ pathname: '/book' })
                        }
                },
                error => {
                    Pubsub.publish('searchBook',{err: error.message})
                 }
            )
        }
        else{
            axios.post(`/api/book/search/${keyword}`).then(
                response => {
                    console.log("请求成功", response.data);
                        if(response.data.bookList != null){
                            Pubsub.publish('searchBook',{isLoading:false, bookList: response.data.bookList})
                            message.info("ok")
                        }
                },
                error => {
                    Pubsub.publish('searchBook',{err: error.message})
                 }
            )
        }
    
    }

    render() {
        return (

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
                                <input ref={c => this.keyWordElement = c} type="text"
                                       placeholder="搜索你想要的书目"/>&nbsp;
                            </div>
                            <a onClick={this.handleSearch} className="searchButton">搜索</a>
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
            // <div className="searchBoxMain">
            //     <div className="searchBoxInput l">
            //         <input ref={c => this.keyWordElement = c} type="text" placeholder="搜索你想要的书目"/>&nbsp;
            //     </div>
            //     {/*<a href="#">*/}
            //     {/*    <div onClick={this.search} className="searchButton" >搜索</div>*/}
            //     {/*</a>*/}
            //     {/*<Input*/}
            //     {/*    placeholder="请输入用户名"*/}
            //     {/*    style={{ width: "230px" }}*/}
            //     {/*    ref={c => this.keyWordElement = c}*/}
            //     {/*    type="text"*/}
            //     {/*    onChange={(e) => this.handleSearch(e)}*/}
            //     {/*/>*/}
            //     <div onClick={this.search} className="searchButton" >搜索</div>
            //
            //     {/*<Input placeholder="input search loading with enterButton" loading enterButton />*/}
            // </div>
        );
    }
}

export default Search;
