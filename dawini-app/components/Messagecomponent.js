import { StyleSheet, Text, View,Button,TouchableOpacity } from "react-native";

export default function Messagecomponent({ currentUser, item }) {
  const isCurrentUser = item.sender === currentUser;

  // Function to determine if the message is an appointment based on its properties
  const isAppointment = item => item.date;
// console.log(item)
  const renderContent = () => {
    if (isAppointment(item)) {
      
      return (<>
      {isCurrentUser ?(
        <View>
          <Text style={styles.appointmentTitle1}>Appointment</Text>
          <Text style={styles.currentUserText}>
            Date: {item.date}
          </Text>
          <Text style={styles.currentUserText}>
            Duration: {item.duration} hours
          </Text>
         
        </View>
      ):(
         <View>
         <Text style={styles.appointmentTitle}>Appointment</Text>
         <Text style={isCurrentUser ? styles.currentUserText : styles.otherUserText}>
           Date: {item.date}
         </Text>
         <Text style={isCurrentUser ? styles.currentUserText : styles.otherUserText}>
           Duration: {item.duration} hours
         </Text>
         <View style={styles.fixToText}>
         <TouchableOpacity  style={styles.Dbutton}>
    <Text >Decline</Text>
  </TouchableOpacity>
  <TouchableOpacity  style={styles.Abutton}>
    <Text style={{color:"white"}}>Accept</Text>
  </TouchableOpacity>
      </View>
       </View>)}
       </>
      );
    } else {
      // Render regular text message
      return (
        <Text style={isCurrentUser ? styles.currentUserText : styles.otherUserText}>
          {item.text}
        </Text>
      );
    }
  };

  return (
    <View style={isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer}>
      <View style={styles.messageItemWrapper}>
        <View style={[styles.messageItem, isCurrentUser && styles.currentUserMessage]}>
          {renderContent()}
        </View>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Dbutton: {
    backgroundColor: 'white', 
    padding: 10,
    borderRadius: 10, 
    borderColor: 'green',
    borderWidth: 2, 
    alignItems: 'center',
    justifyContent: 'center', 
    height: 45, 
    margin: 3 
  },
  Abutton: {
    backgroundColor: 'green', 
    padding: 10,
    borderRadius: 10, 
    borderColor: 'green',
    borderWidth: 2, 
    alignItems: 'center',
    justifyContent: 'center', 
    height: 45, 
    margin: 3 
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  currentUserContainer: {
    alignItems: "flex-end",
  },
  otherUserContainer: {
    alignItems: "flex-start",
  },
  messageItemWrapper: {
    maxWidth: "75%", 
    marginBottom: 15,
  },
  messageItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
  currentUserMessage: {
    backgroundColor: "green",
  },
  currentUserText: {
    color: "white",
  },
  otherUserText: {
    color: "#000",
  },
  messageTime: {
    marginLeft: 10,
  },
  appointmentTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "green", 
  },
   appointmentTitle1: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "white", 
  }
});
