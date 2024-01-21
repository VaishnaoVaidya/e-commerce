import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../redux/CartReducer';

const ProductInfoScreen = () => {
  const route = useRoute();
  const {width} = Dimensions.get('window');
  const navigation = useNavigation();
  const height = (width * 100) / 100;
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  const cart = useSelector(state => state.cart.cart);
  console.log(cart);
  return (
    <ScrollView
      style={{marginTop: 0, flex: 1, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: '#00ced1',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: 'white',
            height: 38,
            flex: 1,
            borderRadius: 3,
          }}>
          <Image
            source={require('../images/search.png')}
            style={{
              width: 28,
              height: 28,
              tintColor: 'black',
              marginLeft: 10,
            }}
          />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>
        <Image
          source={require('../images/mic.png')}
          style={{
            width: 28,
            height: 28,
            tintColor: 'black',
          }}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{width, height, marginTop: 25, resizeMode: 'contain'}}
            source={{uri: item}}
            key={index}>
            <View
              style={{
                padding: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#c60c30',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: 12,
                  }}>
                  20% off
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#e0e0e0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../images/share.png')}
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: 'black',
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#e0e0e0',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 'auto',
                marginLeft: 20,
                marginBottom: 20,
              }}>
              <Image
                source={require('../images/heart.png')}
                style={{
                  width: 28,
                  height: 28,
                  tintColor: 'black',
                }}
              />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{padding: 10}}>
        <Text style={{fontSize: 15, fontWeight: '500', color: '#000'}}>
          {route.params.title}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: '#000',
            marginTop: 3,
          }}>
          {' '}
          ₹{route.params.price}
        </Text>
      </View>
      <Text style={{height: 1, borderColor: '#d0d0d0', borderWidth: 1}}></Text>

      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Text style={{color: '#000'}}>Color: </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000'}}>
          {route.params.color}{' '}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Text style={{color: '#000'}}>Size: </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000'}}>
          {route.params.size}{' '}
        </Text>
      </View>
      <Text style={{height: 1, borderColor: '#d0d0d0', borderWidth: 1}}></Text>

      <View style={{padding: 10}}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#000',
            marginVertical: 5,
          }}>
          Total: ₹{route.params.price}
        </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#00ced1'}}>
          FREE delivery Tommorow by 3 PM, Order within 10hrs 30 mins
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
            alignItems: 'center',
            gap: 5,
          }}>
          <Image
            source={require('../images/location-filled.png')}
            style={{
              width: 28,
              height: 28,
              tintColor: 'black',
              marginLeft: 10,
            }}
          />
          <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000'}}>
            Deliver to Vaishnao - Mehkar 443301
          </Text>
        </View>
      </View>

      <Text style={{color: 'green', marginHorizontal: 10, fontWeight: '500'}}>
        IN Stock
      </Text>

      <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        style={{
          backgroundColor: '#ffc727',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        {addedToCart ? (
          <View>
            <Text style={{color: "#000"}}>Added to Cart</Text>
          </View>
        ) : (
          <Text style={{color: "#000"}}>Add to Cart</Text>
        )}
      </Pressable>

      <Pressable
        style={{
          backgroundColor: '#ffac1c',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
