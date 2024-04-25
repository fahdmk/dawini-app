import { StyleSheet, Text, View } from "react-native";

export default function Messagecomponent({ currentUser, item }) {
  const isCurrentUser = item.sender === currentUser;

  return (
    <View style={isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer}>
      <View style={styles.messageItemWrapper}>
        <View style={[styles.messageItem, isCurrentUser && styles.currentUserMessage]}>
          <Text style={isCurrentUser ? styles.currentUserText : styles.otherUserText}>
            {item.text}
          </Text>
        </View>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  currentUserContainer: {
    alignItems: "flex-end",
  },
  otherUserContainer: {
    alignItems: "flex-start",
  },
  messageItemWrapper: {
    maxWidth: "50%",
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
  }
});
