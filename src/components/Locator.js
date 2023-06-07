import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {geokey} from '../addons/info'

const Locator = (props) => {
    const [loc, setLoc] = useState(null);
    //Reverse geolocation by longitude & latitude
    //
    const loadLocation = async() => {
        setRefreshing(true)
        const responce = await fetch("https://api.exoapi.dev/reverse-geocoding", {
            method: "POST",
            headers: {
              Authorization: `Bearer <${geokey}>`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lat: {myLat},
              lon: {myLon},
              locale: "en-GB",
            }),
        })
        const data = await response.json();
        if (!response.ok){
            Alert.alert('Location Error', 'Something went wrong, while fetching location data');
        } else{
            setLoc(data);            
        }
        setRefreshing(false);
    }

    useEffect(() => {
        loadLocation(); 
    }, [])

    return(
        <View>
            <Text>
                {/* {loc.city}. {loc.region} */}
            </Text>
        </View>
    )
}

export default Locator;