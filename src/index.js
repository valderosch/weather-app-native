import {View, Text, Alert, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, useColorScheme} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import {keys} from './addons/info'
import DateTime from './components/DateTime';
import Forecast from './components/Forecast';
import Locator from './components/Locator';
import Summary from './components/Summary';
import Properties from './components/Properties';
import Hourly from './components/Hourly';

let url = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${keys}`;

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [locations, setLocations] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [locationError, setLocationError] = useState(false);
    const theme = useColorScheme();
    const isDarkTheme = theme === 'dark';

    const checkLocationPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Location Error',
            'Location Permission denied! \nPlease give this app permission.'
          );
          setLocationError(true);
          setRefreshing(false);
          return false;
        }
        return true;
    };

    const loadForecast = async() => {
        setRefreshing(true);

        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted'){
            Alert.alert('Location Error','Location Permission denied! \nPlease give this app permission.');
            await Location.requestForegroundPermissionsAsync();
        }

        const location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        const responce = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)
        const data = await responce.json();

        if (!responce.ok){
            Alert.alert('Data Error', 'Something went wrong, while fetching weather data');
        } else{
            setForecast(data);           
        }

        if (location != null){
            setLocations(location); 
        }
        else {
            Alert.alert('location err', 'Location error while gitting info')
        }
        setRefreshing(false);
        return location;
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
        <View style={[styles.container,
                    isDarkTheme ? { backgroundColor: '#FFE142' } : { backgroundColor: '#FFE142' },
                    ]}>
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => loadForecast()}/>
                }
                style={{marginTop:50}}>
                <Text style={styles.location}>
                {locations && 
                    <Locator latitude={locations.coords.latitude} longitude={locations.coords.longitude} 
                />}
                </Text> 
                <Text style={styles.time}>
                   <DateTime/>
                </Text>
                <Forecast 
                    temp = {forecast.current.temp} 
                    descr = {forecast.current.weather[0].description}/>

                <Summary
                    temp = {forecast.current.temp} 
                    like= {forecast.current.feels_like}/>

                <Properties
                    wind = {forecast.current.wind_speed}
                    humm = {forecast.current.humidity}
                    visbl = {forecast.current.visibility}/>

                <Hourly 
                    hour = {forecast.hourly}
                    temp = {forecast.current.temp}
                    descr = {forecast.current.weather[0].description}
                />
            </ScrollView>
        </View>
    )
}

export default Weather;
//#FFE142
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE142'    
    },

    loading: {
      flex: 1,
      backgroundColor: '#59с2а6',
      color: '#426EFE',
      alignItems: 'center',
      justifyContent: 'center',
    },

    location: {
        alignItems: 'flex-start',
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
        textAlign: 'center',
    },

    time: {
        textAlign: 'center',
        fontSize: 15,
        color: '#FFE142',
        backgroundColor: '#000000',
        marginLeft: 120,
        marginRight: 120,
        padding: 3,
        borderRadius: 100 / 2,
    },
});