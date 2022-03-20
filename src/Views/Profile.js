import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from "@react-native-firebase/auth"

import CardContainer from './Card'
import firestore from '@react-native-firebase/firestore';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


export default function Profile() {
      const[loading,setLoading] =useState(false)
    const [posts,setPosts] =useState([])
   

    const getData=async()=>{
   const querySnap =await firestore().collection("ads").
    where("uid","==",auth().currentUser.uid).
   get()
    const result=  querySnap.docs.map((doc)=>doc.data())
  
    setPosts(result)
    }
    useEffect(()=>{
          getData()
       return ()=>{
           console.log("clean up")
       }
    },[posts])

  return (
      <SafeAreaView style={{flex:1,backgroundColor:"white"}}>

    <View style={styles.container}>
      <Text style={{color:"black",fontSize:20,margin:20}}>{auth().currentUser.email}</Text>
      <Button style={{width:100}} mode="contained" 
        onPress={() => auth().signOut()}>
            Logout
        </Button>
        <Text style={{color:"black",fontSize:20,margin:20}}>Your adds</Text>
    </View>
 
    <ScrollView>

   <FlatList
  data={posts}
  renderItem={({item}) => <CardContainer data={item}/>}
  onRefresh={()=>{
      setLoading(true)
      getData()
      setLoading(false)
  }}
  refreshing={loading}
    />
</ScrollView>

   
      </SafeAreaView>
   
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        marginBottom:20
    }
})