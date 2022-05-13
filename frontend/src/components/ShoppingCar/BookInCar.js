import React from "react";
import '../../css/base.css'
import '../../css/shoppingCar.css'
import '../../services/shoppingCarService'
import {addCar, delCar, minCar} from "../../services/shoppingCarService";
import * as util from "util";


export default class BookInCar extends React.Component{
    constructor(props) {
        super(props);
        this.state  = {utils: 1}
        this.minValue = this.minValue.bind(this)
        this.addValue = this.addValue.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    addValue(){
        addCar(this.props.info.id)
        this.setState({utils: !util})
        console.log(this.state.utils)
        // this.props.refresh()

    }
    minValue(){
        if(this.props.info.countInCar === 1) {
            alert("书本数量最少为1");
        }
        else {
            minCar(this.props.info.id)
            this.setState({utils: !util})
            console.log(this.state.utils)
            // this.props.refresh()
        }
    }
    changeCheck(){

    }
    changeNum = (e)=>{
        if(e.target.value <= 0) alert("书本数量最少为1")
        else {
            this.props.getNum(e.target.value)
            this.setState({
                bookNum: e.target.value
            })
        }
    }


    handleDelete(){
        delCar(this.props.info.id)
        this.setState({utils:1})
    }

    render() {
        console.log(this.props)
        const {info} = this.props;
        const bookNum = this.state.bookNum;
        return(
            <div onClick={this.hide} className="productBodyItemContent">
                <input type={"checkbox"} className="checkBox checkIcon"></input>
                <a className="itemImg" href="">
                    <img src={info.cover} alt="" className={"bookInCar"}/>
                </a>
                <div className="itemInfo">
                    <h5>《{info.bookName}》</h5>
                </div>
                <div className="itemInfoUnion1">
                    <span className="itemInfoUnionPice">{info.price}</span>
                </div>
                <div className="itemInfoUnion2">
                    <div className="itemInfoUnion2Module l">
                        <i onClick={this.minValue.bind(this)} className="itemInfoUnion2ModuleI l itemInfoUnion2ModuleI2">-</i>
                        <input   onChange={(e) => {this.changeNum(e);}}  type="text" className="itemInfoUnion2ModuleNum l" value={info.countInCar}/>
                        <i onClick={this.addValue.bind(this)} className="itemInfoUnion2ModuleI l itemInfoUnion2ModuleI2">+</i>
                    </div>
                </div>
                <div className="itemInfoUnion3">
                    <span className="sumNum"> {info.price * info.countInCar} </span>
                </div>
                <div className="itemInfoUnion4">
                    <i onClick={this.handleDelete.bind(this)} className="delete"> </i>
                </div>
            </div>
        )
    }
}
