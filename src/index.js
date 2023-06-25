import { View, Text, Alert, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, useColorScheme, TouchableOpacity, Dimensions, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import * as Location from 'expo-location';
import {keys} from './addons/info'
import DateTime from './components/DateTime';
import Forecast from './components/Forecast';
import Locator from './components/Locator';
import Summary from './components/Summary';
import Properties from './components/Properties';
import Hourly from './components/Hourly';
import { COLOR } from '../constants';

let url = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${keys}`;

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [locations, setLocations] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [locationError, setLocationError] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [showPermissionDenied, setShowPermissionDenied] = useState(false);
    const [requestingPermission, setRequestingPermission] = useState(false);
    const [loading, setLoading] = useState(true);
    const theme = useColorScheme();
    const isDarkTheme = theme === 'dark';

    // Internet connection check
    const checkInternetConnection = () => {
        NetInfo.fetch().then((state) => {
          setIsConnected(state.isConnected);
          setLoading(false);
        });
      };

    // check user location permision
    const checkLocationPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        setRequestingPermission(false);
        setShowPermissionDenied(true);
          Alert.alert(
            'User Location Error',
            'User Location Permission denied! \nPlease give this app permission to continue.'
          );
          setLocationError(true);
          setRefreshing(false);
          return false;
        }
        setShowPermissionDenied(false);
        return true;
    };

    const getLocation = async () => {
        const hasLocationPermission = await checkLocationPermissions();
        if (!hasLocationPermission) {
          return;
        }
        try {
          let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
          if (!location) {
            location = await getLocation();
          }
          setLocations(location);
        } catch (error) {
          console.log('Error fetching location:', error);
          setLocationError(true);
        }
      };
    const loadForecast = async () => {
        setRefreshing(true);
    
        const hasLocationPermission = await checkLocationPermissions();
        if (!hasLocationPermission) {
          setRefreshing(false);
          return;
        }
    
        try {
            await getLocation();
        
            if (locationError) {
              setRefreshing(false);
              return;
            }
            if (locations && locations.coords) {
              const response = await fetch(
                `${url}&lat=${locations.coords.latitude}&lon=${locations.coords.longitude}`
              );
              const data = await response.json();
        
              if (!response.ok) {
                Alert.alert('Data Error', 'Something went wrong while fetching weather data');
              } else {
                setForecast(data);
              }
            }
          } catch (error) {
            console.log('Error fetching weather data:', error);
            setLocationError(true);
          }
    
        setRefreshing(false);
    };

    const requestLocationPermission = async () => {
        console.log('called func');
        setRequestingPermission(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setShowPermissionDenied(true);
        }
        setRequestingPermission(false);
    };

    useEffect(() => {
        loadForecast();
        checkInternetConnection(); 
    }, [])


    //Connection
    if (!isConnected) {
        return (
          <View style={styles.permission_body}>
            <Image source={require('../assets/icons/conection.png')} style={styles.permision_image} />
            <View style={styles.permission_info}>
              <Image source={require('../assets/icons/info.png')} style={styles.permision_info_img} />
              <Text style={styles.permission_text}>No Internet Connection</Text>
            </View>
          </View>
        );
    }

    // Geo Permissions
    if (!forecast) {
        if (locationError) {
          return (
            <View style={styles.permission_body}>
                <Image source={require('../assets/icons/location.png')} alt="humidity" style={styles.permision_image}/>
                <View style = {styles.permission_info}>
                    <Image source={require('../assets/icons/info.png')} alt="humidity" style={styles.permision_info_img}/>
                    <Text style={styles.permission_text}>
                        This app requires location permission.
                    </Text>
                </View>
                <TouchableOpacity onPress={requestLocationPermission} style = {styles.permision_button}>
                    <Text style= {styles.permission_btn_text}>Request Permission</Text>
                </TouchableOpacity>
            </View>
          );
        }
    
        return (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        );
    }
    
    const current = forecast.current.weather[0];
    return(
        <View style={[styles.container,
                    isDarkTheme ? { backgroundColor: '#FFE142' } : { backgroundColor: '#FFE142' },
                    ]}>
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => loadForecast()} style={styles.refreshControl}/>
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

const screenw = Dimensions.get('screen').width;
const screenh = Dimensions.get('screen').height;
//#FFE142
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE142'    
    },
    refreshControl:{
        backgroundColor: COLOR.white
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

    permission_body: {
        flex: 1,
        width: screenw,
        height: screenh,
        backgroundColor: COLOR.primary,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: screenw * 0.05
    },

    permision_image: {
        width: screenw * 0.9,
        height: screenw * 0.9,
    },

    permission_info:{
        width: screenw * 0.85,
        height: screenw * 0.3,
        borderRadius: 30,
        backgroundColor: COLOR.halfwhited,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        padding: screenw * 0.05
    },

    permision_info_img: {
        width: screenw * 0.2,
        height: screenw * 0.2,
    },

    permission_text: {
        width: '65%',
        height: '70%',
        fontSize: 18,
        fontWeight: '500',
    },

    permision_button: {
        width: screenw * 0.6, 
        height: screenw * 0.15,
        backgroundColor: COLOR.halfblacked,
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    
    permission_btn_text: {
        color: COLOR.white,
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default Weather;