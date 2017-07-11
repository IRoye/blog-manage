import { createStore, compose } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';


//只在声明所在的块级作用域内有效,
//声明的常亮是不提升的
const defaultState = {
    
}

// createStore 参数之前只是一个reducer， 
// 第二个参数是初始时的 state
// 把reducer返回的数据放在store中
const store = createStore(rootReducer, defaultState);

//命名导出，引用的时候需要使用的是花括号
//把浏览过程中的状态信息保存在store树种
export const history = syncHistoryWithStore(browserHistory, store);


console.log('store:', store.getState());
//默认导出， 每个脚本只能有一个， 引用的时候直接使用的是名字
export default store; 