import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken") 

        if(token){
          navigation.replace("Main")
        }
      } catch (error) {
        console.log("Error message" ,error);
      }
    }
    checkLoginStatus()
  }, [])
  

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.203.183:8000/login", user)
      .then((response) => {
        console.log( JSON.stringify(response));
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid Email");
        console.log(error);
      });
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: "white", alignItems: "center"}}>
      <View>
        <Image
          style={{width: 150, height: 100}}
          source={require("../images/amazon.png")}
        />
      </View>
      <KeyboardAvoidingView>
        <View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "#000",
              alignSelf: "center",
            }}>
            Login to Your Account
          </Text>
        </View>
        <View style={{marginTop: 70}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#b0b0b0",
              paddingVertical: 2,
              borderRadius: 5,
              marginTop: 30,
            }}>
            <Image
              style={{marginLeft: 8, width: 34, height: 24, tintColor: "gray"}}
              source={require("../images/email.png")}
            />
            <TextInput
              value={email}
              onChangeText={txt => {
                setEmail(txt);
              }}
              style={{color: "gray", width: 300, fontSize: email ? 16 : 16}}
              placeholder="Enter Your Email"
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#b0b0b0",
              paddingVertical: 2,
              borderRadius: 5,
              marginTop: 30,
            }}>
            <Image
              style={{marginLeft: 8, width: 33, height: 33, tintColor: "gray"}}
              source={require("../images/lock.png")}
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={txt => {
                setPassword(txt);
              }}
              style={{color: "gray", width: 300, fontSize: email ? 16 : 16}}
              placeholder="Enter Your Password"
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Text style={{color: "#000", fontWeight: "800"}}>
            Keep me Logged in
          </Text>

          <Text style={{color: "#007fff", fontWeight: "800"}}>
            Forgot Password
          </Text>
        </View>

        <View style={{marginTop: 80}} />
        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: "#febe10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}>
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
            }}>
            Login
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("Register");
          }}
          style={{marginTop: 15}}>
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              fontWeight: "bold",
              fontSize: 16,
            }}>
            Don"t have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
