import React from "react";
import '../../css/base.css'
import '../../css/shoppingCar.css'


export default class BookInCar extends React.Component{
    constructor(props) {
        super(props);
        this.state  = {bookNum: 1}
        this.minValue = this.minValue.bind(this)
        this.addValue = this.addValue.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    addValue(){
        this.props.getNum(this.state.bookNum + 1)
        console.log("ref")
        this.setState({bookNum: this.state.bookNum + 1});
    }
    minValue(){
        if(this.state.bookNum === 1) {
            alert("书本数量最少为1");
        }
        else {
            this.props.getNum(this.state.bookNum - 1)
            this.setState({bookNum: this.state.bookNum - 1});
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

    hide(){

    }

    handleDelete(){
        this.props.removeBook([]);
    }

    render() {
        const {info} = this.props;
        const bookNum = this.state.bookNum;
        return(
            <div onClick={this.hide} className="productBodyItemContent">
                <input type={"checkbox"} className="checkBox checkIcon"></input>
                <a className="itemImg" href="">
                    <img src={`/assets/list/${info.src}`} alt="" className={"bookInCar"}/>
                </a>
                <div className="itemInfo">
                    <h5>《{info.name}》</h5>
                </div>
                <div className="itemInfoUnion1">
                    <span className="itemInfoUnionPice">{info.price}</span>
                </div>
                <div className="itemInfoUnion2">
                    <div className="itemInfoUnion2Module l">
                        <i onClick={this.minValue.bind(this)} className="itemInfoUnion2ModuleI l itemInfoUnion2ModuleI2">-</i>
                        <input   onChange={(e) => {this.changeNum(e);}}  type="text" className="itemInfoUnion2ModuleNum l" value={bookNum}/>
                        <i onClick={this.addValue.bind(this)} className="itemInfoUnion2ModuleI l itemInfoUnion2ModuleI2">+</i>
                    </div>
                </div>
                <div className="itemInfoUnion3">
                    <span className="sumNum"> {info.price * bookNum} </span>
                </div>
                <div className="itemInfoUnion4">
                    <i onClick={this.handleDelete} className="delete"> </i>
                </div>
            </div>
        )
    }
}
