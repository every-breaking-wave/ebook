import React from 'react';
import { Card } from 'antd';
import {Link} from 'react-router-dom'
// import '../css/list.css'
// import '../css/base.css'
const { Meta } = Card;

export default class Book extends React.Component{


    render() {

        const {info} = this.props;

        return (
            <Link to={{
                pathname: '/book',
                search: '?id=' + info.id}}
                  target="_blank"
            >
                <Card
                    hoverable           
                    style={{width: 181}}
                    // cover={<img alt="image" src={require("../assets/list/list_img1.jpg")} className={"bookImg"}/>}?
                    cover={<img alt="image"  src={`/assets/list/${info.src}`} className={"bookImg"}/>}
                    // onClick={this.showBookDetails.bind(this, info.bookId)}
                >
                    <Meta title={info.name} description={info.price}/>
                </Card>
            </Link>
        );

        // );
    }

}

