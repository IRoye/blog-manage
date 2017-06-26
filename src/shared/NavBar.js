import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from '../style/Navbar.scss';

export default class NavBar extends Component {
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
                <div className='navbar' >
                <div className="navbar-header" style={style.root}>
                    <a className='navbar-header-item' href="#">首页</a>
                    <a className='navbar-header-item' href="#">归档</a>
                    <a className='navbar-header-item' href="#">标签</a>
                    <a className='navbar-header-item' href="#">友链</a>
                    <a className='navbar-header-item' href="#">关于</a>
                </div>
                </div>
            </MuiThemeProvider>
        );
    }
}