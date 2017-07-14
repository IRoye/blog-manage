//在view层  通过dispatch 触发一个action
/**
 *
 * Actions describe the fact that something happened,
 * but don't specify how the application's state changes in response.
 *  This is the job of reducers.
 *
 *
 * 也就是说， view层触发了action , action 执行了，然后更新了state,
 * 同时懈怠了新更新的数据。
 * 这个新更新的数据 + 原始的数据------ > reducer
 *
 * reducer 来根据type类型来判断到底是如何
 * 返回最后的状态。
 *
 *
 */

import axios from 'axios';
import {browserHistory} from 'react-router';

export function signin(user) {
    return dispatch => {
        axios
            .post(`http://192.168.0.105:8080/user/signin`, user)
            .then((res) => {
                console.log('登录后返回：', res);
                //    登录完成，将信息保存在localStorge中
                localStorage.setItem('userId', res.data._user.userId);
                dispatch({type: 'SIGN_IN', user: res.data._user.username})
                //跳转到首页
                console.log('登录之后跳转');
                browserHistory.push('/home');

            })
            .catch((err) => console.log(err));
    }
}

export function fetchUser() {
    return dispatch => {
        let userId = localStorage.getItem('userId');
        console.log('userId', userId);
        if (userId) {      
            axios
                .get(`http://192.168.0.105:8080/user/${userId}`)
                .then((res) => {
                    console.log('fetchUser:', res.data._user);
                    dispatch({type: 'LOAD_USER', user: res.data._user.username})
                    browserHistory.push('/home');
                })
                .catch((err) => console.log('报错：', err));
        }else{
            dispatch({type: 'LOAD_USER', user: ""})
        }
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('userId');
        dispatch({type: 'LOG_OUT', user: ""});
    }
}
