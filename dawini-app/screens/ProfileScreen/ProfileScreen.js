import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import config from '../../config.json';
const ProfileScreen = (tab) => {
  const { idtab, role } = tab.route.params;

  const navigation = useNavigation();
  const selectedNurse = idtab;
  const [nurse, setNurse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  // console.log(role);
  useEffect(() => {
    if (role == "nurse") {
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

      fetchNurse();
      fetchReviews();
    } else {
      const fetchUser = async () => {
        try {
          const ip = config.ip;
          const response = await fetch(
            `http://${ip}:3000/api/users/${idtab}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user information");
          }
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUser();
    }
  }, []);
  console.log(idtab);
  const imageSource = user && user.photo_uri
  ? { uri: user.photo_uri }
  : user && !user.photo_uri && user.role === "patient"
      ? require('../../assets/hero1.jpg')
      : require('../../assets/hero2.jpg');
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/green.png")}
            resizeMode="contain"
            style={styles.logo}
          />
          <View style={styles.profileContainer}>
            {role == "patient" ? (
              <Image
                style={styles.profilePhoto}
                source={imageSource}
              />
            ) : (
              <Image
                style={styles.profilePhoto}
                source={imageSource}
              />
            )}
            {role == "patient" ? (
              <Text style={styles.nameText}>{user && user.fullName}</Text>
            ) : (
              <Text style={styles.nameText}>{nurse && nurse.fullName}</Text>
            )}
          </View>
        </View>
        {role == "nurse" ? (
              <View>
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
                <Text>No reviews available.</Text>
              )}
              </View>
            ) : ( <View style={styles.profileContainer}>

              <Text style={styles.nameText}>Email</Text>
              <Text >{user && user.email}</Text>
              <Text style={styles.nameText}>description</Text>
              <Text >{user && user.description||"no description"}</Text>
              <Text style={styles.nameText}>Phone</Text>
              <Text >{user &&user.phone||"no description"}</Text>
              </View>
            )}
        
      </ScrollView>
    </>
  );
};

const styles = {
  reviewCard: {
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 5,
    borderWidth: 1, // Sets the border width
    borderColor: "#000",
  },
  reviewAuthor: {
    fontWeight: "bold", // Makes the text bold
    fontSize: 17, // Increases the size of the text
  },
  reviewsTitle: {
    fontWeight: "bold", // Makes the text bold
    fontSize: 24, // Increases the size of the text
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
    marginBottom:70
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

export default ProfileScreen;
