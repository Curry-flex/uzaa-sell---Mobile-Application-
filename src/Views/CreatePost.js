import { Alert, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from "react-native-paper"
import {Button} from "react-native-paper"
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export default function CreatePost() {
    const[name,setName]= useState("")
    const[year,setYear]= useState("")
    const[desc,setDesc]= useState("")
    const[price,setPrice]= useState("")
    const[phone,setPhone]= useState("")
    const[image,setImage] =useState("")

    const postAdd=async()=>{
        console.log("image is " + image)
     try {
      await  firestore().collection("ads")
        .add({
            name,
            year,
            desc,
            image,
            uid:auth().currentUser.uid,
            phone,
            price
        })
        Alert.alert("success","post added successfully")
         
     } catch (error) {
        Alert.alert(error.message) 
     }
    }

    const openCamera=()=>{
        launchImageLibrary({quality:0.5},(fileobj)=>{
          
            const img = fileobj.assets[0];
       
       // const image = fileobj.assets[0]
       const uploadTask =storage().ref().child(`/items/${Date.now()}`).putFile(img.uri)
        
       uploadTask.on('state_changed', 
    (snapshot) => {

    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     if(progress == 100){
         alert("image uploaded")
     }
    
  }, 
  (error) => {
    alert(error.message)
  }, 
  () => {
   
    // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //   setImage(downloadURL)
    // });

    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log(downloadURL);
        setImage(downloadURL);
      });

  }
);

   
        })
    }
   
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
    <ScrollView  style={styles.inputContainer}>
        <View
        style={{marginBottom:10}}
        >
         <Text style={{color:"darkblue",fontSize:20,fontWeight:"bold"} }>Create Post</Text>
        </View>
        
      <TextInput
            label="Name"
            value={name}
            onChangeText={name => setName(name)}
            mode="outlined"
            style={{
                marginBottom:10
            }}
          />
       <TextInput
            label="Year"
            value={year}
            onChangeText={year => setYear(year)}
            mode="outlined"
            style={{
                marginBottom:10
            }}
          />
         <TextInput
            label="Description"
            value={desc}
            onChangeText={desc => setDesc(desc)}
            mode="outlined"
            multiline
            style={{
                marginBottom:10
            }}
          /> 
           <TextInput
            label="Price"
            value={price}
            onChangeText={price => setPrice(price)}
            mode="outlined"
            style={{
                marginBottom:10
            }}
          /> 

           <TextInput
            label="Phone"
            value={phone}
            onChangeText={phone => setPhone(phone)}
            mode="outlined"
            style={{
                marginBottom:10
            }}
          />
          <Button icon="camera" mode="contained" onPress={() => openCamera()} style={{marginBottom:20}}>
           upload image
        </Button>
        
         <Button disabled={image? false:true} mode="contained" onPress={() => postAdd()}>
           Post
          </Button>  
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
    
        paddingHorizontal:20,
       paddingVertical:25
    }
})