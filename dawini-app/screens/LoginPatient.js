import React, { useState ,useContext, useEffect} from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import COLORS from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GlobalContext} from "../context"
const LoginPatient = ({ navigation }) => {
  const {
    setCurrentUser,
    currentUser,
    role,
    setRole,
    id,
    setID

  } = useContext(GlobalContext);
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idtab,setIdtab]=useState("");
 
  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.63.229:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }
  
      const { token, user } = await response.json();
      setRole(user.role);
      setEmail("");
      setPassword(""); 
      
      const userId = user.role === "patient" ? user.idUser : user["idCare taker"];
      setID(userId);
      setIdtab(userId);
      setCurrentUser(user.fullName)
      console.log("User:", user);
      await AsyncStorage.setItem('user', user.fullName);
    } catch (error) {
      console.error("Login error:", error.message);
      Alert.alert("Error", "Invalid credentials. Please try again.");
    }
  };
  useEffect(() => {
    if (idtab && role) {
      navigation.navigate("MainScreen", { idtab, role });
    }
  }, [idtab,role,]);  
  useEffect(() => {
    console.log("Current ID:", idtab ,role);
  }, [idtab]);
  
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 22, alignItems: 'center' }}>
            <Image
              source={require("../assets/logo-white.png")}
              resizeMode='contain'
              style={{
                  width: "90%",
                  height: 140, 
              }}
            />

          </View>
          <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.black,
              }}
            >
             Sign in
            </Text>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Email address
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Password
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                }}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <Button
            title="Login"
            filled
            onPress={handleLogin}
            style={{
              marginTop: 18,
              marginBottom: 4,
              backgroundColor:"green"
            }}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10,
              }}
            />
            <Text style={{ fontSize: 14 }}> Don't have an account ?</Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("SignupPatient")}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 52,
                borderWidth: 1,
                borderColor: COLORS.grey,
                marginRight: 4,
                borderRadius: 10,
              }}
            >
              <Image
                source={require("../assets/facebook.png")}
                style={{
                  height: 25,
                  width: 20,
                  marginRight: 8,
                }}
                resizeMode="contain"
              />

              <Text>Register As Patient</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("SignupNurse")}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 52,
                borderWidth: 1,
                borderColor: COLORS.grey,
                marginRight: 4,
                borderRadius: 10,
              }}
            >
              <Image
                source={require("../assets/google.png")}
                style={{
                  height: 25,
                  width: 25,
                  marginRight: 8,
                }}
                resizeMode="contain"
              />

              <Text>Register As Nurse</Text>
            </TouchableOpacity>
          </View>

        </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginPatient;
