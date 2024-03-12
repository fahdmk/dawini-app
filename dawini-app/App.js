import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginPatient, SignupPatient, SignupNurse, Welcome } from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="LoginPatient"
          component={LoginPatient}
          options={{
            headerShown: false
          }}
        />
        
        <Stack.Screen
          name="SignupPatient"
          component={SignupPatient}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SignupNurse"
          component={SignupNurse}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}