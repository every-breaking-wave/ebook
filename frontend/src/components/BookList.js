import React from 'react';
import {List} from 'antd'
import Book from './Book'
import {getBooks} from "../services/bookService";
// import '../services/list.js'
import '../css/detail.css'



export default class BookList extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List style={{marginLeft:100 ,marginTop:20}}
                grid={{gutter: 10, column: 4}}
                dataSource={this.props.info}
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


