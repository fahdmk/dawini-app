import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Card } from "react-native-paper";
import * as Location from "expo-location";
import Header from "./Header";
import { COLORS, SIZES, FONTS } from "../../constants1";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { useFocusEffect } from '@react-navigation/native';


export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nurses, setNurses] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [maxDistance, setMaxDistance] = useState(""); // Added state for maximum distance
  const [showSlider, setShowSlider] = useState(false);
  const [topRatedNurses, setTopRatedNurses] = useState([]);
  const [seeall, setSeeall] = useState(false);


  useEffect(() => {
    fetchLocation();
    const locationSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      (newLocation) => {
        setLocation(newLocation);
      }
    );

    return () => {
      // Clean up location subscription
      if (locationSubscription) {
        // locationSubscription.remove();
      }
    };
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchNurses();
      return () => {
        // Optionally: Any cleanup actions
      };
    }, [])
  );
  
  useEffect(() => {
    fetchLocation();
    fetchNurses();
  }, []);

  useEffect(() => {
    searchFilterFunction(search);
  }, [search]);

  const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const fetchNurses = async () => {
    try {
      const response = await fetch("http://192.168.63.229:3000/api/nurses");
      if (!response.ok) {
        throw new Error("Failed to fetch nurses");
      }
      const data = await response.json();

      const sortedNurses = data.sort((a, b) => b.rating - a.rating); // Sort nurses by descending rating
      setNurses(sortedNurses);
      setFilteredDataSource(sortedNurses);

      setTopRatedNurses(sortedNurses.slice(0, 3));
    } catch (error) {
      console.error("Error fetching nurses:", error);
    } finally {
      setLoading(false);
    }
  };
  // console.log(filteredDataSource)
  const searchFilterFunction = (text) => {
    const newData = nurses.filter((item) => {
      const fullName = item.fullName ? item.fullName.toUpperCase() : "";
      const searchText = text.toUpperCase();
      return fullName.includes(searchText); 
    });
    setFilteredDataSource(newData);
    setSearch(text);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance; // distance in meters
  };

  const filterByLocation = (threshold) => {
    if (!location) return nurses;

    return nurses.filter((nurse) => {
      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        nurse.latitude,
        nurse.longitude
      );
      return distance <= threshold;
    });
  };

  const handleSearchByDistance = () => {
    if (!maxDistance || isNaN(maxDistance)) return;
    const threshold = parseInt(maxDistance);
    const filteredNurses = filterByLocation(threshold);
    setFilteredDataSource(filteredNurses);
  };

  const renderTopNurseItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (item && typeof item === "object" && "idCare taker" in item) {
          navigation.navigate("ProfileView", {
            "idCare taker": item["idCare taker"],
            message: "Hello from HomeScreen!",
          });
        } else {
          console.error(
            "Error: item is undefined or idCare taker property is not present:",
            item
          );
        }
      }}
    >
      <Card
        style={{
          ...styles.cardTopContainer,
          padding: 10,
          width: "99%",
          marginLeft: 4,
        }}
      >
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: item.photo_uri,
              }}
              style={styles.imageTop}
            />
          </View>
          <View style={{ padding: SIZES.padding }}>
            <Text
              style={{ fontSize: 14, color: COLORS.black, fontWeight: "bold" }}
            >
              {item.fullName}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="location-on"
                size={16}
                color={COLORS.black}
              />
              <Text style={{ fontSize: 12, marginVertical: 4, marginLeft: 4 }}>
                {item.working_Area}
              </Text>
            </View>
            <StarRatingDisplay rating={item.rating} starSize={25} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderNurseItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (item && typeof item === "object" && "idCare taker" in item) {
          navigation.navigate("ProfileView", {
            "idCare taker": item["idCare taker"],
            message: "Hello from HomeScreen!",
          });
        } else {
          console.error(
            "Error: item is undefined or idCare taker property is not present:",
            item
          );
        }
      }}
    >
      <Card
        style={{
          ...styles.cardContainer,
          padding: 10,
          width: "99%",
          marginLeft: 2,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: item.photo_uri,
              }}
              style={styles.image}
            />
          </View>
          <View style={{ padding: SIZES.padding }}>
            <Text
              style={{ fontSize: 14, color: COLORS.black, fontWeight: "bold" }}
            >
              {item.fullName}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="location-on"
                size={16}
                color={COLORS.black}
              />
              <Text style={{ fontSize: 12, marginVertical: 4, marginLeft: 4 }}>
                {item.working_Area}
              </Text>
            </View>
            <StarRatingDisplay rating={item.rating} starSize={25} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <>
      <Header />
      <View style={{ marginBottom: 2 }}>
        {location && (
          <Text>
            Latitude: {location.coords.latitude}, Longitude:{" "}
            {location.coords.longitude}
          </Text>
        )}
      </View>
      
      <View style={{ flex: 1, marginBottom: 0, padding: 4 }}>
       
        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 1 }}
        >
          <TextInput
            style={styles.textInputStyle}
            onChangeText={setSearch}
            value={search}
            placeholder="Search Nurses"
            mode="outlined"
            outlineColor="green"
            activeOutlineColor="green"
            onFocus={() => setSeeall(true)}     
            />
          <TouchableOpacity onPress={() => setShowSlider(!showSlider)}>
            <Ionicons name="options-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {showSlider && (
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
          >
            <Slider
              style={{ flex: 1 }}
              minimumValue={0}
              maximumValue={20000} // Maximum distance
              step={100} // Step interval
              value={parseInt(maxDistance) || 0}
              onValueChange={(value) => setMaxDistance(value.toString())}
              minimumTrackTintColor="green"
              maximumTrackTintColor="grey"
              thumbTintColor="green"
            />
            <Text style={{ minWidth: 40, textAlign: "center" }}>
              {`${maxDistance} m`}
            </Text>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                handleSearchByDistance();
                setShowSlider(false); // Optionally hide slider after search
              }}
            >
              <Text style={{ color: "white" }}>Filter</Text>
            </TouchableOpacity>
          </View>
        )}
        {!seeall && <>
         <Text style={{ ...FONTS.h3, fontWeight: "bold" }}>Top Rated Nurses</Text>
       
        <View style={{ height: 280, marginTop: 20,marginBottom:20 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={topRatedNurses}
            keyExtractor={(item, index) => item["idCare taker"].toString()}
            renderItem={renderTopNurseItem}
            contentContainerStyle={{ paddingLeft: 10 }}
          />
        </View>
        </>}
       
       <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
        <Text style={{ ...FONTS.h3, fontWeight: "bold",
              justifyContent: "center" }}>All Nurses</Text>
        <TouchableOpacity
            style={{margin: 4,
              padding: 6,
              justifyContent: "",
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 10,
            alignSelf:"flex-end"}}
            onPress={() => setSeeall(true)}
          >
            <Text style={styles.buttonText}>See All nurses</Text>
          </TouchableOpacity>
          </View>
        <FlatList
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          data={filteredDataSource}
          keyExtractor={(item, index) =>
            item["idCare taker"] || index.toString()
          }
          renderItem={renderNurseItem}
        />

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "99%",
    marginLeft: 2,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
  },
  cardTopContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "99%",
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
  },
  imageContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
  },
  imageTop: {
    height: 150,
    width: 150,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
  },
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    width: "85%",
    height: 40,

    paddingLeft: 10,
    margin: 10,
  },
  searchButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "green",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
  },
});
