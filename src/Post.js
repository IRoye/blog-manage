//  单篇文章展示页面

import React,{Component} from 'react';
import axios from 'axios';
import config from './config/config';

class Post extends Component {
    
    constructor(props){
      super(props);
      let id  = this.props.location.query.id; 
      this.state = {
          id: id,
          post: ''
      }     
    }

    componentDidMount() {
        console.log('进来了吗？');
        this.getPost();
        console.log('执行了吗？');
    }

    getPost(){
       axios.get(`${config.host}/post/getPost`, {
        params: {
             postId: this.state.id,
        }
       }).then((res) => {
                this.setState({post: res.data.post.content})
                console.log('返回的文章:', res.data.post.content);
            }).catch(err => console.log(err))
    }
    render() {
        return (
            <div className="class-name">
                {this.state.post}
            </div>
        );
    }
}

export default Post;