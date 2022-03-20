import { SafeAreaView, StyleSheet, Text, View,Image, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from "react-native-paper"
import {Button} from "react-native-paper"
import auth from '@react-native-firebase/auth';

export default function SignUp({navigation}) {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const userSignUp=async()=>{
        if(!email || !password){
            Alert.alert("error","input all required field")
        }
        else{

            try {
                await  auth().createUserWithEmailAndPassword(email,password)
                Alert.alert("sucess","account created successfully")
                
            } catch (error) {
                console.log(error.message)
            }
        }
   
   
    }
  return (
     <SafeAreaView style={{flex: 1,backgroundColor:"white"}}>
         <View style={styles.imageContainer}>
       
        <Text style={styles.headerText}>Please signup to continue</Text>
         </View>

       <KeyboardAvoidingView behavior='position'>

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
        onPress={() => userSignUp()}>
            signup
        </Button>
         <Text style={{color:"darkblue",marginTop:10,fontSize:16,}}
        onPress={()=>navigation.goBack()}
        >Login</Text>


         </View>
         
       </KeyboardAvoidingView>
       
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