import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';




export default function Header() {
  return (
    <View style={styles.Container}>
        <View>
            <Text style={{color:"#ffffff",fontSize:30,fontFamily:'outfit'}}>Welcome To Dawini,</Text>
        </View>
    <View style={styles.searchBarContainer}>
    <TextInput placeholder='Search..'style={styles.textInput}></TextInput>
    <FontAwesome name="search" style={styles.searchBTN} size={24} color="black" />
    </View>
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
        padding:20,
        paddingTop:40,
        backgroundColor:'#007F73',
    }

    }
    

)