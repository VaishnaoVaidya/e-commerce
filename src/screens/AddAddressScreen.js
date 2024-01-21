import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {UserType} from "../context/UserContext";
import {ViewPropTypes} from "deprecated-react-native-prop-types";
import axios from "axios";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const {userId, setUserId} = useContext(UserType);
  // console.log("userId:", userId);

  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.196.183:8000/addresses/${userId}`,
      );
      const {addresses} = response.data;

      setAddresses(addresses);
    } catch (error) {
      // console.log("error", error);
    }
  };

  // console.log("adresses:", addresses);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: "#00ced1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            height: 38,
            flex: 1,
            borderRadius: 3,
          }}>
          <Image
            source={require("../images/search.png")}
            style={{
              width: 22,
              height: 22,
              tintColor: "black",
              marginLeft: 10,
            }}
          />
          <TextInput
            style={{fontSize: 18, fontWeight: "500", padding: 5}}
            placeholder="Search Amazon.in"
          />
        </Pressable>
        <Image
          source={require("../images/mic.png")}
          style={{
            width: 28,
            height: 28,
            tintColor: "black",
          }}
        />
      </View>

      <View style={{padding: 10}}>
        <Text style={{color: "#000", fontSize: 20, fontWeight: "bold"}}>
          Your Addresses
        </Text>

        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 8,
            paddingHorizontal: 5,
          }}>
          <Text Style={{color: "black", fontSize: 20, fontWeight: "bold"}}>
            Add a new Address
          </Text>
          <Image
            source={require("../images/right-arrow.png")}
            style={{
              width: 22,
              height: 22,
              tintColor: "black",
            }}
          />
        </Pressable>

        <Pressable>
          {/*  all the added addresses */}
          {addresses?.map((item, index) => (
            <Pressable
              style={{
                borderWidth: 1,
                borderTopColor: "#d0d0d0",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}>

                <View style={{flexDirection: "row", alignItems: "center", gap: 3}}>
                  <Text>{item?.name}</Text>
                  <Image
                source={require("../images/locate-sharp.png")}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: "#0066b2",
                }}
              /><Text>{item?.name}</Text>
                  <Image
                source={require("../images/locate-sharp.png")}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: "#0066b2",
                }}
              /><Text>{item?.name}</Text>
                  <Image
                source={require("../images/locate-sharp.png")}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: "#0066b2",
                }}
              /><Text>{item?.name}</Text>
                  <Image
                source={require("../images/locate-sharp.png")}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: "#0066b2",
                }}
              /><Text>{item?.name}</Text>
                  <Image
                source={require("../images/locate-sharp.png")}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: "#0066b2",
                }}
              />
                </View>
              </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
