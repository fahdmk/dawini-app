import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList,StyleSheet } from 'react-native';
import { GlobalContext } from "../../context";
import Header from "../HomeScreen/Header";
import { Card } from "react-native-paper";
import {  Image } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from "../../constants1";


export default function BookingScreen(tab) {
  const [appointments, setAppointments] = useState([]);
  const { idtab , role } = tab.route.params;
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://192.168.100.25:3000/api/appointments?userId=${idtab}&role=${role}`);
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);
  console.log("zzzzzzzzzzzzz",  appointments); 

  const renderAppointmentItem = ({ item }) => (

   <Card style={{ ...styles.cardContainer, padding: 10, width: "99%" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.imageContainer}>
         {role=="patient" ?(<Image source={{ uri: item.Caretaker.photo_uri }} style={styles.image} />  ):(<Image source={{ uri: item.Patient.photo_uri }} style={styles.image} />)}
        </View>
        <View style={{ padding: SIZES.padding }}>
          <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: "bold" }}>
          
          {role=="patient" ?(item.Caretaker.fullName):(item.Patient.fullName)}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            
            <Text style={{ fontSize: 12, marginVertical: 4, marginLeft: 4 }}>
            {item.Date}
 
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <>
      <Header />
      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={(item) => item.idAppointment.toString()}
      />
    </>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    flex: 1, // Use flex instead of width
    marginHorizontal: 7, // Apply horizontal margin uniformly
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    margin:7
  },
  imageContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
  },
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    width:"85%",
    height: 40,
  
    paddingLeft: 10,
    margin: 10,
  },
  searchButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
});
