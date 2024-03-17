import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';




export default function Header() {
  return (
    <>
    {/* <View style={{ padding:14,
        paddingTop:20,
        backgroundColor:'#ffff'}}></View> */}
    <View style={styles.Container}>
    
    <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.png")}
          resizeMode='contain'
          style={styles.logo}
        />
      </View>
    {/* <TextInput placeholder='Search..'style={styles.textInput}></TextInput>
    <FontAwesome name="search" style={styles.searchBTN} size={24} color="black" /> */}
    </View>

    </>
  )
}
const styles = StyleSheet.create({
    textInput:{
        padding:7,
        paddingHorizontal:16,
        backgroundColor:"#ffffff",
        borderRadius:8,
        width:'85%'
    },
    searchBarContainer:{
        marginTop:15,
        display:'flex',
        flexDirection:'row',
        gap:10
    },
    searchBTN:{
        backgroundColor:"#ffffff",
        padding:10,
        borderRadius:8,
    },
    Container:{
        padding:1,
        paddingTop:30,
        backgroundColor:'#007025',
        
    }
,
logoContainer: {
    width: '100%', // Take full width of the parent container
    alignItems: 'center', // Center items horizontally
  },
    logo: {
        width: 200,
        height: 55,
      }    
}
    

)