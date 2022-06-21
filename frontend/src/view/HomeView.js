import React from 'react';
import {Layout, message} from 'antd'
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
import Search from "../components/Header/Search";
import axios from "axios";
import Pubsub from "pubsub-js";
import {history} from "../utils/history";



class HomeView extends React.Component {


    constructor(props) {
        super(props);
        // this.state = {list: listBrand}
        // this.getSearchList = this.getSearchList.bind(this)
    }

    componentDidMount(){
        console.log(this.props)
        const {keyValue} = this.props.match.params
        console.log(keyValue)
        if(keyValue == "default"){
            axios.post(`/api/book/search/default`).then(
                response => {
                    console.log("请求成功", response.data);
                    if(response.data.bookList != null){
                        Pubsub.publish('searchBook',{isLoading:false, bookList: response.data.bookList})
                        history.push({ pathname: '/default' })
                    }
                },
                error => {
                    Pubsub.publish('searchBook',{err: error.message})
                }
            )
        }
        else{
            axios.post(`/api/book/search/${keyValue}`).then(
                response => {
                    console.log("请求成功", response.data);
                    if(response.data.bookList != null){
                        Pubsub.publish('searchBook',{isLoading:false, bookList: response.data.bookList})
                        history.push(`/${keyValue}`)
                    }
                },
                error => {
                    Pubsub.publish('searchBook',{err: error.message})
                }
            )
        }

        // let user = localStorage.getItem("user");
        // this.setState({user:user});
    }

    // search = (e) => {
    //     this.setState({list: listBrand})
    //     console.log(this.keyWordElement.value)
    //     var arr = this.state.list.filter((item, index) => item.name.indexOf(this.keyWordElement.value) > -1);
    //     this.setState(Object.assign({}, this.state, {
    //         list: arr
    //     }));
    //     // this.forceUpdate();
    //     console.log(this.state.list)
    // };

    render() {
        // const {bookList, isFirst, isLoading,err} = this.state;
        return (<Layout>
                <div style={{background: "white"}}>
                    <div>
                        <HeaderL/>
                    </div>

                    <div id="productCategory" className="t">
                        <div className="brandNav c" style={{border: 20}}>
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
                                    <span>价格</span>
                                </div>
                                <div className="checkTick l">
                                    <span>仅看有货</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <BookList/>
                        </div>
                    </div>
                    <Footer/>
                </div>

            </Layout>);
    }
}


export default HomeView;

