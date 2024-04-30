import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import GlobalState from "./context";
import LoginPatient from "./screens/LoginPatient";
import SignupPatient from "./screens/SignupPatient";
import SignupNurse from "./screens/SignupNurse";
import { GlobalContextProvider } from './context';
import Messagescreen from "./screens/Messagescreen";
import ProfileView from "./screens/Profile";
import MainScreen from "./MainScreen"
const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}

