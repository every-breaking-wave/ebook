import React from 'react';
import {List} from 'antd';
import Pubsub from 'pubsub-js'
import Book from './Book'
import {history} from "../utils/history";
import {getBooks} from "../services/bookService";
// import '../services/list.js'
import '../css/detail.css'
import { data } from 'jquery';



export default class BookList extends React.Component{

    
    constructor(props) {
        super(props);
    }

    state = {
        bookList:[],
         isFirst:true,
         isLoading:false,
         err:''
    }

    componentDidMount(){
        // this.props.history.push({pathname:`/book/${id}`})
        console.log("props = "+this.props)
        Pubsub.subscribe('searchBook',(_,stateObj)=>{
            console.log('收到书本数据!',stateObj);
            this.setState(stateObj)
        })
    }

    render() {
        const {bookList, isFirst, isLoading,err} = this.state;

        return (

            <List style={{marginLeft:100 ,marginTop:20}}
                grid={{gutter: 10, column: 4}}
                dataSource={this.state.bookList}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 16,
                }}

                renderItem={item => (
                    <List.Item>
                        <Book info={item} />
                    </List.Item>
                )}
            />
        );
    }
}


