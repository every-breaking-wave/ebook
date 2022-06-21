import React from "react";
import '../../css/base.css'
import '../../css/shoppingCar.css'
import '../../services/shoppingCarService'
import {addCar, changeCar, delCar, minCar} from "../../services/shoppingCarService";
import * as util from "util";
import {InputNumber,Checkbox} from "antd";


export default class BookInCar extends React.Component{
    constructor(props) {
        super(props);
        this.state  = {utils: 1,num:1}
        this.minValue = this.minValue.bind(this)
        this.addValue = this.addValue.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    onChange(value) {
        console.log('changed', value);
        changeCar(value,this.props.info.bookId)
        this.setState({num:value})
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

    changeNum = (e)=>{
        if(e.target.value <= 0) alert("书本数量最少为1")
        else {
            this.props.getNum(e.target.value)
            this.setState({
                num: e.target.value
            })
        }
    }

    componentWillMount() {
        const {info} = this.props
        this.setState({
            num: info.countInCar
        } )
        console.log(info)
    }


    handleDelete(){
        this.onChange(0)
    }

    render() {
        console.log(this.props)
        const {info} = this.props;
        return(
            <div onClick={this.hide} className="productBodyItemContent">
                {/*<input type={"checkbox"} className="checkBox checkIcon"></input>*/}
                <Checkbox defaultChecked={false} diabled />
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
                        <InputNumber min={1} max={10} defaultValue={this.state.num} onChange={this.onChange.bind(this)} size={"normal"}/>
                    </div>
                </div>
                <div className="itemInfoUnion3">
                    <span className="sumNum"> {info.price * 10 * this.state.num / 10} </span>
                </div>
                <div className="itemInfoUnion4">
                    <i onClick={this.handleDelete.bind(this)} className="delete"> </i>
                </div>
            </div>
        )
    }
}
