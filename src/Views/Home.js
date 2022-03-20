import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardContainer from './Card'
import firestore from '@react-native-firebase/firestore';

export default function Home() {
    const [posts,setPosts] =useState([])
   

    const getData=async()=>{
   const querySnap =await firestore().collection("ads").get()
    const result=  querySnap.docs.map((doc)=>doc.data())
    //console.log(result)
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
    
     <View>
      <FlatList 
      data={posts}
      renderItem={({item}) => <CardContainer data={item}/>}
  
      />
     </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})