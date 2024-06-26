import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have Ionicons imported
import { useNavigation } from '@react-navigation/native'; // Import this if not already done
import { GlobalContext } from '../../context'; 
import { MaterialIcons } from '@expo/vector-icons';
const Header = () => {
  const navigation = useNavigation();
  const { setRole, setID } = useContext(GlobalContext);

  const handleLogout = () => {
    setRole(null);
    setID(null);
    navigation.navigate('LoginPatient');
  };

  return (
    <View style={styles.Container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.png")}
          resizeMode='contain'
          style={styles.logo}
        />
      </View>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        <View >
        <MaterialIcons name="logout" size={24} color="black" style={{alignSelf:"center"}} />
        <Text style={styles.logoutText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    height:90 ,
    padding:0,
    paddingTop: 30,
    paddingRight: 30,
    backgroundColor: '#007025',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 200,
    height: 55,
  },
  logoutButton: {
    flexDirection: 'row',
    position: 'absolute',  
    right: 20,              
    top: 40,               
    zIndex: 1,   
  },
  logoutText: {
    marginLeft: 5,
    color: 'black',
    fontSize: 15,
  }
});

export default Header;
