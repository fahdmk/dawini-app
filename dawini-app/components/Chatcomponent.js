import React, { useEffect, useState, useContext } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../context";
const hero2Image = require('../assets/hero1.jpg');
const hero1Image = require('../assets/hero2.jpg');
export default function Chatcomponent({ item, currentUser ,role, idtab}) {
  const [nurses, setNurses] = useState([]);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
// console.log(item)
  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const response = await fetch("http://192.168.100.25:3000/api/nurses");
        if (!response.ok) {
          throw new Error("Failed to fetch nurses");
        }
        const data = await response.json();
        setNurses(data);
      } catch (error) {
        console.error("Error fetching nurses:", error);
      }
    };
    if(role==="nurse"){
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://192.168.100.25:3000/api/users/name/${otherParticipant}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();}
    fetchNurses();
  }, []);

  const otherParticipant = item.participants.find(participant => participant !== currentUser);
  const nurseData = nurses.find(nurse => nurse.fullName === otherParticipant);

  function handleNavigateToMessageScreen() {
    navigation.navigate("Messagescreen", {
      currentGroupName: otherParticipant,
      currentGroupID: item.id,
    });
  }

  let messageDisplay = item.latestMessage 
    ? `${item.latestMessage.sender}: ${item.latestMessage.text}`
    : "No messages yet";
    const getImageSource = () => {
      if (nurseData && nurseData.photo_uri) {
          return { uri: nurseData.photo_uri };
      }
      return role === "nurse"
          ? (user && user.photo_uri ? { uri: user.photo_uri } : hero2Image)
          : hero1Image;
  };
  return (
    <Pressable style={styles.chat} onPress={handleNavigateToMessageScreen}>
      <View style={styles.circle}>
      <Image
      source={getImageSource()}
      style={styles.image}
    />
       
      </View>
      <View style={styles.rightContainer}>
        
        <View>
          <Text style={styles.userName}>{otherParticipant}</Text>
          <Text style={styles.message}>
            {messageDisplay}
          </Text>
        </View>
        <View>
          <Text style={styles.time}>
            {item.latestMessage ? item.latestMessage.time : "Now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chat: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    height: 80,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    opacity: 0.8,
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  time: {
    opacity: 0.6,
  },
  circle: {
    width: 55,
    height: 55,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
