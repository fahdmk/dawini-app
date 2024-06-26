import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import Header from "../HomeScreen/Header";
import { Card } from "react-native-paper";
import { Image } from "react-native-elements";
import { COLORS } from "../../constants1";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import config from "../../config.json";

export default function BookingScreen(tab) {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newPrice, setNewPrice] = useState("");
  const { idtab, role } = tab.route.params;
  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return {
          containerStyle: {
            margin: 4,
            padding: 6,
            justifyContent: "center",
            backgroundColor: "green",
            borderRadius: 10,
          },
          textStyle: { fontWeight: "bold", color: "white" },
        };
      case "declined":
        return {
          containerStyle: {
            margin: 4,
            padding: 6,
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "black",
            borderRadius: 10,
          },
          textStyle: { fontWeight: "bold", color: "black" },
        };
      case "pending":
      default:
        return {
          containerStyle: {
            margin: 4,
            padding: 6,
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "green",
            borderRadius: 10,
          },
          textStyle: { fontWeight: "bold" },
        };
    }
  };
  const fetchAppointments = async () => {
    try {
      const ip = config.ip;
      const response = await fetch(
        `http://${ip}:3000/api/appointments?userId=${idtab}&role=${role}`
      );
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const Refresh = () => {
    fetchAppointments();
  };
  const openModal = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setNewPrice("");
  };
  // console.log(appointments);
  const handlePriceUpdate = async () => {
    if (!newPrice) {
      alert("Please enter a price");
      return;
    }
    try {
      const ip = config.ip;
      const response = await fetch(
        `http://${ip}:3000/api/appointments/update-price`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idAppointment: selectedAppointmentId,
            Price: newPrice,
          }),
        }
      );
      const json = await response.json();
      // console.log(json);
      closeModal();
      Refresh();
    } catch (error) {
      console.error("Failed to update price:", error);
    }
  };
 
  const renderAppointmentItem = ({ item }) => {
    const getImageSource = () => {
      let uri;
      if (role === "patient" && item.Caretaker && item.Caretaker.photo_uri) {
        uri = item.Caretaker.photo_uri;
      } else if (role !== "patient" && item.Patient && item.Patient.photo_uri) {
        uri = item.Patient.photo_uri;
      }
      if (uri) {
        return { uri };
      }
      return require("../../assets/hero1.jpg");
    };
    const { containerStyle, textStyle } = getStatusStyle(item.status);
    return (
      <>
        <Modal
          animationType="false"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(!isModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Enter Price"
                value={newPrice}
                onChangeText={setNewPrice}
                keyboardType="numeric"
                style={styles.input}
              />
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={closeModal}>
                  <AntDesign
                    name="closecircleo"
                    size={24}
                    color="black"
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      margin: 7,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePriceUpdate}>
                  <View
                    style={{
                      padding: 10,
                      borderRadius: 20,
                      backgroundColor: "green",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      Set the price
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Card style={styles.cardContainer}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.imageContainer}>
                <Image 
                 source={getImageSource()}
                 style={styles.image} />
              </View>
              <View style={{ flex: 0.7 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: COLORS.black,
                  }}
                >
                  {role === "patient"
                    ? item.Caretaker.fullName
                    : item.Patient.fullName}
                </Text>
                <Text style={{ fontSize: 12, marginVertical: 4 }}>
                  {item.Date}
                </Text>
              </View>
            </View>
            <View>
              <View style={containerStyle}>
                <Text style={textStyle}>{item.status}</Text>
              </View>
              {item.status === "declined" ? (
                <></>
              ) : role === "nurse" ? (
                item.Price === "" ? (
                  <TouchableOpacity
                    onPress={() => openModal(item.idAppointment)}
                  >
                    <View
                      style={{
                        margin: 4,
                        padding: 6,
                        justifyContent: "center",
                        borderWidth: 2,
                        borderColor: "black",
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ fontWeight: "bold", color: "black" }}>
                        Set Price
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      margin: 4,
                      padding: 6,
                      justifyContent: "center",
                      borderWidth: 2,
                      borderColor: "black",
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "black" }}>
                      {item.Price} DT
                    </Text>
                  </View>
                )
              ) : item.Price === "" ? (
                <View
                  style={{
                    margin: 4,
                    padding: 6,
                    justifyContent: "center",
                    borderWidth: 2,
                    borderColor: "black",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ fontWeight: "bold", color: "black", fontSize: 10 }}
                  >
                    No Price Yet
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    margin: 4,
                    padding: 6,
                    justifyContent: "center",
                    borderWidth: 2,
                    borderColor: "black",
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "black" }}>
                    {item.Price} DT
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Card>
      </>
    );
  };
  return (
    <>
      <Header />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          Appointments
        </Text>
        <TouchableOpacity
          onPress={Refresh}
          style={{ margin: 15, alignSelf: "flex-end" }}
        >
          <FontAwesome name="refresh" size={30} color="black" />
        </TouchableOpacity>
      </View>
      {appointments.length === 0 ? (
        <Text style={{ alignSelf: "center" }}>No appointments yet!</Text>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderAppointmentItem}
          keyExtractor={(item) => item.idAppointment.toString()}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 23,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 40,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
    borderRadius: 40,
  },
  setPriceContainer: {
    margin: 4,
    padding: 6,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 30,
  },
  setPriceText: {
    fontWeight: "bold",
    color: "black",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    flex: 1,
    marginHorizontal: 7,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    margin: 7,
  },
  imageContainer: {
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
  },
});
