import React, { useContext, useEffect, useRef,useState } from "react";
import { ScrollView,FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, View ,TouchableOpacity} from "react-native";
import { GlobalContext } from "../context";
import Messagecomponent from "../components/Messagecomponent";
import { socket } from "../utils/index";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Modal } from 'react-native-paper';
import COLORS from "../constants/colors";
import dayjs from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';



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
  const [visible, setVisible] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(new Date());

  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };


  useEffect(() => {
    // Fetch initial messages on component mount
    socket.emit('findGroup', currentGroupID);

    const handleFoundGroup = (allChats) => {
      setAllChatMessages(Object.values(allChats));
     
    };

    const handleNewMessage = (newMessage) => {
      setAllChatMessages((prevMessages) => [...prevMessages, newMessage]);
      messagesEndRef.current = true;
    };

    socket.on('foundGroup', handleFoundGroup);
    socket.on('newMessage', handleNewMessage);
    
    return () => {
      socket.off('foundGroup', handleFoundGroup);
      socket.off('newMessage', handleNewMessage);
     
    };
   
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
    <>
   
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
          keyExtractor={(item) => item.id} 
          extraData={allChatMessages.length} 
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: false })} // Add this line
        />
        ) : (
          <Text>No messages available</Text>
        )}
      </View>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <View style={styles.modalContent}>
       <ScrollView>
          <Text style={styles.modalTitle}>Appointment</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Select your appointment date"
                placeholderTextColor={COLORS.black}
                editable={false}
                style={{ width: "80%" }}
                value={dayjs(date).format('YYYY-MM-DD')}
              />
            </View>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
            mode="single"
            date={date}
            onChange={(params) =>{ setDate(params.date)
            setDate(params.date)
          }}
            timePicker="true"
          />
          )}
         
          <TextInput
            style={styles.modalInput}
            placeholder="Number of hours"
            keyboardType="numeric"
          />
       </ScrollView>
        </View>
      </Modal>
      <View style={styles.messageInputContainer}>
      <Pressable  onPress={showModal}>
      <AntDesign name="book" size={30} color="black"style={{marginTop:5,marginRight:2}} />
      
      </Pressable>
        <TextInput
          style={styles.messageInput}
          value={currentChatMessage}
          onChangeText={(value) => setCurrentChatMessage(value)}
          placeholder="Enter your message"
        />
        <Pressable onPress={handleAddNewMessage} style={styles.button}>
        <MaterialIcons name="send" size={24} color="white" />
                </Pressable>
      </View>
    </View>
    </>
  );
}
const containerStyle = {backgroundColor: 'white', padding: 20,margin: 0,};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#eee",
  },
  messageInputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 8,
    justifyContent: "center",
    flexDirection: "row",
  },
  messageInput: {
    borderWidth: 1,
    padding: 7,
    flex: 1,
    borderRadius: 50,
    marginRight: 10,
   
  },
  button: {
    width: "15%",
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
  
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
