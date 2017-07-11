export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';
/**
 * 1. view 直接触发dispatch;
 * 2. 将action 发送到reducer后， 根节点会更新props, 改变全局的view;
 * 
 *  
 */

export function changeAccount(currentUser, close){
     console.log('currentUser:',currentUser , 'close:', close); 
     return { type: CHANGE_ACCOUNT, currentUser, close}
}