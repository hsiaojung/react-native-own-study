
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'


const character = {
  name: 'Cyril1',
  home: 'Cyril2',
  species: 'human'
}

function Home(props) {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <View style={styles.container}>
      <Text style={styles.text}>Listed function</Text>
      </View>
      
      <View style={styles.container2}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Detail',{item:character})}>
        <Text style={styles.buttonText}>未用1 {character.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Detail',{item:character})}>
        <Text style={styles.buttonText}>未用2 {character.name}</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.container2}>
      
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('AssetExample',{item:character})}>
        <Text style={styles.buttonText}>AssetExample {character.name}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('sshscp',{item:character})}>
        <Text style={styles.buttonText}>sshscp {character.name}</Text>
      </TouchableOpacity>
      </View>
    </View>

    

    
  )
}

// https://reactnative.dev/docs/flexbox
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  container2: {
    flex: 1, 
    flexDirection: 'row',
    backgroundColor: '#ebebeb',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: 170,
    height: 170
  },
  text: {
    color: '#f4511e',
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 1,
    padding: 7,
    margin: 7,
    width: 198,
    height: 191,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
})

export default Home