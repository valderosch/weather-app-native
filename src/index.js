import {View, Text, Alert, StyleSheet, ActivityIndicator, ScrollView, RefreshControl} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import apikey from './addons/info'

let url = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=90455296bffe25c7494fe6a7b285792c`;

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadForecast = async() => {
        setRefreshing(true);

        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted'){
            Alert.alert('Location Error','Location Permission denied! \nPlease give this app permission.');
            await Location.requestForegroundPermissionsAsync();
        }

        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

        const responce = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)
        const data = await responce.json();

        if (!responce.ok){
            Alert.alert('Data Error', 'Something went wrong, while fetching weather data');
        } else{
            setForecast(data);            
        }
        setRefreshing(false);
    }

    useEffect(() => {
        loadForecast(); 
    }, [])

    if(!forecast){
        return(
            <View style={styles.loading}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }

    const current = forecast.current.weather[0];

    return(
        <View>
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => loadForecast()}/>
                }
            style={{marginTop:50}}>
                <Text style={styles.title}>
                    Current Weather 
                </Text> 
                <Text style={styles.location}>
                    Your Location
                </Text> 

            </ScrollView>
        </View>
    )
}

export default Weather;

const styles = StyleSheet.create({
    loading: {
      flex: 1,
      backgroundColor: '#59с2а6',
      alignItems: 'center',
      justifyContent: 'center',
    },

    location: {
        alignItems: 'flex-start',
        textAlign: 'center',
    },

    title: {
        textAlign: 'center',
        fontSize: 35,
        color: '#c2c2c2',
    }
});