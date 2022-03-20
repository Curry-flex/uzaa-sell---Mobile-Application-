import { StyleSheet, Text, View,Image,Linking,Platform, ScrollView } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function CardContainer({data}) {

    const openDial=()=>{
      if(Platform.OS =="android"){
          Linking.openURL(`tel:${data.phone}`)
      }
      else{
          Linking.openURL(`telprompt:${data.phone}`)
      }
    }

  return (
   <ScrollView>

<Card style={styles.card}>
    <Card.Title title={data.name} />
    <Card.Content>
      
      <Paragraph>{data.desc}</Paragraph>
      <Paragraph>{data.year}</Paragraph>
    </Card.Content>
    <Card.Cover source={ {uri:data.image}} />
    <Card.Actions>
      <Button>Tsh {data.price}</Button>
      <Button onPress={()=>openDial()}>contact seller</Button>
    </Card.Actions>
  </Card>
  
   </ScrollView>
  )
}

const styles = StyleSheet.create({
   card:{
       margin:5,
       elevation:5
   }
})