import React, { useContext, useEffect, useRef } from "react";
import { FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalContext } from "../context";
import Messagecomponent from "../components/Messagecomponent";
import { socket } from "../utils/index";
import { Socket } from "socket.io-client";

export default function Messagescreen({ navigation, route }) {
  const messagesEndRef = useRef(false);
  const { currentGroupName, currentGroupID } = route.params;
  const {
    allChatMessages,
    setAllChatMessages,
    currentUser,
    currentChatMessage,
    setCurrentChatMessage,
  } = useContext(GlobalContext);
  const flatListRef = useRef(null);
  useEffect(() => {
    // Fetch initial messages on component mount
    socket.emit('findGroup', currentGroupID);

    const handleFoundGroup = (allChats) => {
      setAllChatMessages(Object.values(allChats));
     
    };

    const handleNewMessage = (newMessage) => {
      setAllChatMessages((prevMessages) => [...prevMessages, newMessage]);
      messagesEndRef.current = true;
      // console.log(allChatMessages);
    };

    socket.on('foundGroup', handleFoundGroup);
    socket.on('newMessage', handleNewMessage);
    
    return () => {
      socket.off('foundGroup', handleFoundGroup);
      socket.off('newMessage', handleNewMessage);
     
    };
   
  }, [allChatMessages]); 
  useEffect(() => {
    // Scroll to bottom whenever a new message is added
    if (messagesEndRef.current && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: false });
      messagesEndRef.current = false; // Reset the ref after scrolling
    }
  }, [allChatMessages]);

  function handleAddNewMessage() {
    const timeData = {
      hr:
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : new Date().getHours(),
      mins:
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes(),
    };

    if (currentUser) {
      
      socket.emit("newChatMessage", {
        message: currentChatMessage,
        conversationId: currentGroupID, 
        currentUser: currentUser,
        timeData: timeData,
      });
 
      setCurrentChatMessage("");
      Keyboard.dismiss();
     
      
    }
  }
  
  
 
  return (
    <View style={styles.wrapper}>
       <View
        style={[styles.wrapper, { paddingVertical: 15, paddingHorizontal: 10 }]}
      >
        {allChatMessages[2] && allChatMessages[2].length > 0 ? (
          <FlatList
          ref={flatListRef}
          data={allChatMessages[2]}
          renderItem={({ item }) => (
            <Messagecomponent item={item} currentUser={currentUser} />
          )}
          keyExtractor={(item) => item.id} // Use the improved keyExtractor
          extraData={allChatMessages.length} // Add extraData prop
        />
        ) : (
          <Text>No messages available</Text>
        )}
      </View>
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          value={currentChatMessage}
          onChangeText={(value) => setCurrentChatMessage(value)}
          placeholder="Enter your message"
        />
        <Pressable onPress={handleAddNewMessage} style={styles.button}>
          <Text style={styles.buttonText}>SEND</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#eee",
  },
  messageInputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  messageInput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    borderRadius: 50,
    marginRight: 10,
  },
  button: {
    width: "30%",
    backgroundColor: "#703efe",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
