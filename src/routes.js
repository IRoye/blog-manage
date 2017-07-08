// 
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import About from './About';
import Tag from './Tag';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
// 导出路由规则
export default(
  <Route path='/' component={App}>
     <Route path='/home' component={Home} />
     <Route path='/about' component={About} />
     {/* 标签 */}
     <Route path='/tag' component={Tag} />
     <Route path='/login' component={LoginPage} />
     <Route path='/signup' component={SignupPage} />
     {/* 默认子组件 */}
     <IndexRoute component={Home} />
  </Route>
);