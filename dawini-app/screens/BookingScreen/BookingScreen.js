import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList,StyleSheet } from 'react-native';
import { GlobalContext } from "../../context";
import Header from "../HomeScreen/Header";
import { Card, Image } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from "../../constants1";


export default function BookingScreen() {
  const { currentUser, id1, role1 } = useContext(GlobalContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://192.168.245.229:3000/api/appointments?userId=${id1}&role=${role1}`);
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);
  console.log("zzzzzzzzzzzzz",role1); 

  const renderAppointmentItem = ({ item }) => (
    <Card style={{ ...styles.cardContainer, padding: 10, width: "99%", marginLeft: 2 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.imageContainer}>
          {/* <Image source={{ uri: item.Caretaker.photo_uri }} style={styles.image} />  */}
        </View>
        <View style={{ padding: SIZES.padding }}>
          <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: "bold" }}>
      
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="location-on" size={16} color={COLORS.black} />
            <Text style={{ fontSize: 12, marginVertical: 4, marginLeft: 4 }}>


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
    width: "99%",
    marginLeft: 2,
    borderWidth: 1, // Sets the border width
    borderColor: "grey", // Sets the border color, change as needed
    borderRadius: 10,
  },
  imageContainer: {
    borderRadius: 8, // Adjust border radius as needed
    overflow: "hidden", // Clip the image to the border radius
  },
  image: {
    height: 70,
    width: 70,
    borderWidth: 1, // Sets the border width
    borderColor: '#000', // Sets the border color, change as needed
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
