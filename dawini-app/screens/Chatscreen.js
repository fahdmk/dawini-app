import React, { createContext, useState, useContext, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { socket } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewGroupModal from "../components/Modal";
import { GlobalContext } from "../context";
import Chatcomponent from "../components/Chatcomponent";
import Header from "./HomeScreen/Header";

export default function Chatscreen({ navigation }) {
  const {
    currentUser,
    allConversations,
    setAllConversations,
    modalVisible,
    setModalVisible,
    setCurrentUser,
    setShowLoginView,
  } = useContext(GlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data from AsyncStorage
        const storedUser = await AsyncStorage.getItem("user");
        setCurrentUser(storedUser || "DefaultUser");

        // Emit socket event to get all conversations
        socket.emit("getAllConversations");

        // Listen for conversationList event from socket
       socket.on("conversationList", (conversations) => {
  //  console.log(conversations);
  // Modify the conversation list to include participants
  const modifiedConversations = conversations.map((conversation) => {
    const participants = conversation.split("-"); // Split conversation ID into participants
    return {
      id: conversation, // Keep the original conversation ID
      participants: participants, // Assign participants array
    };
  });
  setAllConversations(modifiedConversations);
});
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();

    // Clean up socket event listener on component unmount
    return () => {
      socket.off("conversationList");
    };
  }, []);


  const filteredConversations = allConversations.filter(conversation =>
    conversation.participants.includes(currentUser)
    
  );
// console.log(filteredConversations);
  return (
    <View style={styles.mainWrapper}>
     <Header />
    
      <View style={styles.listContainer}>
        {filteredConversations.map((conversation, index) => (
          <Chatcomponent key={index} item={conversation} currentUser={currentUser} />
        ))}
      </View>
      {/* <View style={styles.bottomContainer}>
        <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>Create New Conversation</Text>
          </View>
        </Pressable>
      </View> */}
     
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: "#eee",
    flex: 1,
  },
  topContainer: {
    backgroundColor: "#fff",
    height: 70,
    width: "100%",
    padding: 20,
    justifyContent: "center",
    marginBottom: 15,
    flex: 0.3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  listContainer: {
    flex: 3.4,
    paddingHorizontal: 10,
  },
  bottomContainer: {
    flex: 0.3,
    padding: 10,
  },
  button: {
    backgroundColor: "#703efe",
    padding: 12,
    width: "100%",
    elevation: 1,
    borderRadius: 50,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
