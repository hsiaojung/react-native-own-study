import * as React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Image,  
  TouchableNativeFeedback 
} from 'react-native';


export default class Buttom extends React.Component {
     
  constructor(props){
    super(props);
    this.state = {  
      shellOutput: '',
      btom: [] = this.props.button,

    }
    
  }  

  //This is for optimization
    //Component should render only once 
    //是指明什么时候component（组件）需要进行更新。
    //执行场景
    //在接收到新props或state时，或者说在componentWillReceiveProps(nextProps)后触发
    // https://www.jianshu.com/p/2a1571d23cf1 React Native组件的生命周期
    shouldComponentUpdate(nextProps, nextState) {
      return false;
  }
  //This will call the bound function from its parent component 
  //to handle button press action/event 
  _handleOnPress = (value) => {
      requestAnimationFrame(() => {
 
        console.log("buttom debug2");
        console.log(this.state.btom);
        this.props.onBtnPress(value);
          
      });
  }

    render() {
     return (
 
            <View style={styles.container}>
                {  
                    this.state.btom.map((row, index) => (
                       
                       //這只是大區塊的外框~標注領土
                       //index沒有會報錯~根你說每各BUTTOM要要KEY ID~！！！ 
                        < View  key={index} style={styles.contRow} >
                            { 
                              // TouchableNativeFeedback 在用户手指按下时形成类似水波纹的视觉效
                              //onPress function当触摸操作结束时调用，但如果被取消了则不调用
                              row.map((col,index) => (
                                  <TouchableNativeFeedback
                                      key={index}
                                      //onPress 理面寫的是call back functiom~which can be called after pree release.
                                      onPress={() => this._handleOnPress(col)}
                                      //Creates an object that represents android theme's default background for selectable elements (?android:attr/selectableItemBackground).
                                      //https://github.com/crazycodeboy/RNStudyNotes/blob/master/React%20Native%E7%BB%84%E4%BB%B6%E8%AF%A6%E8%A7%A3/React%20Native%E6%8C%89%E9%92%AE%E8%AF%A6%E8%A7%A3%7CTouchable%E7%B3%BB%E5%88%97%E7%BB%84%E4%BB%B6%E4%BD%BF%E7%94%A8%E8%AF%A6%E8%A7%A3.md
                                      background={TouchableNativeFeedback.SelectableBackground()}>
                                      <View style={styles.contButton}>
                                          <Text style={styles.txtDefault}>{col}</Text>
                                      </View>
                                  </TouchableNativeFeedback>
                                ))
                            }
                        </View>
                    ))
                }
            </View>
        );
  }
}
//https://mp.weixin.qq.com/s?__biz=MzIxNjEzNjUzOQ==&mid=402020148&idx=4&sn=1e54c10974c4efacd78d7fc3d0da60bd
const styles = StyleSheet.create({
  
  container: {
    flex:1,
    padding: 1,

  },
txtDefault: {
    color: '#000',
    //fontFamily: 'Helvetica-Light',
    fontSize: 11
  },

  contRow: {
    //https://stackoverflow.com/questions/59428543/decrease-space-between-elements-in-react-native
    //flex: 1,   /// Remove flex: 1, from buttonPosition. Only parent element needs to have flex. Also remove your margin: '25%', from button_style – Gabriel Vasile Dec 20 '19 at 17:52 
    flexDirection: 'row', 
    justifyContent: "space-around",
  },
//https://reactnativeexample.com/flat-button-component-for-react-native/
  contButton: {
    margin: 10,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 101,
    backgroundColor: '#406E9F',
    borderRadius: 9,
    width: 177,
    height: 50,
    marginVertical: 1,
    justifyContent: "space-around",
    flexDirection:'column',
  }

});
