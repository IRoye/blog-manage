// 注册页面
import { browserHistory } from 'react-router'
import React,{Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionLock from 'material-ui/svg-icons/action/lock';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import axios from 'axios';
export default class LoginPage extends Component {
    handleSubmit(e){
    // 之前为什么不执行，是因为没有阻止默认的提交事件
    e.preventDefault();	
    let params = new URLSearchParams();
    // 获取数据 username, userpass, 这样直接取得是dom 结构

    console.log('refs:', this.refs);

    let username = this.refs.username.value;
    let userpass = this.refs.userpass.value;
    let tel = this.refs.tel.value;
    
    params.append('username', username);
    params.append('userpass', userpass);
    params.append('tel', tel);

    axios.post(`http://localhost:8080/user/signup`, params).then((data) => {
        console.log('注册返回：', data);
        //code, msg
        if(data.data.code === '0'){
            //页面跳转
            // 组件外部使用导航；
           browserHistory.push('/home');
        }    
    })

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
        const styles = this.getStyles();
        return (
            <MuiThemeProvider>
            <div className="login-body" style={{
                backgroundColor: '#f0f0f0',
                minHeight: '100vh',
            }}>
               {/* 登录的div */}
               <div className='login-content' style={{
                   boxShadow: '0 0 8px rgba(0,0,0,.1)',
                   borderRadius: '4px',
                   backgroundColor: '#fff',
                   width: '400px',
                   height: '70%',
                   position:'absolute',
                   margin: 'auto',
                   left: '0',
                   top: '0',
                   right: '0',
                   bottom : '0',
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
                       注册
                   </div>
               </h4>
              {/* 登录表单 */}
              <div className='sign-in-container' style={{
                  width: '80%',
                  // 可以使div 子元素居中
                  margin: '0 auto',
              }}>
                  <form  onSubmit={this.handleSubmit.bind(this)}>
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
                            <input type="text" placeholder='昵称' id='username' name='username' ref='username' style={styles.input}/>
                       </div>
                       <div className='input-field' style={{
                           border: '1px solid #c8c8c8',
                           borderBottom: 'none',
                       }}>
                           {/* 图标 */}
                            <ActionAccountCircle style={{
                                verticalAlign: 'middle',
                                width: '10%',
                            }}/>
                            <input type="text" placeholder='手机号' id='tel' name='tel' ref='tel' style={styles.input}/>
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
                        }}>注册遇到问题？</a>
                    </div>
                    <input type='submit' value='注册'
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
                    }} />
                  </form> 
              </div>
             </div> 
            </div> 
            </MuiThemeProvider>
        );
    }
}