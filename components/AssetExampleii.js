import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';



export default class AssetExampleii extends React.Component {
  render() { //why using render word?  class base code need to render first then returing .if function ,just rtrun
    return (
      <View >
        <Text>
          Local files and assets can be imported by dragging and dropping them into the editor123
        </Text>   
      </View>
    );
  }
}
