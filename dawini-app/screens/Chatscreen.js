import React, {  useContext, useEffect } from "react";
import {  StyleSheet, Text, View } from "react-native";
import { socket } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../context";
import Chatcomponent from "../components/Chatcomponent";
import Header from "./HomeScreen/Header";

export default function Chatscreen({ navigation }) {
  const {
    currentUser,
    allConversations,
    setAllConversations,
    setCurrentUser,
  } = useContext(GlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        setCurrentUser(storedUser || "DefaultUser");
        socket.on("latestMessageUpdate", ({ conversationId, latestMessage }) => {
          setAllConversations(prevConversations => 
            prevConversations.map(conv => 
              conv.id === conversationId ? { ...conv, latestMessage } : conv
            )
          );
        });
        // Listen for conversation list updates
        socket.on("conversationList", (conversations) => {
          const modifiedConversations = conversations.map(conversation => {
            // Assuming `conversation` is a structure { id: "user1-user2", latestMessage: {...} }
            const participants = conversation.id.split("-"); 
            return {
              id: conversation.id, // This assumes conversation object includes an id field
              participants: participants,
              latestMessage: conversation.latestMessage // Assuming latestMessage is properly structured
            };
          });
          setAllConversations(modifiedConversations);
        });
  
        // Emit initial request
        socket.emit("getAllConversations");
        
  
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchData();
  
    // Clean up socket event listeners on component unmount
    return () => {
      socket.off("conversationList");
      socket.off("latestMessageUpdate");
    };
  }, []); // This ensures the effect runs only once on component mount
  
 


  const filteredConversations = allConversations.filter(conversation =>
    conversation.participants.includes(currentUser)
    
  );

  return (
    <View style={styles.mainWrapper}>
     <Header />
    
      <View style={styles.listContainer}>
        {filteredConversations.map((conversation, index) => (
          <Chatcomponent key={index} item={conversation} currentUser={currentUser} />
        ))}
      </View>
     
     
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
