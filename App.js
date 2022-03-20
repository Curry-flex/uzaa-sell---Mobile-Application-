/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { AsyncStorage, LogBox } from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();
 import { createDrawerNavigator } from '@react-navigation/drawer';
//import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import React,{useState,useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage1 from '@react-native-async-storage/async-storage'
import PushNotification from "react-native-push-notification";
import Feather from "react-native-vector-icons/Feather"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Button,
  Modal,
  Platform,
  Linking,
  RefreshControl,
  FlatList,
  TextInput,
  Pressable,
  Image

} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import fav from './fav.jpeg'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import Login from './src/Views/Login';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import SignUp from './src/Views/SingUp';
import CreatePost from './src/Views/CreatePost';
import Home from './src/Views/Home';
import Profile from './src/Views/Profile';
import auth from '@react-native-firebase/auth';


  


const Stack =createStackNavigator()
const Tab = createBottomTabNavigator()

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'deepskyblue',
   
  },
};

const TabNavigator=()=>{
  return(
    <Tab.Navigator
   
    screenOptions={({route})=>({
      tabBarIcon:({color})=>{
        let iconName
        if(route.name == "home"){
          iconName="home"
        }
        else if(route.name =="create"){
          iconName="plus-circle"
        }else if(route.name =="profile")
        {
          iconName ="user"
        }

        return <View style={{borderWidth:15,height:65,borderColor:"white",borderTopLeftRadius:50,borderTopRightRadius:50}}><Feather name={iconName} size={30}color={color} /></View>
      }
    })}
    
    tabBarOptions={{
      activeTintColor:"tomato",
      inactiveTintColor:"gray",
   
    
    }}
    >
      <Tab.Screen 
      name="home"
      component={Home}
      options={{title:""}}
      />

    <Tab.Screen 
      name='create'
      component={CreatePost}
      options={{title:""}}
      /> 

      <Tab.Screen 
      name='profile'
      component={Profile}
      options={{title:""}}
      />  
    </Tab.Navigator>
  )
}


const App = () => {
 const[user,setUser] =useState('')
 console.log(user)
 useEffect(()=>{
   auth().onAuthStateChanged((userExist)=>{
     if(userExist){
      
       setUser(userExist)
     }
     else{
       setUser("")
     }
   })
 },[])

  return (
  <PaperProvider theme={theme}>
      <NavigationContainer>
    <Stack.Navigator
    initialRouteName={ "login" }
    screenOptions={{
      headerShown:false
    }}
    >
      <Stack.Screen
      name='login'
      component={user ?   TabNavigator : Login}
      />

    <Stack.Screen
      name='signup'
      component={SignUp}
      />
      
      <Stack.Screen 
      name="home"
      component={TabNavigator}
      />

    
      
    </Stack.Navigator>
  </NavigationContainer>
  </PaperProvider>
     
  )
}

export default App

