// 
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import About from './About';
import Tag from './Tag';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { Router, browserHistory } from 'react-router';
import newPost from './newPost';
import Post from './Post';
import EditPost from './EditPost';
//导出路由规则

//定义路由的中间件


function requireAuth(nextState, replace) {
  if (!localStorage.getItem('userId')) {
    replace({
      pathname: '/login'
    })
  }
}

export default function getRoutes(){
  return(
  <Router history={browserHistory}>
  <Route path='/' component={App}>
     <Route path='/home' component={Home} />
     <Route path='/about' component={About} />
     {/* 标签 */}
     <Route path='/tag' onEnter={requireAuth} component={Tag} />
     {/*  新建文章  */}
     <Route path='/newPost' component={newPost} />
     <Route path='/login' component={LoginPage} />
     <Route path='/signup' component={SignupPage} />
     <Route path='/post' component={Post} />
     <Route path='/editPost' component={EditPost} />
     {/* 默认子组件 */}
     <IndexRoute component={Home} />
  </Route>
  </Router>
  );
}