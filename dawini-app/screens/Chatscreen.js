import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { socket } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../context";
import Chatcomponent from "../components/Chatcomponent";
import Header from "./HomeScreen/Header";
import { ScrollView } from "react-native-gesture-handler";

export default function Chatscreen(tab) {
  const { idtab, role } = tab.route.params;

  const {
    currentUser,
    allConversations,
    setAllConversations,
    setCurrentUser,
  } = useContext(GlobalContext);
  const [filteredConversations, setFilteredConversations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        setCurrentUser(storedUser || "DefaultUser");
        socket.on(
          "latestMessageUpdate",
          ({ conversationId, latestMessage }) => {
            setAllConversations((prevConversations) =>
              prevConversations.map((conv) =>
                conv.id === conversationId ? { ...conv, latestMessage } : conv
              )
            );
          }
        );
        socket.on("conversationList", (conversations) => {
          const modifiedConversations = conversations.map(conversation => ({
            id: conversation.id,
            participants: conversation.id.split("-"),
            latestMessage: conversation.latestMessage,
          }));
          setAllConversations(modifiedConversations);

          const sortedConversations = modifiedConversations
          .filter(conversation => 
            conversation.participants.includes(currentUser) && 
            conversation.latestMessage && 
            conversation.latestMessage.time 
          )
            .sort((a, b) => {
              const timeA = a.latestMessage && a.latestMessage.time ? a.latestMessage.time : "";
              const timeB = b.latestMessage && b.latestMessage.time ? b.latestMessage.time : "";
              return timeB.localeCompare(timeA); // Sorts descending, swap a and b for ascending
            });

          setFilteredConversations(sortedConversations);
        });

        socket.emit("getAllConversations");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();

    return () => {
      socket.off("conversationList");
      socket.off("latestMessageUpdate");
    };
  }, [allConversations]);

 
   //console.log(allConversations)
  return (
    <ScrollView>
      <View style={styles.mainWrapper}>
        <Header />

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          Chats
        </Text>
        <View style={styles.listContainer}>
  {filteredConversations.length === 0 ? (
    <Text style={{alignSelf: "center"}}>No Chats yet!</Text>
  ) : (
    filteredConversations.map((conversation, index) => (
      <Chatcomponent
        key={index}
        item={conversation}
        currentUser={currentUser}
        role={role}
        idtab={idtab}
      />
    ))
  )}
</View>

      </View>
    </ScrollView>
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
