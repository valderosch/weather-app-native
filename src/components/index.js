import { View, Text, Alert, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, useColorScheme, TouchableOpacity, Dimensions, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import * as Location from 'expo-location';
import {keys} from '../addons/info'
import DateTime from './DateTime';
import Forecast from './Forecast';
import Locator from './Locator';
import Summary from './Summary';
import Properties from './Properties';
import Hourly from './Hourly';
import { COLOR } from '../../constants';
import connectionImg from "../../assets/icons/connection.png";
import infoImg from "../../assets/icons/info.png";
import {useDispatch, useSelector} from "react-redux";
import {setGeoData, setGeolocationPermission, setInternetStatus} from "../reducers/utilsReducer";
import {setForecastData} from "../reducers/weatherReducer";

let url = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${keys}`;

const Weather = () => {
    const dispatch = useDispatch();
    const forecast = useSelector(state => state.weather.forecast);
    const geoPermission = useSelector(state => state.utils.geoPermission);
    const connection = useSelector(state => state.utils.internetAvailability);
    const geoData = useSelector(state => state.utils.geoData);
    // const [forecast, setForecast] = useState(null);
    // const [locations, setLocations] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    // const [connectionStatus, setConnectionStatus] = useState(false);
    const [locationStatus, setLocationStatus] = useState(false);
    const theme = useColorScheme();
    const isDarkTheme = theme === 'dark';

    useEffect(() => {
        const checkPermissions = async () => {
            const hasLocationPermission = await checkLocationPermission();
            dispatch(setGeolocationPermission(hasLocationPermission));
            const isConnected = checkLocationPermission();
            dispatch(setInternetStatus(isConnected));
        };
        if(!geoPermission && !connection){
            checkPermissions();
        }
    }, [geoPermission, connection]);

    useEffect(() => {
        if (connection && geoPermission && forecast == null) {
            loadForecast();
        }
    }, [forecast]);


    // Internet connection check
    const checkInternetConnection = async () => {
        console.log('called func checkinternet')
      try {
        const state = await NetInfo.fetch();
        dispatch(setInternetStatus(state.isConnected));
        console.log('internet connection == ' + state.isConnected);
      } catch (error) {
        console.log('Error while [checking internet connection]: ', error);
      }
    };

    const checkLocationPermission = async () => {
        console.log('called func check check location permission');
        const hasLocationPermission = await getLocationPermission();
        if (hasLocationPermission) {
            dispatch(setGeolocationPermission(true));
            console.log('location permission == ' + geoPermission);
            return true;
        } else {
            dispatch(setGeolocationPermission(false));
            console.log('Location permission denied');
            return false;
        }
    };

    const getLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocationStatus(false);
            console.log('location status not granted');
            return false;
        } else {
            setLocationStatus(true);
            console.log('location status granted');
            try {
                let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
                dispatch(setGeoData(location));
                console.log('LOCATION');
                console.log(location);
                return true;
            } catch (error) {
                console.log('Error fetching location:', error);
                return false;
            }
        }
    };

    const loadForecast = async () => {
        console.log('called func load forecast');
        setRefreshing(true);
        try{
            if (geoData && geoData.coords) {
                console.log('geodata ||');
                console.log(geoData);
                const response = await fetch(
                    `${url}&lat=${geoData.coords.latitude}&lon=${geoData.coords.longitude}`
                );
                const data = await response.json();

                if (!response.ok) {
                    Alert.alert('Fetch error', 'Something went wrong while fetching weather data');
                } else {
                    dispatch(setForecastData(data));
                    console.log('DATA |||');
                    console.log(data);
                }
            }
        } catch (error) {
            console.log('Error fetching weather data:', error);
        } finally {
            setRefreshing(false);
        }
    };

    if (!connection) {
        console.log('call no connection permission screen | no internet');
        return (
            <View style={styles.permission_body}>
                <Image source={connectionImg} style={styles.permision_image} />
                <View style={styles.permission_info}>
                    <Text style={styles.permission_text}>No Internet Connection</Text>
                    <Image source={infoImg} style={styles.permision_info_img} />
                </View>
                <TouchableOpacity onPress={() => checkInternetConnection()} style = {styles.permision_button}>
                    <Text style= {styles.permission_btn_text}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!geoPermission) {
        console.log('call no location permission screen | permission denied');
        return (
            <View style={styles.permission_body}>
                <Image source={require('../../assets/icons/location.png')} alt="humidity" style={styles.permision_image}/>
                <View style = {styles.permission_info}>
                    <Text style={styles.permission_text}>
                        This app requires location permission.
                    </Text>
                    <Image source={require('../../assets/icons/info.png')} alt="humidity" style={styles.permision_info_img}/>
                </View>
                <TouchableOpacity onPress={getLocationPermission} style = {styles.permision_button}>
                    <Text style= {styles.permission_btn_text}>Request Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!forecast || !geoPermission || !connection) {
        console.log('call app loader because loading DATA');
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

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
                    {geoData &&
                        <Locator latitude={geoData.coords.latitude} longitude={geoData.coords.longitude}
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
        height: screenw * 0.35,
        backgroundColor: COLOR.halfwhited,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        padding: screenw * 0.02,
        borderRadius: 5,
    },

    permision_info_img: {
        width: screenw * 0.22,
        height: screenw * 0.22,
        marginRight: screenw * 0.02
    },

    permission_text: {
        width: '45%',
        height: '95%',
        fontSize: 22,
        fontWeight: '400',
        color: COLOR.black,
        borderLeftColor: COLOR.black,
        borderLeftWidth: 5,
        paddingLeft: 15
    },

    permision_button: {
        width: screenw * 0.53, 
        height: screenw * 0.15,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderBottomColor: COLOR.black,
        borderBottomWidth: 5,
        borderStyle: 'dotted',
    },
    
    permission_btn_text: {
        color: COLOR.black,
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
      },
});

export default Weather;