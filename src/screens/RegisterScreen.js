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
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    //send a post request to the backend
    axios
      .post("http://192.168.196.183:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully",
          );
          setName("");
          setEmail("");
          setPassword("");
          navigation.replace("Login")
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering",
        );
        console.log("Registration failed", error);
      });
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: "white", alignItems: "center",}}>
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
            Register to Your Account
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
              style={{
                marginLeft: 8,
                width: 34,
                height: 38,
                tintColor: "gray",
                marginBottom: "auto",
              }}
              source={require("../images/person.png")}
            />
            <TextInput
              value={name}
              onChangeText={txt => {
                setName(txt);
              }}
              style={{color: "gray", width: 300, fontSize: name ? 16 : 16}}
              placeholder="Enter Your Name"
            />
          </View>
        </View>
        <View>
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
        <View>
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
              onChangeText={txt => {
                setPassword(txt);
              }}
              secureTextEntry
              style={{color: "gray", width: 300, fontSize: password ? 16 : 16}}
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
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "#FEBE10",
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
            Register
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={{marginTop: 15}}>
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              fontWeight: "bold",
              fontSize: 16,
            }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
