import React from 'react';
import {withRouter} from "react-router-dom";
import {Layout} from "antd";
import '../css/base.css'
import '../css/detail.css'
import '../css/FixedRight.css'
import HeaderL from "../components/Header/Header";
import Footer from "../components/Footer";
import BookDetail from "../components/BookDetail/BookDetail";
import {listBrand} from "../components/Brand";

const { Content } = Layout;

class BookView extends React.Component{

    constructor(props) {
        super(props);
         this.state = {idNum : 1};
         this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});
        const query = this.props.location.search;
        const arr = query.split('&');
        const bookId = arr[0].substr(4);
        this.setState({idNum:Number(bookId)});
    }

    searchBooks = (bookName)=>{
        console.log('bookView'+bookName);
    }

    render(){
        const bookId = this.state.idNum;
        return(
           <div style={{background:"white"}}>
               <Layout className="layout">
                    <div>
                   <HeaderL searchBooks = {this.searchBooks}/>
                    </div>
                   <Layout>
                       <Content style={{ padding: '0 50px' }}>
                           <div className="home-content">
                               <BookDetail info={listBrand[bookId - 1]} />
                               <div className={"foot-wrapper"}>
                               </div>
                           </div>
                       </Content>
                   </Layout>
               </Layout>
                <Footer/>
           </div>
        );
    }
}

export default withRouter(BookView);

