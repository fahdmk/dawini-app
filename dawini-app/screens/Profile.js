import React, { useState, useEffect ,useContext} from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { socket } from "../utils";
import { GlobalContext } from "../context";
import { Card } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProfileView = (route) => {
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
  
    return () => {
      socket.off("conversationList");
      socket.off("latestMessageUpdate");
    };
  }, []);
  
 
  const navigation = useNavigation();
    const selectedNurse = route.route.params['idCare taker'];
const [nurse, setNurse] = useState(null);
const [reviews, setReviews] = useState([]);
useEffect(() => {
  const fetchNurse = async () => {
    try {
      const response = await fetch(`http://192.168.245.229:3000/api/nurses/${selectedNurse}`);
      if (!response.ok) {
        throw new Error('Failed to fetch nurse information');
      }
      const data = await response.json();
      setNurse(data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  
 
  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://192.168.245.229:3000/api/reviews/caretaker/${selectedNurse}`);
      if (!response.ok) {
        console.log("no reviews")
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchNurse();
  fetchReviews();
}, []);
const handleSendMessage = () => {
  // Emit socket event to start a conversation with the nurse
  socket.emit("startConversation", [currentUser, nurse.fullName]);

  // Get the conversationId from the socket response
  socket.on("conversationList", (conversationDetails) => {
    const conversationId = conversationDetails.find(
      (conv) => conv.id === [currentUser, nurse.fullName].sort().join("-")
    ).id;

    // Navigate to Messagescreen with conversationId
    navigation.navigate("Messagescreen", {
      currentGroupName: nurse.fullName,
      currentGroupID: conversationId,
    });
  });
};
   
  const handleEditPress = () => {

  }

 
  return (
    <>
    <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
            <Image
          source={require("../assets/green.png")} 
          resizeMode='contain'
          style={styles.logo}
        />
            <View style={styles.profileContainer}>
                <Image
                style={styles.profilePhoto}
                source={{ uri: nurse?.photo_uri || 'https://via.placeholder.com/150' }}                />
                <Text style={styles.nameText}>{nurse && nurse.fullName}</Text>
            </View>
        </View>

       
        {/* <View style={styles.section}>
            <View>
                <ScrollView horizontal contentContainerStyle={styles.friendsScroll}>
                    {friends.map(({avatar, id}) => (
                        <View style={styles.friendCard} key={id}>
                            <Image style={styles.friendImage} source={{ uri: avatar }} />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View> */}

        

        <View style={styles.section}>
            <TouchableOpacity style={styles.button} onPress={handleEditPress}>
                <Text style={styles.buttonText}>View Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
                <Text style={styles.buttonText}>Send Message</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.reviewsTitle}>Reviews</Text>
        {reviews.length > 0 ? (
        reviews.map(review => (
          <Card key={review.idReview} style={styles.reviewCard}>
            <Card.Content>
              <Text style={styles.reviewContent}>{review.description}</Text>
              <Text style={styles.reviewAuthor}>{review.User.username}</Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text>No reviews available.</Text>
      )}
    </ScrollView>
    
  </>
  );
};

const styles = {
  reviewsTitle: {
    fontWeight: 'bold', // Makes the text bold
    fontSize: 24,       // Increases the size of the text
  },
  container: {
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: 180,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -70,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bioContainer: {
    padding: 15,
  },
  bioText: {
    fontSize: 16,
    textAlign:'center',
    color:'#A9A9A9'
  },
  section: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    marginVertical:5,
    paddingHorizontal:10,
  },
  statCount: {
    color: '#999',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#999',
    marginLeft:4
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  friendCard:{
    width:50,
    height:50,
    borderRadius:25,
    marginLeft:2,
  },
  friendImage:{
    width:50,
    height:50,
    borderRadius:25,
  },
  friendsScroll:{
    paddingBottom:10,

  }
};

export default ProfileView;