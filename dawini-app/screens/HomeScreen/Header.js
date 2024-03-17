import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';




export default function Header() {
  return (
    <View style={styles.Container}>
    
    <Image
              source={require("../../assets/logo.png")}
              resizeMode='contain'
              style={{
                  width: 200,
                  height: 55, // Adjust height as needed
              }}
            />
    {/* <TextInput placeholder='Search..'style={styles.textInput}></TextInput>
    <FontAwesome name="search" style={styles.searchBTN} size={24} color="black" /> */}
    </View>

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
        padding:10,
        paddingTop:20,
        backgroundColor:'#009F4D',
    }

    }
    

)