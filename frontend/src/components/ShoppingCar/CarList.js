import React, {Component} from 'react';
import BookInCar from "./BookInCar";
import {listBrand} from "../Brand";

class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {sum:0}
        this.state = {list:[listBrand[this.props.bookId - 1]]}
        console.log(this.props.bookId)
        console.log(this.state.list)
    }
    getNum = (bookNum) =>{
        //获取新的priceSum
        //更新priceSum
        console.log("refresh")
        this.props.getNum(bookNum)
    }
    removeBook = (list)=>{
        this.setState({list:[]})
        console.log(this.state.list)
    }

    // getAllPrice() {
    //     //获取新的priceSum
    //     const newSum = price;
    //     //更新priceSum
    //     this.setState({sum:newSum})
    // }
    render() {
        const id = this.props.bookId;
        return (
            <div>
                {
                    this.state.list.map((item,index)=>
                        <div>
                            <BookInCar info={item} getNum={this.getNum} removeBook={this.removeBook}/>
                        </div>
                    )
                }
            </div>
        );

    }
}

export default CarList;
