import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import {UserType} from "../context/UserContext";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";
import {ViewPropTypes} from "deprecated-react-native-prop-types";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const {userId, setUserId} = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token)
      const userId = decodedToken.userId;
      console.log("Decoded Token:", decodedToken);
      setUserId(userId);
  };
    fetchUser();
  }, []);

  console.log("Fetched userId:", userId);

  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };
    axios
      .post("http://192.168.196.183:8000/addresses", {userId, address})
      .then(response => {
        Alert.alert("Success", "Addresses added successfully");
        setName("");
        setMobileNo("");
        setHouseNo("");
        setStreet("");
        setLandmark("");
        setPostalCode("");
        console.log("Request Payload:", { userId, address });

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch(error => {
        Alert.alert("Error", "Failed to add address");
        console.log("error", error);
      });
  };

 
  return (
    <ScrollView style={{marginTop: 0}}>
      <View style={{height: 50, backgroundColor: "#00CED1"}} />

      <View style={{padding: 10}}>
        <Text style={{fontSize: 17, fontWeight: "bold", color: "#000"}}>
          Add a new Address
        </Text>

        <TextInput
          placeholderTextColor={"black"}
          placeholder="India"
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />

        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 15, fontWeight: "bold", color: "#000"}}>
            Full name (First and last name)
          </Text>

          <TextInput
            value={name}
            onChangeText={text => setName(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter your name"
          />
        </View>

        <View>
          <Text style={{fontSize: 15, fontWeight: "bold", color: "#000"}}>
            Mobile number
          </Text>

          <TextInput
            value={mobileNo}
            onChangeText={text => setMobileNo(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Mobile No"
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 15, fontWeight: "bold", color: "#000"}}>
            Flat,House No,Building,Company
          </Text>

          <TextInput
            value={houseNo}
            onChangeText={text => setHouseNo(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View>
          <Text style={{fontSize: 15, fontWeight: "bold", color: "#000"}}>
            Area,Street,sector,village
          </Text>
          <TextInput
            value={street}
            onChangeText={text => setStreet(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 15, fontWeight: "bold", color: "#000"}}>
            Landmark
          </Text>
          <TextInput
            value={landmark}
            onChangeText={text => setLandmark(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Eg near appollo hospital"
          />
        </View>

        <View>
          <Text style={{fontSize: 15, fontWeight: "bold", color: "#000"}}>
            Pincode
          </Text>

          <TextInput
            value={postalCode}
            onChangeText={text => setPostalCode(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Pincode"
          />
        </View>

        <Pressable
          onPress={handleAddAddress}
          style={{
            backgroundColor: "#FFC72C",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}>
          <Text style={{fontWeight: "bold", color: "#000"}}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
