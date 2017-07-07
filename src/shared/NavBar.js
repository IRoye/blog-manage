import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from '../style/Navbar.scss';
import {Tabs, Tab} from 'material-ui/Tabs';

 class NavBar extends Component {

  // 1. 得有constructor
   constructor(props, context) {
      super(props, context);
      this.context = context;
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
        return (
            <MuiThemeProvider>
                <div className="navbar-header" id='navbar-header' style={style.root}>
                    <a className='navbar-header-item' href="/home">首页</a>
                    <a className='navbar-header-item' href="#">归档</a>
                    <a className='navbar-header-item' href="#">标签</a>
                    <a className='navbar-header-item' href="#">友链</a>
                    <a className='navbar-header-item' href="about">关于</a>
                </div>
            </MuiThemeProvider>
        );
    }
}
// 2. router 类型声明
NavBar.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default NavBar;