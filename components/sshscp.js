import * as React from 'react';
import { AppRegistry,Text, ProgressBarAndroid,View, StyleSheet } from 'react-native';
//import Constants from 'expo-constants';
import List from './List';
import DialogInput from 'react-native-dialog-input';
import RNFileSelector from 'react-native-file-selector';

// You can import from local files
import AssetExample from './AssetExample';
import Buttom from './Buttom';
import { Card } from 'react-native-paper';
import SSHClient from 'react-native-ssh-sftp';

import FilePickerManager from 'react-native-file-picker';

const initialOutput = '0';
const maxLength = 57;
var client;

//constants
const buttons = [
  ['Create_ssh', 'disconnected'],
  ['sel_file', 'del'],
  ['copy_to', 'del'],
];

export default class sshscp extends React.Component 
{
  // React的props與state
  // https://ithelp.ithome.com.tw/articles/10210221?sc=iThelpR
  constructor(props){  //props」（指屬性 properties）   props是React父元件與子元件間溝通的橋樑，是靜態(唯獨)的。
    super(props);//為什用SUPER?  呼叫 父元件 的 constructor，很重要 ： https://alligator.io/react/constructors-with-react-components/
      //this state 是初始自己子元件的變數~並非父元件~~~
      this.state = {  //state 主要作用是用元件保存、控制以及修改自己可變的狀態。
                      // state在元件內部初始化(給預設值)，
                      //  state狀態可以透過this.setState方法進行更新，setState會使元件重新渲染。
                      //  沒有state的元件叫做無狀態元件(stateless component)
                      //  設定了state的原元件叫做有狀態元件(stateful component)
                      //  因為狀態會帶來管理上的複雜性，所以React.js非常鼓勵多寫無狀態元件
                      //
                      visible: false,
                      barVaule: 0,
                _output: initialOutput,
                _mathExpression: '',
                isDialogVisible: false,
                _history: [],
                host: 'sshtest.com',
                port: '22',
                username: 'sha',
                password: '',
                privateKey: '\
          -----BEGIN RSA PRIVATE KEY-----\n\
          MIIEpAIBAAKCAQEA2DdFSeWG8wOHddRpOhf4FRqksJITr59iXdNrXq+n79QFN1g4\n\
          bvRG9zCDmyLb8EF+gah78dpJsGZVIltmfYWpsk7ok9GT/foCB1d2E6DbEU6mBIPe\n\
          OLxYOqyiea8mi7iGt9BvAB4Mj+v2LnhK4O2BB6PTU4KLjSgMdqtV/EGctLdK+JEU\n\
          5Vo/tDvtF8jmUYGV57V8VovgQJHxOWcT9Mgz+c5EcyVvhwvA/88emYkZ49cn4N0A\n\
          az7YsOTHItvbhxf9xI3bBwxoPvfLx/G0n48TeY33D0qu/qjAloOfqPMHwj+upn/K\n\
          RrAawl2N1MObCc5/q1WYTftd5+uoQsB1RN7ptQIDAQABAoIBAQCzKBkhwi6v7pyv\n\
          5fHLUVEfK5SLOn9VZpv7YtP1AVgGQYiQ82jPh1nGOUzTn27fBWXtyc3p+RZWNHUW\n\
          ouWp3LdgKEJPObmHGUHVE4OjgAYFsUWfOCVKncX92E5IxfkKjTwT04Imdr+yAbNb\n\
          jhF9j077JaRV7jX0INsy+YWmIDfZBQHdR4gpip6ye70yc4p0M7DbrhjEFi6cvf5b\n\
          OaSsbKAunxZte42RYY1ap6GmEii5B/wWe37176jBUrCeQzN9poTSFEv99+Av6M3R\n\
          yyBD1PyawR+dPCAicvIY88ME4fAJSi6Gp8Kmievq7bXnGw8ICWggVSnl0TBYhwSY\n\
          SN8mBr2BAoGBAPNNQ+77kEkwsA0pzZljbwDhJ03jATsWpA4yN4S3Gz456ZUDxode\n\
          lbHERy7RR8l6EunSRdlWGVW9d/8uXBKsvp78hZnJkUE1fLCP+5UH1DVYn+hSYhjj\n\
          g9lnQXbKpXm5tpABiM7+sMq+pC2N6K8yQ7P33TXCcRCWpjK0OJcEVxq/AoGBAOOA\n\
          HNlZe8gQeH3OrQWKEJjgF6oQ9pGdRgJJctdSHDsqP8cPV7BuiYaTh/Q+R+HIueJ+\n\
          3abGLkRqxbNb5FIgX7HJRYLGlusccjd0L4OJ5upGDQJgJzQOryPFofihLvvNbY1K\n\
          zLLNvvYoaWtXhSGusj5N9T6DuA6qxMs+0OwPeZyLAoGBAPHIjwInrTOO1uW97TvJ\n\
          vL47Ajw8ozR9Q3t4HAQfk0s7cg1MOza7oDeQvsyf3Z8zWShUdmWNUpAKQf2trIJC\n\
          eQy2Fm7GCTusU8WC0JlBtnltITxW4nWpY5XhLwVGTTuyeuKRI8vQ/w/8dFtw8xNn\n\
          +DAY2hRartG1ZGRvBO3OumExAoGAeJuar7+417+joU7Ie39OfT2QTiDgFyKB0wSN\n\
          VYm6XcNwPF/t5SM01ZuxH9NE2HZJ1cHcUGYQcUUJuqSkzsVK9j32E/akW9Cg3LVD\n\
          20BooxqwGupO3lJKl3RXAjCxb9zgj19wVfqtmmKiQL4NXmX3KQC7W4EJOv1dh0Ku\n\
          D/fESTECgYBwWv9yveto6pP6/xbR9k/Jdgr+vXQ3BJVU3BOsD38SeSrZfMSNGqgx\n\
          eiukCOIsRHYY7Qqi2vCJ62mwbHJ3RhSKKxcGpgzGX7KoGZS+bb5wb7RGNYK/mVaI\n\
          pFkz72+8eA2cnbWUqHt9WqMUgUBYZTMESzQrTf7+q+0gWf49AZJ/QQ==\n\
          -----END RSA PRIVATE KEY-----',
                selectedOption: 'Execute',
                command: 'ps',
                exeOutput: '',
                shellOutput: '',
                sftpOutput: [],
                connection:false,
                selfiles: '',             
    }
    let { 
      host, 
      port, 
      username, 
      password,
      privateKey,
      selectedOption, 
      command, 
      exeClient, 
      exeOutput, 
      shellClient, 
      shellOutput, 
      sftpClient,  
      sftpOutput
    } = this.state;
    //我們都知道在撰寫 React class 的時候常常需要使用 bind(this) 這行語法來讓property與 this 保持關係。
    // bind 把想綁定的東西綁到 this 上,
    //把 底下宣告的 function bind到 this.function~ 才能呼叫~
    // bind(this)是把事件绑定到react组件上面。箭头函数默认是执行了bind(this)的
    // If you forget to bind this.handleClick 
    //  and pass it to onClick, 
    //  this will be undefined when the function is actually called.
    this._handleEvent = this._handleEvent.bind(this);
    this._showDialog = this.showDialog.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
  }
  handleConnecterror(){

    console.log("we get here");
  }
  handleConnect(){
    /*
    SSHClient.setup("ne0z","192.168.1.1",22);
    SSHClient.usePrivateKey(false);
    SSHClient.setPassword("your_password");
    //[const command = 'ls -al';
    //this.SSHClient.Execute(config, command).then(response => console.log(response));
    //SSHClient.setup("root","192.168.1.1",22);*/
    console.log("we get 192.168.31.118");
    
    
  }
  showDialog(isShow){

    switch (isShow) {
      case 'Create_ssh':
         
            if (this.state.connection == 1) {
              console.log("we got already .exit");
              console.log("we get "+ this.sftpClient);
              return;
            }
              /*
            this.setState( (sftpClient) => {
              new SSHClient("192.168.31.118", 22, "cyril","cyril", (error) =>  {  if (error) console.log("error"); else console.log("pass0"); });
            })
              */   
          
          this.sftpClient = new SSHClient("192.168.31.118", 22, "cyril","cyril", (error) =>  {  if (error) console.log("error"); else {console.log("pass0"); var command = 'ls -l';
          this.sftpClient.connectSFTP((error) => {
            if (error) {
              console.warn(error);
              this.setState({connection:0});
            } else {
              console.log('pass');
              this.setState({connection:1});
      
            }
          });   

          this.sftpClient.execute(command, (error, output) => {
            if (error)
              console.warn("error");
            if (output)
              console.log(output);
          });
          console.log("we get here2");} });
          console.log("we get "+ this.sftpClient);
            
         break;
      case 'disconnected':
          // React Native [ 變數 ] 介紹  http://nlstudio2013.blogspot.com/2018/04/react-native.html
          this.sftpClient.disconnect();
          console.log("we get disconnected");
          this.setState({connection:0});
            break;
      case 'sel_file': 
          let response;
          console.log("we get show_folder...1");
          const options = {
            title: 'File Picker',
            chooseFileButtonTitle: 'Choose File...'
          };
          this.setState({
            barVaule: 0
            
          });
          FilePickerManager.showFilePicker(options, (response) => {
    
            if (response.didCancel) {
              console.log('User cancelled photo picker');
            }
            else if (response.error) {
              console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              this.setState({
                file: response
              });
            }
            this.setState({
              selfiles: response.path
            });

            console.log(`First response: ${response}, selfiles: ${this.state.selfiles}`);

          });
          break;
       case 'Create_ssh':
         
            if (this.state.connection == 1) {
              console.log("we got already .exit");
              return;
            } 
          this.setState({connection:1});
          this.sftpClient = new SSHClient("192.168.31.118", 22, "cyril","cyril", (error) =>  {  if (error) console.log("error"); else {console.log("pass0"); var command = 'ls -l';
      
          this.sftpClient.execute(command, (error, output) => {
            if (error)
              console.warn("error");
            if (output)
              console.log(output);
          });
          console.log("we get here2");} });
          console.log("we get "+ this.sftpClient);
            
          break;
          
         case 'copy_to':

          console.log("we get copy_to"+ this.sftpClient);
         
          this.sftpClient.sftpUpload(this.state.selfiles, '/home/cyril', (error) => {
            if (error)
              console.warn(error);
          });
          
          // Upload progress
           this.sftpClient.on('UploadProgress', (event) => {
            console.log("we get even");
            console.log(event);
            barVaule = event/100;
            console.log(barVaule);
            console.log(typeof barVaule); 
            this.setState({
              barVaule: event/100
            });
          });
          /*
          // Cancel upload:
          exeClient.sftpCancelUpload();
          */
         break;

      default:
        console.log('Sorry, we are out of ' + isShow + '.');
    }
   /*    
    if(isShow == 'Create'){ 
      console.log("1isShow = ", isShow); // this printfing will be showing on the Monitor.
      this.setState({isDialogVisible:true});
    }else {
    console.log("21isShow = ", isShow); // this printfing will be showing on the Monitor.
      this.setState({isDialogVisible:false});  //  要改變 Component 的狀態 state 
                                               //  必須要 call this.setState()，
                                               //  裡面傳一個 object，因為我們無法直接對 
                                               //  this.state.counter 做改變：
    }
    */
  }

  _handleEvent = (value) => {
    console.log(value); // this printfing will be showing on the Monitor.
    console.log("we get here2");
    var command = 'ls -l';
    client.execute(command, (error, output) => {
      if (error)
        console.warn("error");
      if (output)
        console.log(output);
    });
    console.log("we get here2");
    

  }
  /*
  componentWillUnmount() {
    let { exeClient, shellClient, sftpClient } = this.state;
    if (exeClient) exeClient.disconnect();

  }
*/
  render() {
    return (
      <View style={styles.container}>
        {/* 若是在子元件註解要加 {} https://blog.techbridge.cc/2016/04/21/react-jsx-introduction/      */}  
        {/*<Buttom onBtnPress={this._handleEvent} button={buttons}/> */}  
         {/*<Buttom onBtnPress={this.handleConnect} button={buttons}/>   */}  
          <Buttom onBtnPress={this._showDialog} button={buttons}/> 
          {/*  <RNFileSelector title={"Select File"} visible={this.state.visible} onDone={() => {console.log("file selected: " + "./");}} onCancel={() => {console.log("cancelled");}}/>  */}  
         {/*  <List />
          <DialogInput 
            isDialogVisible={this.state.isDialogVisible}
            title={"DialogInput 1"}
            message={"Message for DialogInput #1"}
            hintInput ={"HINT INPUT"}
            submitInput={ (inputText) => {this.sendInput(inputText)} }
            closeDialog={ () => {this.showDialog(false)}}>
          </DialogInput> */}   
             <Text>Fixed Progress Value</Text>
             <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={this.state.barVaule}
             />                                              
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    //backgroundColor: '#ecf0f1',
    padding: 8,
    //flexDirection: 'column'
  },
  paragraph: {
    margin: 14,
    fontSize: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
