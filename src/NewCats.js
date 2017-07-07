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
            dialogOpen: false
        }
    }

    componentWillMount() {}
    handleGetCats() {
        console.log('哈哈哈');
        axios
            .get(`${config.host}/catList`)
            .then((res) => this.setState({cats: res.data.cats}))
            .catch((err) => {
                //    暂时简略处理
                console.log('err', err);
            });
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log('hhhh:', this.refs.catName.getValue());
        let catName = this.refs.catName.getValue();
        if(catName === ''){

            this.setState({
                dialogOpen: true,
            });
            return false;
        }
        //TODO 把值清空
        this.refs.catName.value = '';
        let data = {
            tagName: catName
        };
        // 提交的时候组织成对象字面量
        axios
            .post(`${config.host}/cat`, data)
            .then((response) => {
                console.log('response:', response);
                //处理成功后, 获取最新的Cat 列表
                this.handleGetCats();
            })
            .catch((error) => {
                console.log(error);
            });

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
                    className='cat-items'
                    style={{
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
                <Dialog title="警告" actions={action} modal={true} open={this.state.dialogOpen}>
                    请输入分类内容
                </Dialog>
            </div>
        );
    }
}

export default NewCats;