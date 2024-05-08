import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { socket } from "../utils";
import { GlobalContext } from "../context";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import StarRating from "react-native-star-rating-widget";
import TextArea from "@freakycoder/react-native-text-area";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { AntDesign } from "@expo/vector-icons";
import config from "../config.json";

const ProfileView = (route) => {
  const { id, currentUser, setAllConversations, setCurrentUser } =
    useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [starRating, setStarRating] = useState(3);
  const [reviewText, setReviewText] = useState("");
  const onStarRatingPress = (rating) => {
    setStarRating(rating);
  };

  const onReviewTextChange = (text) => {
    setReviewText(text);
  };

  const navigation = useNavigation();
  const selectedNurse = route.route.params["idCare taker"];
  const [nurse, setNurse] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchNurse();
    fetchReviews();
  }, []);
  const fetchNurse = async () => {
    try {
      const ip = config.ip;
      const response = await fetch(
        `http://${ip}:3000/api/nurses/${selectedNurse}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch nurse information");
      }
      const data = await response.json();
      setNurse(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const ip = config.ip;
      const response = await fetch(
        `http://${ip}:3000/api/reviews/caretaker/${selectedNurse}`
      );
      if (!response.ok) {
        console.log("no reviews");
        setReviews([]);
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
      setReviews([]);
    }
  };

  const handleSubmitReview = async () => {
    try {
      const ip = config.ip;
      const response = await fetch(`http://${ip}:3000/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idCaretaker: selectedNurse,
          idUser: id,
          numberOfStars: starRating,
          description: reviewText,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit review");
      const newReview = await response.json();

      setReviews(newReview || (await response.json()));
      setModalVisible(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
    fetchNurse();
    fetchReviews();
  };

  const handleSendMessage = () => {
    if (!currentUser) {
      console.log("aaaaaaaaaaaaaaaaaaaa");
      return;
    }
    console.log(nurse.fullName);
    socket.emit("startConversation", [currentUser, nurse.fullName]);
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

  const closeModal = () => {
    setModalVisible(false);
  };

  const imageSource =
    nurse && nurse.photo_uri
      ? { uri: nurse && nurse.photo_uri }
      : require("../assets/hero2.jpg");
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <AntDesign name="arrowleft" size={40} color="black" />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/green.png")}
            resizeMode="contain"
            style={styles.logo}
          />
          <View style={styles.profileContainer}>
            <Image style={styles.profilePhoto} source={imageSource} />
            <Text style={styles.nameText}>{nurse && nurse.fullName}</Text>
            <StarRatingDisplay rating={nurse && nurse.rating} />
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Write a review</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.reviewsTitle}>Reviews</Text>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.idReview} style={styles.reviewCard}>
              <Card.Content>
                <Text style={styles.reviewAuthor}>
                  {review.User.fullName || review}
                </Text>
                <Text style={styles.reviewContent}>{review.description}</Text>

                <StarRatingDisplay rating={review.numberOfStars} />
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text>This nurse has no reviews Yet.</Text>
        )}
        <Modal isVisible={modalVisible}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={closeModal}>
              <AntDesign
                name="closecircleo"
                size={30}
                color="white"
                style={{
                  justifyContent: "flex-end",
                  alignSelf: "flex-end",
                  margin: 7,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,
                elevation: 15,
                height: 325,
                width: "90%",
                borderRadius: 16,
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
              }}
            >
              <View
                style={{
                  height: "100%",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 16, margin: 10 }}>
                  How was your experience?
                </Text>
                <View style={{ marginRight: 8, margin: 10 }}>
                  <StarRating
                    enableHalfStar={false}
                    maxStars={5}
                    starSize={30}
                    disabled={false}
                    animation="jello"
                    rating={starRating}
                    fullStarColor="#faec7c"
                    emptyStarColor="#faec7c"
                    starStyle={{ marginLeft: 8 }}
                    onChange={onStarRatingPress}
                  />
                </View>
                <TextArea
                  maxCharLimit={50}
                  placeholderTextColor="black"
                  onChangeText={onReviewTextChange}
                  exceedCharCountColor="red"
                  placeholder={"Write your review..."}
                  style={{ height: 150, borderRadius: 16, margin: 10 }}
                />
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: "95%",
                    borderRadius: 16,
                    backgroundColor: "white",
                    margin: 10,
                  }}
                  onPress={() => {
                    handleSubmitReview();
                  }}
                >
                  <View
                    style={{
                      height: 50,
                      width: "100%",
                      borderRadius: 16,
                      alignContent: "center",
                      justifyContent: "center",
                      backgroundColor: "green",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Submit
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

const styles = {
  backButton: {
    position: "absolute",
    left: 20,
    top: 40,
    zIndex: 1,
  },
  reviewCard: {
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  reviewAuthor: {
    fontWeight: "bold",
    fontSize: 17,
  },
  reviewsTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  container: {
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
  },
  coverPhoto: {
    width: "100%",
    height: 180,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -70,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  bioContainer: {
    padding: 15,
  },
  bioText: {
    fontSize: 16,
    textAlign: "center",
    color: "#A9A9A9",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  statCount: {
    color: "#999",
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
    color: "#999",
    marginLeft: 4,
  },
  button: {
    backgroundColor: "green",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  friendCard: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 2,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendsScroll: {
    paddingBottom: 10,
  },
};

export default ProfileView;
