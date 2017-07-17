/**
 * 折叠文章， 首页展示文章列表是不需要
 * 
 * markdown 的样式   文章详细页面的时候使用
 */
import React,{Component} from 'react';
import FoldingStyles from './style/Folding.scss';
import {Link} from 'react-router';
import config from './config/config';

export default class Folding extends Component {

    getStyles(){
        return{
            root:{
                textAlign: 'left',
            },
            content: {
                position:'relative',
                color: '#696969',
                margin: '1rem auto',
                borderBottom : '1px solid #ddd',
                paddingBottom: '1rem',
                width: '80%',
                cursor: 'pointer',
            },
            time:{
                fontSize: '.5rem',
                fontWeight: '300', //定义粗细， 400是normal ， 700是bold
            }
        }
    }
    render() {
        const styles = this.getStyles();
        const {title, content, brief, id} = this.props;
        return (
            <div className="app-fold" style={styles.root}>
                <div className='app-flod-content' style={styles.content}>
                    <h3>
                        <div className='main'>
                            {title}
                            <div className='time' style={styles.time}>
                                7 小时前
                            </div>
                        </div>
                    </h3>
                    {/* h3 标题下的内容 */}
                    <div className='summary' style={{
                        fontSize: '.85rem',
                        fontWeight: '300',
                        width: '90%',
                        marginTop: '1rem',
                    }}>
                        {content}
                    <Link to={{ pathname: '/post', query: { id: id } }} className='btn-hover' style={{
                        float: 'right',
                        color: '#4D85D1',
                        padding: '0.3rem 1rem'
                    }}><span>继续阅读</span></Link> 
                    </div>                   
                </div>
            </div>
        );
    }
}