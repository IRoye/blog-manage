function accountReducer(state = [], action) {
    console.log('我是reducer :', action.currentUser);
    console.log('类型：', action.type);

    return {currentUser: action.currentUser}
}

// view 调用action , 现在数据已经到了reducer; reducer用来根据当前状态和action 传递的值来修改state：  下一个问题：
//  如何把修改的状态分享至全局？  使用订阅者
export default accountReducer;