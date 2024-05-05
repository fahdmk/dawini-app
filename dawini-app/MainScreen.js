import { Entypo, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import BookingScreen from './screens/BookingScreen/BookingScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import Chatscreen from "./screens/Chatscreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import GlobalState from "./context";

const Tab = createBottomTabNavigator();
const MainScreen = (tab) => {
 
    const { idtab , role } = tab.route.params;
    
    return (
      <GlobalState>
      <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false,
        tabBarStyle: {
          display: 'flex'
        },
      }}
      > 
       {role=="patient"&&
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
      }
        <Tab.Screen
          name='Booking'
          component={BookingScreen}
          initialParams={{ idtab, role }} 
          options={{
            tabBarLabel: ({ color }) => <Text style={{ color, fontSize: 12 }}>Appointments</Text>,
            tabBarIcon: ({ color, size }) => <AntDesign name="book" size={size} color={color} />
          }}
        />
        <Tab.Screen
          name='Chatscreen'
          component={Chatscreen}
          initialParams={{ idtab, role }} 
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
          initialParams={{ idtab, role }} 
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12 }}>Profile</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <SimpleLineIcons name="user" size={size} color={color} />
            )
          }}
        />
       
      </Tab.Navigator>
      </GlobalState>
    );
  };
  export default MainScreen ;