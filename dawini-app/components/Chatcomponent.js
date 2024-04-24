import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


export default function Chatcomponent({ item, currentUser }) {
  // console.log(currentUser);
  const navigation = useNavigation();

  // Find the other participant in the conversation
  const otherParticipant = item.participants.find(participant => participant !== currentUser);
// console.log(item.participants)
  function handleNavigateToMessageScreen() {
    navigation.navigate("Messagescreen", {
      currentGroupName: otherParticipant, // Pass the other participant's ID as the group name
      currentGroupID: item.id, // Pass the conversation ID as the group ID
    });
  } 

  return (
    <Pressable style={styles.chat} onPress={handleNavigateToMessageScreen}>
      <View style={styles.circle}>
        <FontAwesome name="group" size={24} color={"black"} />
      </View>
      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.userName}>{otherParticipant}</Text>
          <Text style={styles.message}>
            {item.latestMessage ? item.latestMessage.text : "Tap to start messaging"}
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
    marginBottom: 5,
    fontWeight: "bold",
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
    width: 50,
    borderRadius: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    marginRight: 10,
  },
});
