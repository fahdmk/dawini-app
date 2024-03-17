import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginPatient, SignupPatient, SignupNurse} from "./screens";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import BookingScreen from './screens/BookingScreen/BookingScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import ShopScreen from './screens/ShopScreen/ShopScreen';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native'
import React from 'react'
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginPatient'>
        <Stack.Screen
          name="LoginPatient"
          component={LoginPatient}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupPatient"
          component={SignupPatient}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupNurse"
          component={SignupNurse}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen} // This will be the wrapper component for your bottom tab navigator
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="MainScreen" // Corrected name to match the component name
          component={MainScreen} // This will be the wrapper component for your bottom tab navigator
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Define your MainScreen component to wrap the bottom tab navigator
const MainScreen = () => {
  return (
    <Tab.Navigator
    screenOptions={{ headerShown: false }} >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12 }}>Home</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Booking'
        component={BookingScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12 }}>Appointments</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12 }}>Profile</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="user" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Shop'
        component={ShopScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12 }}>Shop</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Entypo name="shop" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};