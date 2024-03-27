import { View, Text,FlatList ,TouchableOpacity,Image, ScrollView,TextInput,StyleSheet} from 'react-native'
import {React, useState, useEffect }from 'react'
import Header from './Header'
import { COLORS, SIZES, FONTS } from '../../constants1'
import { latestList, shoesList1, shoesList2 } from '../../constants1/data'
import {  Card } from 'react-native-paper'
import * as Location from 'expo-location'
export default function HomeScreen() {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  const [loading, setLoading] = useState(true);
  const [nurses, setNurses] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

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
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const fetchNurses = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/nurses');
      if (!response.ok) {
        throw new Error('Failed to fetch nurses');
      }
      const data = await response.json();
      setNurses(data);
      setFilteredDataSource(data); // Initialize filtered data source
    } catch (error) {
      console.error('Error fetching nurses:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchFilterFunction = (text) => {
    const newData = nurses.filter((item) => {
      const fullName = item.fullName ? item.fullName.toUpperCase() : '';
      const searchText = text.toUpperCase();
      return fullName.includes(searchText); // Use includes() for simple string matching
    });
    setFilteredDataSource(newData);
    setSearch(text);
    console.log('Filtered Nurses:', newData); // Log filtered data
  };
    return (
    <>
   <ScrollView>
    
    <View>
       <Header/>
    </View>
   
     <View style={{
      marginBottom: 12
  }}>
      <Text style={{
          ...FONTS.h3,
          marginVertical: SIZES.padding *2
      }}>Closest Nurses  </Text>
      {location && (
  <View>
    <Text>Timestamp: {location.timestamp}</Text>
    <Text>Mocked: {location.mocked ? 'Yes' : 'No'}</Text>
    <Text>Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}</Text>
  </View>
)}
   <Card
   style={{paddingLeft:5,
           paddingRight:5}}>
      <FlatList
        horizontal={true}
        data={latestList}
        keyExtractor={item=>item.id}
        renderItem={
          ({ item, index })=>(
              <View style={{
                  marginRight: SIZES.padding
              }}>
                  <TouchableOpacity
                   onPress={()=>navigation.navigate("Details")}
                  >
                      <Image
                       source={item.image}
                       style={{
                          height: 140,
                          width: 140
                       }}
                      />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={()=>navigation.navigate("Details")}
                  >
                      <Text style={{
                          fontSize: 14,
                          color: COLORS.black,
                          fontWeight: "bold"
                      }}>
                          {item.fullname}
                      </Text>
                  </TouchableOpacity>
                  <Text style={{
                      fontSize: 10,
                      color: COLORS.black
                  }}>
                      {item.working_Area}
                  </Text>

                
              </View>
         
         )
        }
      />
  </Card>
  </View>
  <View style={{ marginBottom: 15,padding:5 }}>
        <Text style={{ ...FONTS.h3, marginVertical: SIZES.padding * 2 }}>All Nurses</Text>
        
        <View style={{ marginLeft: 1 }}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => setSearch(text)}
              value={search}
              placeholder="Search Nurses"
            />
            
        <FlatList
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          horizontal={false}
          data={filteredDataSource}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Details")}>
              <Card style={{ padding:10, width: "99%" ,marginLeft:2}}>
                <Image source={item.image} style={{ height: 140, width: 140 }} />
                <View style={{ padding: SIZES.padding }}>
                  <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: "bold" }}>
                    {item.fullName}
                  </Text>
                  <Text style={{ fontSize: 12, marginVertical: 4 }}>{item.working_Area}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
        </View>
      </View>
      </ScrollView>
     </>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});