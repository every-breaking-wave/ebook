import React, {Component} from 'react';
import BookInCar from "./BookInCar";
import cookie from "react-cookies";
import { useCookies } from 'react-cookie';
import {listBrand} from "../Brand";
import {getBook} from "../../services/bookService";
import axios from "axios";
import {message} from "antd";
import {getCar} from "../../services/shoppingCarService";

class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {sum:0}
        this.state = {bookList:[]}
        // console.log(this.props.bookId)
        console.log(this.state.list)
    }

    callback=(bookInCarList)=>{
        this.setState({bookList:bookInCarList})
        console.log(this.state.bookList)
    }

    componentDidMount(){
       getCar(this.callback)
    }

    // getAllPrice() {
    //     //获取新的priceSum
    //     const newSum = price;
    //     //更新priceSum
    //     this.setState({sum:newSum})
    // }
    render() {
        // this.componentDidMount()
        const bookList = this.state.bookList || []
        // const bookList = cookie.loadAll().list;
        console.log(this.props)
        console.log(bookList)
        return (
            <div>
                {
                    bookList.map((item,index)=>
                        <div>
                            <BookInCar key={item+index} info={item}/>
                        </div>
                    )
                }
            </div>
        );

    }
}

export default CarList;
