import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from '../style/Navbar.scss';
import {Tabs, Tab} from 'material-ui/Tabs';
import { connect } from 'react-redux';
import {fetchUser, logout} from '../redux/actions/accountActions';

class NavBar extends Component {

  // 1. 得有constructor
constructor(props, context) {
      super(props, context);
      this.context = context;
   }
//组件挂载的时候
componentWillMount() {
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
        const style = this.getStyles();
        // let user = this.props.currentUser;
        // console.log('重点：','类型', typeof user,  user);
    //  这里丫的， 就是不能获取对象的属性， 但通过Object.prototype.toString().call()
    // 的确是一个对象的存在。 
        return (
            <MuiThemeProvider>
                <div className="navbar-header" id='navbar-header' style={style.root}>
                    <a className='navbar-header-item' href="/home">首页</a>
                    <a className='navbar-header-item' href="#">归档</a>
                    <a className='navbar-header-item' href="/tag">标签</a>
                    <a className='navbar-header-item' href="/login">登录</a>
                     <a className='navbar-header-item' href="/signup">注册</a>
                     {this.props.currentUser}
                     <a className='navbar-header-item' href='/' onClick={this.props.logout}>退出</a>
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
const mapStateToProps = (state) => {
   return{
       currentUser: state.account.currentUser
}
};
//  将 action 作为 props 绑定到 NavBar 上
//  mapDispatchToProps
export default connect(mapStateToProps, {fetchUser, logout})(NavBar);