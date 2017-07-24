//  登录页面
import { browserHistory } from 'react-router'
import React,{Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionLock from 'material-ui/svg-icons/action/lock';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import axios from 'axios';
import './style/LoginPage.scss';
import store from './redux/store';
import classnames from 'classnames';

// 模拟redux 
// 导入action 里面的方法；
import { connect } from 'react-redux';
import {signin} from './redux/actions/accountActions';
 class LoginPage extends Component {

    constructor(props){
       super(props);
       this.state = {
           nameErrorVisible: false,
           passErrorVisible: false,
       };

    }

    onErrorChange(e){
        console.log('有没有执行',e.target);
        if(e.target && e.target.name === 'userpass'){ 
              this.setState({
              passErrorVisible: false,
          });
        }
        if(e.target && e.target.name === 'username'){ 
              this.setState({
              nameErrorVisible: false,
          });
        }
    }

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

    if(username === ''){
        this.setState({
            nameErrorVisible: true
        })
    }
    if(userpass === ''){
        this.setState({
            passErrorVisible: true
        })
    }

    if(username === '' || userpass === '' || userpass === ''&&username === ''){
       return false;
    }
    
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
        const nameErrorClass = classnames({
            'error' : true,
            'is-visible' : this.state.nameErrorVisible
        });
        const passErrorClass = classnames({
            'error' : true,
            'is-visible' : this.state.passErrorVisible
        });
        let cueerntUser  = store.getState();  
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
                           position:'relative',
                       }}>
                           {/* 图标 */}
                            <ActionAccountCircle style={{
                                verticalAlign: 'middle',
                                width: '10%',
                            }}/>
                            <input type="text" placeholder='电话或邮箱' id='username' name='username' ref='username' style={styles.input} onFocus={this.onErrorChange.bind(this)}/>
                            {/*   这个label 的默认高度其实和input 是一样的， 至少在这种情况下，   */}
                            <label className={nameErrorClass} style={
                                {
                                   position: 'absolute',
                                   top:'0',
                                   right: '8px',
                                   padding: '0 8px',
                                   lineHeight: '50px',
                                   color: '#c33',
                                   cursor: 'text',
                                   transition: '.25s ease-out',
                                   transform: 'translate(20px,0)',
                                   padding: '0 1rem',
                                }
                            }>请填写手机号或邮箱</label>
                       </div>
                       <div className='input-field' style={{
                           borderRadius: '0 0 4px 4px',
                           border: '1px solid #c8c8c8',
                           position : 'relative',
                       }}>
                           {/* 图标 */}
                           <ActionLock style={{
                              verticalAlign: 'middle',
                              width: '10%', 
                           }}/>
                           <input type="password" placeholder='密码' id='userpass' name='userpass' ref='userpass' style={styles.input} onChange={this.onErrorChange.bind(this)}/>
                           <label className={passErrorClass} style={{
                               position: 'absolute',
                               top: '0',
                               right: '8px',
                               lineHeight: '50px',
                               color: '#c33',
                               cursor: 'text',
                               transition: '.25s ease-out',
                               transform: 'translate(20px,0)',
                               padding: '0 1rem',
                           }}>请填写密码</label>
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
                       <input type='checkbox' defaultChecked='checked' id='remeber_me' name='remeber_me' ref='remember' onFocus={this.remeber.bind(this)} />
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
       currentUser: state.account.currentUser
}
};

LoginPage = connect(mapStateToProps, {signin})(LoginPage)
export default LoginPage;