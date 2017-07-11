function accountReducer(state = [], action){
    console.log('我是reducer :', action);
    switch(action.type){
        case  'CHANGE_ACCOUNT':
        return '哈哈哈哈哈哈哈';
        default:
        return '我是默认呀！';
    }
}

// view 调用action , 现在数据已经到了reducer;
// reducer用来根据当前状态和action 传递的值来修改state：
//  下一个问题：
//  如何把修改的状态分享至全局？

//  使用订阅者
export default accountReducer;