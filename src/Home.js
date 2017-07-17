import React, {Component} from 'react';
import BlogMain from './BlogMain';
import Folding from './Folding';
import axios from 'axios';
import config from './config/config';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentWillMount() {
        this.getPosts();
    }

    getPosts() {
        axios.get(`${config.host}/post/getPosts`).then((res) => {
                this.setState({posts: res.data.posts})
            }).catch(err => console.log(err))
    }
    render() {
        console.log(this.state.posts);
        let posts = this.state.posts.map((item, i) => {
            return (
            <div className="class-name" key={i}>
                <Folding key={i} id= {item._id} title={item.title} content={item.content} brief={item.content}/>
            </div>
        );
        });
        return (
            <div className="class-name">
               {posts}
            </div>
        );
    }
}