import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from '../style/Navbar.scss';
import {Tabs, Tab} from 'material-ui/Tabs';
import { connect } from 'react-redux';
import {fetchUser, logout} from '../redux/actions/accountActions';
import { Link } from 'react-router';


class NavBar extends Component {

  // 1. 得有constructor
constructor(props, context) {
      super(props, context);
      this.context = context;
      this.state = {
          currentUser: ""
      }
   }
//组件挂载的时候
componentWillMount() {
    // 一开始的时候刷新页面获取用户名；
    this.props.fetchUser();
}
    componentDidMount() {
        let router = this.context.router;
        document.getElementById('navbar-header').addEventListener('click', function(e){
            if(e.target && e.target.nodeName === 'A'){
                // 单独加上router是不行的， 首先得有
                router.push(e.target.href);
            }
        })
    }
    getStyles(){
        return{
            root:{
               display:'flex',
               width: '100%',
               height: '52px',
               alignItems: 'center',
               margin :'0 auto',
               padding: '0 auto',
               boxShadow: '0 1px 1px #888888',
               zIndex: '102',
            },
            rootHeader :{
                color: '#8b96aa',
                width: '60%',
                backgroundColor: '#fff',
                boxSizing: 'boder-box',
                display: 'flex',
                fontSize: '1.1rem',
                justifyContent: 'space-between',
                height: '30px',
            }
        }
    }
    render() {
        //  这里是执行了 2 次， 猜测：第一次的时候，fetchUser 因为是异步函数， 此时还没有返回结果；
        //  此时的值显示是 undefined ， 第二次， fetchUser 返回执行结果， 
        //  props改变， 重新render(), 执行；
        //  但是第一次已经出错了。
        console.log('现在的用户名：', this.props);
        // 登录后显示
        const logoutLink = (
            <div>
              {this.props.currentUser}  
                {/* 用a 暂时没问题
                
                browser.js:49 Warning: A path must be pathname + search + hash only,
                 not a fully qualified URL like "http://localhost:3000"
                
                 */}
              <a href='/home' className='navbar-header-item' onClick={this.props.logout}>退出</a>
            </div>
        );
        // 登录前显示 
        const loginLink = (
            <div>
                {/*  之前用 <a> 标签放在loginLink 里面会发生乱跳转的情况 */}
              <Link className='navbar-header-item' to="/login">登录</Link>
              <Link className='navbar-header-item' to="/signup">注册</Link>
            </div>
        );
        const style = this.getStyles();
        // let user = this.props.currentUser;
        // console.log('重点：','类型', typeof user,  user);
    // 这里丫的， 就是不能获取对象的属性， 但通过Object.prototype.toString().call()
    // 的确是一个对象的存在。 
        return (
            <MuiThemeProvider>
                <div className="navbar-header" id='navbar-header' style={style.root}>
                    <Link  className='navbar-header-item' to="/home">首页</Link >
                    <Link  className='navbar-header-item' to="/newPost">新文章</Link >
                    <Link  className='navbar-header-item' to="#">归档</Link >
                    <Link  className='navbar-header-item' to="/tag">标签</Link >
                     {this.props.currentUser.length == 0 ? loginLink : logoutLink}
                </div>
            </MuiThemeProvider> 
        );
    }
}
// 2. router 类型声明
NavBar.contextTypes = {
    router: React.PropTypes.object.isRequired
};
// 这个函数允许我们将 store 中的数据作为 props 绑定到组件上:
//  影响的是当前的组件
const mapStateToProps = (state) => ({
       currentUser: state.account.currentUser ? state.account.currentUser: ""
});
//  将 action 作为 props 绑定到 NavBar 上
//  mapDispatchToProps
export default connect(mapStateToProps, {fetchUser, logout})(NavBar);