import { SafeAreaView, StyleSheet, Text, View,Image, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from "react-native-paper"
import {Button} from "react-native-paper"
import auth from '@react-native-firebase/auth';

export default function Login({navigation}) {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const login=async()=>{
        if(!email || !password){
            Alert.alert("error","input all required field")
           
        }
        else{

            try {
            auth().signInWithEmailAndPassword(email,password)
            .then(() => {
                navigation.navigate("home")
            }).catch((error)=> Alert.alert("incorrect username or password"))
           
                
            } catch (error) {
                
            }
        }
   
   
    }

  return (
     <SafeAreaView style={{flex: 1,backgroundColor:"white"}}>
         <View style={styles.imageContainer}>
         <Image 
        source={require("../assets/logo.jpeg")}
        style={{
            width:200,
            height:200,
            marginTop:20,
            borderRadius:20
        }}
        />
        <Text style={styles.headerText}>Please login to continue</Text>
         </View>

       <View behavior='position'>

       <View style={styles.input}>
         <TextInput
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
            mode="outlined"
            style={{
                marginBottom:10
            }}
          />

        <TextInput
            label="Password"
            value={password}
            onChangeText={pass => setPassword(pass)}
            mode="outlined"
            secureTextEntry={true}
          />

        <Button  mode="contained" 
        style={{marginTop:10}}
        onPress={() => login()}>
            Login
        </Button>
        <Text style={{color:"darkblue",marginTop:10,fontSize:16,}}
        onPress={()=>navigation.navigate("signup")}
        >Create account</Text>
         </View>
         
       </View>
       
     </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    imageContainer:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white"
    },
    headerText:{
        color:"darkblue",
        marginTop:20,
        fontSize:20,
        fontWeight:"bold"
    },
    input:{
        marginHorizontal:20,
        marginVertical:20
    }

})