
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

function Detail(props) {
  const { route,navigation } = props  //參數多於一各代表是props下的成員 （前面多的）
  const { item } = route.params //from item:character of home //參數只有一各代表是設定
  const { name, home, species } = item   //參數多於一各代表是character下的成員home已宣告~~~ （前面多的）

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detail Screen</Text>
      
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('AssetExample')}>
        <Text style={styles.buttonText}>Go to AssetExample Screen {name} </Text>
        <Text style={styles.buttonText}>Go to AssetExample Screen {home} </Text>
        <Text style={styles.buttonText}>Go to AssetExample Screen {species} </Text>
        
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
})

export default Detail
// src/screens/Detail.js