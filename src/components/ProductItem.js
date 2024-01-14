import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../redux/CartReducer';

const ProductItem = ({item}) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch()
  const addItemToCart = (item) =>{
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  }
  return (
    <Pressable style={{marginHorizontal: 23, marginVertical: 25}}>
      <Image
        style={{width: 150, height: 150, resizeMode: 'contain'}}
        source={{uri: item?.image}}
      />

      <Text
        numberOfLines={1}
        style={{width: 150, marginTop: 10, color: 'black'}}>
        {item.title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 15, fontWeight: 'bold',color: '#000'}}>₹{item?.price}</Text>
        <Text style={{color: '#ffc72c', fontWeight: 'bold'}}>
          {item?.rating.rate} ratings
        </Text>
      </View>
      <Pressable
      onPress={()=> addItemToCart(item)}
        style={{
          backgroundColor: '#ffc72c',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10,
          color: "black"
        }}>
        {addedToCart ? (
          <View>
            <Text style={{color: "#000"}}>Added to Cart</Text>
          </View>
        ) : (
          <Text style={{color: "#000"}}>Add to Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
