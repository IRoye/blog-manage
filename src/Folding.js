/**
 * 折叠文章
 */
import React,{Component} from 'react';
export default class Folding extends Component {

    getStyles(){
        return{
            root:{
                height: '100vh',
                textAlign: 'left',
            },
            content: {
                position:'relative',
                color: '#696969',
                margin: '1rem auto',
                borderBottom : '1px solid #ddd',
                paddingBottom: '1rem',
                width: '80%',
                cursor: 'pointer',
            },
            time:{
                fontSize: '.5rem',
                fontWeight: '300', //定义粗细， 400是normal ， 700是bold
            }
        }
    }
    render() {
        const styles = this.getStyles();
        return (
            <div className="app-fold" style={styles.root}>
                <div className='app-flod-content' style={styles.content}>
                    <h3>
                        <div className='main'>
                            ISS 直播 SpaceX「龙」 飞船对接画面
                            <div className='time' style={styles.time}>
                                7 小时前
                            </div>
                        </div>
                    </h3>
                    {/* h3 标题下的内容 */}
                    <div className='summary' style={{
                        fontSize: '.85rem',
                        fontWeight: '300',
                        width: '90%',
                        marginTop: '1rem',
                    }}>
                        对于未来将统一的国内安卓系统推送标准，并非是类似于谷歌 GCM/FCM 的模式，消息投递的方式与苹果 iOS 在原理上类似，服务器推送的消息到达设备之后将会直接展现，而不必唤醒应用。
                    </div>                   
                </div>
            </div>
        );
    }
}