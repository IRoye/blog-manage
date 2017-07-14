function accountReducer(state = [], action) {
    console.log('reducers还执行吗？？？', action);
    console.log(action.type);
    switch (action.type) {
        case 'SIGN_IN':
            return {currentUser: action.user}
        case 'LOAD_USER':
            return {currentUser: action.user}
        case 'LOG_OUT':
            return {currentUser : action.user}
        default:
            return state;
    }
}

// view 调用action , 现在数据已经到了reducer; reducer用来根据当前状态和action 传递的值来修改state：  下一个问题：
//  如何把修改的状态分享至全局？  使用订阅者
export default accountReducer;