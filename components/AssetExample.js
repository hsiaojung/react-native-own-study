import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { Card } from 'react-native-paper';
import SSHClient from 'react-native-ssh-sftp';
import sshscp from './sshscp';

import AssetExampleii from './AssetExampleii';

export default class AssetExample extends React.Component {
  render() { //why using render word?  class base code need to render first then returing .if function ,just rtrun
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Local files and assets can be imported by dragging and dropping them into the editor123
        </Text>
        <Image style={styles.logo} source={require('../assets/snack-icon.png')} />        
        <View style={styles.contOutput}>
            <View style={styles.placeHolderOutput}>
              <Text style={styles.txtDefault}> cyril test222</Text>
            </View>
        </View> 
         {/*<Card>   /card 范圍過大要設定才能用
            <AssetExampleii />
         </Card> */}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  }
});