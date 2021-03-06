// 编辑文章界面

import React,{Component} from 'react';
import {Link} from 'react-router';
import Radium from 'radium';
import axios from 'axios';
import config from './config/config';
import { browserHistory } from 'react-router';

class EditPost extends Component {

     constructor(props) {
        //初始化state，并且把props转化为state
        console.log('link 传递：', props.location);
        // 文章
        let postId  = props.location.query.id;
        super(props);
        this.state = {
            //初始化标签的状态
            tags: [],
            // 这个是所有的标签
            cats: [],
            postId: postId,
            post:{},
            content: '',
            title: '',
            general: '',
        }
    }
    componentWillMount() {
        // 初始化页面之前获取所有的标签列表
        this.getCats();
        //返回文章
        this.getPost(); 
    }
    handleSubmit(e) {
        e.preventDefault();
        // 获取标签的id 值
        const tags = this.state.tags;
        const title = this.state.title;
        const general = this.state.general;
        const content = this.state.content;
        this.editPost({tags, title, general,content});
    }
    // 获取所有的标签
    getCats() {
        axios
            .get(`${config.host}/catList`)
            .then((res) => {
                this.setState({cats: res.data.cats})
            })
            .catch(err => console.log(err))
    }
    handleInputChange(e){
        console.log('123', e.target.name);
        switch(e.target.name){
            case 'title':   
            this.setState({
            title: e.target.value,
        });break;
            case 'general':
            this.setState({
            general: e.target.value,
        });break;

            case 'content':
            this.setState({
            content: e.target.value,
        });break;
         default:
         this.setState({
        })          
        }
    }
    // 获取文章
    getPost(){
       axios.get(`${config.host}/post/getPost`,{
           params:{
               postId: this.state.postId
           }
       }).then((res) => {
                console.log('返回文章：', res.data);
                // 设置文章内容
                this.setState({
                    post: res.data.post,
                    tags: res.data.post.tags,
                    general: res.data.post.general,
                    content: res.data.post.content,
                    title: res.data.post.title,
                })
            })
            .catch(err => console.log(err))
    }
    //  提交修改后的文章
  editPost(data){
  axios.post(`${config.host}/post/editPost`, data).then(
      res => {
          console.log(res.data.message);
          //这种方式会把跳转载入浏览器历史
          browserHistory.push('/home');
      }
  ).catch(error => {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
  })
  }
    // 样式 
    getStyles() {
        return {
            form: {
                padding: '20px 40px'
            },
            div: {
                marginBottom: '10px'
            },
            label: {
                display: 'block',
                fontSize: '.9em',
                color: 'rgba(0,0,0,.6)',
                paddingBottom: '10px',
                width: '10%',
            },
            input: {
                width: '100%',
                height: '100%',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1em',
                padding: '10px',
                //元素的内边距和边框不会再增加元素的宽度
                boxSizing: 'border-box',
                ':focus': {
                    border: '1px solid #00bcd4',
                    outline: 'none' // outline （轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用
                }
            },
            actions: {
                textAlign: 'center'
            },
            button: {
                width: '120px',
                height: '36px',
                border: 'none',
                backgroundColor: '#ff4081',
                fontSize: '1em',
                color: '#fff',
                display: 'inline-block',
                margin: '20px auto 0',
                borderRadius: '20px',
                ':hover': {
                    cursor: 'pointer'
                },
                ':focus': {
                    outline: 'none'
                }
            },
            link: {
                display: 'inline-block',
                marginLeft: '15px',
                fontSize: '1em',
                color: '#00bcd4',
                opacity: '.8', // 1.0 是完全不透明
                textDecoration: 'none'
            }
        };
    }
    handleChange(e){
    const {value, checked} = e.target;
    let tags = this.state.tags;
    
    if(checked && tags.indexOf(value) === -1){
        tags.push(value);
    }else{
        tags = tags.filter(i => i != value);
    }
    this.setState({
        tags:tags
    });

    }
    render() {
        let {cats, tags, post}  = this.state;
        let title = post.title;
        console.log('post:', post.title);
        const styles = this.getStyles();
        let optionList = this.state.cats.map((item, i) => {
                let tag = item._id;
                return (
                    // 看来是每个子元素都要加一个  key{i}, react 才罢休
                    <label key = {i}>
                    <input type='checkbox' value={item._id} key={i} checked={tags.indexOf(tag) !== -1}
                    onChange={this.handleChange.bind(this)}/>
                        {item.tagName}
                    </label>
                )
            });
        return (
            <form
                style={styles.form} onSubmit={this
                .handleSubmit
                .bind(this)}>
                <div style={styles.div}>                    
                    {optionList}
                </div>
                <div style={styles.div}>
                    <label style={styles.label} >标题</label>
                    <input style={styles.input} key='1' name='title' ref='title' value={this.state.title} onChange={this.handleInputChange.bind(this)} />
                </div>
                <div style={styles.div}>
                    <label style={styles.label}>概要</label>
                    <textarea
                        style={styles.input}
                        rows='5'
                        name='general'
                        ref='general' value={this.state.general} onChange={this.handleInputChange.bind(this)} />
                </div>
                <div style={styles.div}>
                    <label style={styles.label}>内容</label>
                    <textarea
                        style={styles.input}
                        rows='20'
                        key='2'
                        name='content'
                        ref='content' value={this.state.content} onChange={this.handleInputChange.bind(this)} />
                </div>
                <div style={styles.actions}>
                    {/*  */}
                    <button type='submit' style={styles.button}>修改文章</button>
                    {/* 取消的时候直接把所有的页面元素给reset */}
                    <Link to='/' style={styles.link}>取消</Link>
                </div>
            </form>
        );
    }
}

// 让伪类这种， 起作用
export default Radium(EditPost);