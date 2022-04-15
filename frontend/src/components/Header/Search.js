// import React, {Component} from 'react';
// import {listBrand} from "../Brand";
//
// class Search extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state  = {keyValue:"未输入",list:listBrand}
//         this.search = this.search.bind(this)
//     }
//
//     onSearch(val){
//         let vals = val.trim().split(/\s+/g)
//         let list = this.state.list
//         // if(vals.length === 1 && vals[0] === ""){
//         //     // 说明是空格或者空字符串
//         //     list = initState.list
//         // }
//         vals.forEach(el => {
//             if(Number.isNaN(+el)){
//                 // 说明是字符串
//                 let reg = new RegExp(el, "g")
//                 // console.log(reg)
//                 // 一旦是字符串就根据商品的名称筛选
//                 list = list.filter(element => reg.test(element.name))
//             }else{
//                 // 说明是数字
//                 // 一旦是数字就根据商品的价格筛选
//                 let p = +el
//                 list = list.filter(element => element.price >= p)
//             }
//         })
//         this.setState({ list })
//     }
//
//     search(){
//         this.setState({keyValue:this.keyWordElement.value})
//         this.onSearch(this.state.keyValue);
//         this.props.getList(this.state.list);
//     }
//     render() {
//         const Key = this.state.keyValue;
//         return (
//             <div className="searchBoxMain">
//                 <div className="searchBoxInput l">
//                     <input ref={c => this.keyWordElement = c} type="text" placeholder="搜索你想要的书目"/>&nbsp;
//                 </div>
//                 <a href="#">
//                     <div onClick={this.search} className="searchButton" >搜索</div>
//                 </a>
//             </div>
//         );
//     }
// }
//
// export default Search;
