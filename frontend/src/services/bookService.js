import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";
import {listBrand} from "../components/Brand";
import axios from "axios";
import Pubsub from "pubsub-js";
import {message} from "antd";

export const getBook = (id, callback) => {

    axios.post(`/api/book/getbook/${id}`).then(
        response => {
            console.log("id ="+id)
            console.log("请求成功", response.data);
            if(response.data != null){
                // Pubsub.publish('BookDetail',{isLoading:false, bookList: response.data.bookList})
                const book  = response.data.book;
                // history.push({ pathname: '/book' })
                // console.log({callback})
                callback(book);
            }
        },
        error => {
            Pubsub.publish('searchBook',{err: error.message})
        }
    )
};

export const getBooks = (id, callback) => {

    axios.post(`/api/book/getbooks/${id}`).then(
        response => {
            console.log("id ="+id)
            console.log("请求成功", response.data);
            if(response.data != null){
                // Pubsub.publish('BookDetail',{isLoading:false, bookList: response.data.bookList})
                const book  = response.data.book;
                // history.push({ pathname: '/book' })
                console.log({callback})
                callback(book);
            }
        },
        error => {
            Pubsub.publish('searchBook',{err: error.message})
        }
    )
};


