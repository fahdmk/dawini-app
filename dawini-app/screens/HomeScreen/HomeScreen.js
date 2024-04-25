import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  List,
} from "react-native";
import { Card } from "react-native-paper";
import * as Location from "expo-location";
import Header from "./Header";
import { COLORS, SIZES, FONTS } from "../../constants1";
import Slider from "@react-native-community/slider";
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nurses, setNurses] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [maxDistance, setMaxDistance] = useState(""); // Added state for maximum distance
  const [showSlider, setShowSlider] = useState(false);
 
  useEffect(() => {
 
   
    // // Fetch the initial location
    fetchLocation();

    // Subscribe to location updates
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
      const response = await fetch("http://192.168.195.229:3000/api/nurses");
      if (!response.ok) {
        throw new Error("Failed to fetch nurses");
      }
      const data = await response.json();
      setNurses(data);
      setFilteredDataSource(data); // Initialize filtered data source
    } catch (error) {
      console.error("Error fetching nurses:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchFilterFunction = (text) => {
    const newData = nurses.filter((item) => {
      const fullName = item.fullName ? item.fullName.toUpperCase() : "";
      const searchText = text.toUpperCase();
      return fullName.includes(searchText); // Use includes() for simple string matching
    });
    setFilteredDataSource(newData);
    setSearch(text);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // meters
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
                uri: item.photo_uri
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
  
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="location-on" size={16} color={COLORS.black} />
              <Text style={{ fontSize: 12, marginVertical: 4, marginLeft: 4 }}>
                {item.working_Area}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <>
      <Header />
      <View style={{ marginBottom: 12 }}>
        {location && (
          <Text>
            Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
          </Text>
        )}
      </View>
      <View style={{ marginBottom: 15, padding: 5 }}>
        <Text style={{ ...FONTS.h3, marginVertical: SIZES.padding * 2 }}>
          All Nurses
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 1 }}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={setSearch}
            value={search}
            placeholder="Search Nurses"
            mode="outlined"
            outlineColor="green"
            activeOutlineColor="green"
          />
          <TouchableOpacity onPress={() => setShowSlider(!showSlider)}>
            <Ionicons name="options-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {showSlider && (
          <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
            <Slider
              style={{ flex: 1 }}
              minimumValue={0}
              maximumValue={20000} // Maximum distance
              step={100} // Step interval
              value={parseInt(maxDistance) || 0}
              onValueChange={value => setMaxDistance(value.toString())}
              minimumTrackTintColor="green"
              maximumTrackTintColor="grey"
              thumbTintColor='green'
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
        <FlatList
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          data={filteredDataSource}
          keyExtractor={(item) => item["idCare taker"]}
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
    borderWidth: 1, // Sets the border width
    borderColor: "grey", // Sets the border color, change as needed
    borderRadius: 10,
  },
  imageContainer: {
    borderRadius: 8, // Adjust border radius as needed
    overflow: "hidden", // Clip the image to the border radius
  },
  image: {
    height: 70,
    width: 70,
    borderWidth: 1, // Sets the border width
    borderColor: '#000', // Sets the border color, change as needed
    borderRadius: 10,
  },
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    width:"85%",
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
});
