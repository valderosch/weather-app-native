import React, { useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import * as Location from 'expo-location';
import { COLOR } from '../../constants';

const Locator = ({latitude, longitude}) => {
  const [userAddres, setUserAddress] = useState('City of dreams');

  const reverseGeocode = async () => {
      try {
        console.log("Inside LATLON", longitude);
        const reversedGeocodeAddress = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });     
        console.log("reversed geolocation ", reversedGeocodeAddress);
        if (reversedGeocodeAddress.length > 0) {
          const { city } = reversedGeocodeAddress[0];
          const formattedAddress = `${city ? city : 'Where are you?'}`;
          console.log('User Location:', formattedAddress);
          setUserAddress(formattedAddress);
        }
      } catch (error) {
        console.log('Reverse geocoding error:', error);
      }
      return '';
  }
    
    reverseGeocode(latitude, longitude);

    return(
        <View>
            <Text style = {styles.text}>📍 {userAddres ? userAddres : 'City of Dreams'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  text: {
      alignSelf: 'center',
      width: Dimensions.get('screen').width * 0.8,
      height: Dimensions.get('screen').width * 0.1,
      fontWeight: '600',
      fontSize: 25,
      marginTop: Dimensions.get('screen').width * 0.05,
      textAlign: 'center',
      color: COLOR.black,
      backgroundColor: COLOR.primary
  },

});

export default Locator;