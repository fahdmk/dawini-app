import { View, Text,FlatList ,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import Header from './Header'
import { COLORS, SIZES, FONTS } from '../../constants1'
import { latestList, shoesList1, shoesList2 } from '../../constants1/data'
import { Avatar, Button, Card, } from 'react-native-paper'
export default function HomeScreen() {
  return (
    <>
   
    
    <View>
       <Header/>
    </View>
   
     <View style={{
      marginBottom: 120
  }}>
      <Text style={{
          ...FONTS.h3,
          marginVertical: SIZES.padding *2
      }}>The Latest and Greatest</Text>
   <Card
   style={{paddingLeft:5,
           paddingRight:5}}>
      <FlatList
        horizontal={true}
        data={latestList}
        keyExtractor={item=>item.id}
        renderItem={
          ({ item, index })=>(
              <View style={{
                  marginRight: SIZES.padding
              }}>
                  <TouchableOpacity
                   onPress={()=>navigation.navigate("Details")}
                  >
                      <Image
                       source={item.image}
                       style={{
                          height: 140,
                          width: 140
                       }}
                      />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={()=>navigation.navigate("Details")}
                  >
                      <Text style={{
                          fontSize: 14,
                          color: COLORS.black,
                          fontWeight: "bold"
                      }}>
                          {item.name}
                      </Text>
                  </TouchableOpacity>
                  <Text style={{
                      fontSize: 10,
                      color: COLORS.black
                  }}>
                      {item.category}
                  </Text>

                  <View style={{
                      flexDirection: "row"
                  }}>
                      {
                          item.oldPrice !== item.price && (
                              <Text style={{
                                  fontSize: 12,
                                  marginVertical: 4,
                                  marginRight: 6,
                                  textDecorationColor: COLORS.black,
                                  textDecorationLine: "line-through"
                              }}>
                                  ${item.oldPrice}
                              </Text>
                          )
                      }

                      <Text style={{
                           fontSize: 12,
                           marginVertical: 4
                      }}>
                          ${item.price}
                      </Text>
                  </View>
              </View>
         
         )
        }
      />
  </Card>
  </View>
  
     </>
  )
}