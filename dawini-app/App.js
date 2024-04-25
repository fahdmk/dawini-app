import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import React from 'react';
import GlobalState from "./context";
import LoginPatient from "./screens/LoginPatient";
import SignupPatient from "./screens/SignupPatient";
import SignupNurse from "./screens/SignupNurse";
import HomeScreen from './screens/HomeScreen/HomeScreen';
import BookingScreen from './screens/BookingScreen/BookingScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import ShopScreen from './screens/ShopScreen/ShopScreen';
import Chatscreen from "./screens/Chatscreen";
import Messagescreen from "./screens/Messagescreen";
import ProfileView from "./screens/Profile";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GlobalState> 
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
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Messagescreen"
            component={Messagescreen}
            options={({ route }) => ({ title: route.params.currentGroupName })}
          />
          <Stack.Screen
            name="ProfileView"
            component={ProfileView}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalState>
  );
}

const MainScreen = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'black',
      tabBarShowLabel: false,
      tabBarStyle: {
        display: 'flex',
      },
    }}
    >
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
        name='Chatscreen'
        component={Chatscreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12 }}>Chats</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="bubbles" size={size} color={color} />
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
      {/* <Tab.Screen
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
      /> */}
    </Tab.Navigator>
  );
};
