import * as React from 'react'
import Detail from './Detail'
import AssetExample from './AssetExample'
import sshscp from './sshscp'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Home'


//   https://www.reactnavigation.org.cn/docs/stacknavigator
const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator
      
      initialRouteName='Home'
      screenOptions={{
        gestureEnabled: true,/*  enable gestures on Android  */
        headerStyle: {
          backgroundColor: '#000',
          elevation: null,
          shadowOpacity: 0,
        },
        headerStyle: {
          height: 30, // Specify the height of your custom header
        },
        headerTitleStyle: {
          flex:0,
          fontWeight: 'bold'
        },
        headerTintColor: '#111',
        headerTitleStyle: {
            fontFamily: 'Roboto-Bold',
        },
        headerBackTitleVisible: false  /*ios has*/
      }}
      headerMode='float'
      >
      <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Home Screen' }}
        />
      <Stack.Screen
          name='Detail'
          component={Detail}
          options={{ title: 'Detail Screen' }}
        />
      <Stack.Screen
          name='AssetExample'
          component={AssetExample}
          options={{ title: 'AssetExample Screen' }}
        />
      <Stack.Screen
          name='sshscp'
          component={sshscp}
          options={{ title: 'Assetsshscp' }}
        />
      
      

      </Stack.Navigator>
      
    </NavigationContainer>
  )
}


export default MainStackNavigator