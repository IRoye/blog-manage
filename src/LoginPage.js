//  登录页面
import { browserHistory } from 'react-router'
import React,{Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionLock from 'material-ui/svg-icons/action/lock';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import axios from 'axios';
import './style/LoginPage.scss';
import store from './redux/store';

// 模拟redux 
// 导入action 里面的方法；
import { connect } from 'react-redux';
import {signin} from './redux/actions/accountActions';
 class LoginPage extends Component {
    //记住我
    remeber(){
      
    }
    handleSubmit(e){
    // 之前为什么不执行，是因为没有阻止默认的提交事件
    e.preventDefault();	

    let params = new URLSearchParams();
    // 获取数据 username, userpass, 这样直接取得是dom 结构
    let username = this.refs.username.value;
    let userpass = this.refs.userpass.value;
    
    params.append('username', username);
    params.append('userpass', userpass);

    this.props.signin(params);

}
    getStyles(){
        return {
            input : {
                width: '89%',
                display: 'inline-block',
                height: '50px',
                fontSize: '.9rem',
                outline: 'none',
                border: 'none',
            }
        }
    }

    render() {
        let cueerntUser  = store.getState();
        console.log('有没有传递给登录页面呀？', cueerntUser);   
        const styles = this.getStyles();
        return (
            <MuiThemeProvider>
            <div className="login-body" style={{
                backgroundColor: '#f0f0f0',
                width:'100%',
                height: 'calc(100vh - 64px)',
                display: 'flex',
                justifyContent: 'center',
            }}>
               {/* 登录的div */}
               <div className='login-content' style={{
                   boxShadow: '0 0 8px rgba(0,0,0,.1)',
                   borderRadius: '4px',
                   backgroundColor: '#fff',
                   alignItems: 'center',
               }}>
               {/* 登录的标题 */}
               <h4 className='title' style={{
                   color: '#969696',
                   margin: '0 auto 50px',
                   padding: '5px',
               }}>
                   <div className='normal-title' style={{
                       textAlign: 'center',
                       marginTop: '40px',
                   }}>
                       登录
                   </div>
               </h4>
              {/* 登录表单 */}
              <div className='sign-in-container' style={{
                  width: '80%',
                  // 可以使div 子元素居中
                  margin: '0 auto',
              }}>
                  <form >
                       {/* 每一个输入项是一个div */}
                       <div className='input-field' style={{
                           borderRadius: '4px 4px 0 0',
                           border: '1px solid #c8c8c8',
                           borderBottom: 'none',
                       }}>
                           {/* 图标 */}
                            <ActionAccountCircle style={{
                                verticalAlign: 'middle',
                                width: '10%',
                            }}/>
                            <input type="text" placeholder='电话或邮箱' id='username' name='username' ref='username' style={styles.input}/>
                       </div>
                       <div className='input-field' style={{
                           borderRadius: '0 0 4px 4px',
                           border: '1px solid #c8c8c8',
                       }}>
                           {/* 图标 */}
                           <ActionLock style={{
                              verticalAlign: 'middle',
                              width: '10%', 
                           }}/>
                           <input type="password" placeholder='密码' id='userpass' name='userpass' ref='userpass' style={styles.input}/>
                       </div>
                    {/* 记住我 */}
                    <div className='remember-btn' style={{
                        fontSize: '.9rem',
                        color: '#969696',
                        width: '45%',
                        float: 'left',
                        textAlign: 'left',
                        marginTop: '1rem',
                        marginBottom: '2rem',
                    }}>
                       <input type='checkbox' defaultChecked='checked' id='remeber_me' name='remeber_me' ref='remember' onChange={this.remeber.bind(this)} />
                       <span>记住我</span>
                    </div>
                    {/* 登录遇到问题 */}
                    <div className='forget-btn' style={{
                        width: '45%',
                        float: 'right',
                        textAlign:'right',
                         marginTop: '1rem',
                         marginBottom: '2rem',
                    }}>
                        <a style={{
                          fontSize: '.9rem',
                          color: '#969696',
                          textDecoration: 'none',
                          cursor: 'pointer',  
                        }}>登录遇到问题？</a>
                    </div>
                    <input type='button' value='登录'
                    style={{
                        boxSizing:'content-box',    
                        display: 'block',
                        width: '80%',
                        padding: '9px 18px',
                        fontSize: '1rem',
                        margin: 'auto',
                        verticalAlign: 'middle',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: '#3194d0',
                        color: '#fff', 
                        outline: 'none',                    
                    }} 
                    onClick = {this.handleSubmit.bind(this)}
                    />
                  </form> 
                  <div className='clear-me'></div>
              </div>
             </div> 
            </div> 
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
   return{
       currentUser: state.currentUser
}
};

LoginPage = connect(mapStateToProps, {signin})(LoginPage)
export default LoginPage;