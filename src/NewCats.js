//  添加新的标签
import React, {Component} from 'react';
import axios from 'axios';
import config from './config/config';
import Chip from 'material-ui/Chip';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import CatWrapper from './components/CatWrapper';
import CatWrapperStyle from './style/CatWrapperStyle.scss';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class NewCats extends Component {
    constructor(props) {
        super(props);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            cats: [],
            dialogOpen: false,
            message: '',
        }
    }
    //刚进入这个页面的时候就显示列表标签
    componentWillMount() {
        this.handleGetCats();
    }
    handleGetCats() {
        axios
            .get(`${config.host}/catList`)
            .then((res) => this.setState({cats: res.data.cats}))
            .catch((err) => {
                //暂时简略处理
                this.setState({
                   dialogOpen: true,
                   message: err,
                });
            });
    }
    handleSubmit(e) {
        e.preventDefault();
        let catName = this.refs.catName.getValue();
        if(catName === ''){
            this.setState({
                dialogOpen: true,
                message: '请输入分类名称',
            });
            return false;
        }
        //TODO 把值清空
        this.refs.catName.value = '';
        let data = {
            tagName: catName
        };
        // 提交的时候组织成对象字面量
        axios.post(`${config.host}/cat`, data).then((response) => {
                let result = response.data;
                if(!result.code == '0'){
                    this.setState({
                    dialogOpen: true,
                    message: result.msg,
                });
            }
                 this.refs.catName.value = '';
                //处理成功后, 获取最新的Cat 列表
                this.handleGetCats();
            })

    }
    handleClose(){
        this.setState({
            dialogOpen: false,
        })
    }
    render() {
        // 模态窗按钮
        const action = [ < FlatButton label = "确定" primary = {
                true
            }
            onTouchTap = {
                this.handleClose.bind(this)
            } />
        ];
        let catList = this.state.cats.map((data, i) => {
                return (<CatWrapper key={i} name={data.tagName}/>)
            })
        return (
            <div className="new-cat">
                <div
                    className='cat-items' style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                    {catList}
                </div>
                <h1 className='new-cat-title'>新建分类</h1>
                <div className='container'>
                    <form>
                        <TextField ref='catName' id="text-field-controlled"/>
                        <RaisedButton  label="创建分类" primary={true} onClick={this.handleSubmit.bind(this)}
                        style={{
                            margin: 12
                        }}/>
                    </form>
                </div>
                {/* 模态框 */}
                <Dialog title="警告" children={ this.state.message } actions={action} modal={true} open={this.state.dialogOpen}>
                  { this.state.message }
                </Dialog>
            </div>
        );
    }
}

export default NewCats;