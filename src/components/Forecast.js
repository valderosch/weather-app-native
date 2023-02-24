import React from "react";
import { View, Text, Alert, StyleSheet } from 'react-native';

const Forecast = (props) => {   
   return(
    <View style ={styles.main}>
        <Text style = {styles.description}>{props.descr}</Text>
        <Text style = {styles.temperature}>{Math.round(props.temp)}°</Text>
    </View>
   )
}

export default Forecast;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
    },

    description: {
        alignItems: 'flex-start',
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5
    },

    temperature: {
        fontWeight: '500',
        fontSize: 155,
        textAlign: 'center',
        padding: 0,
        marginBottom: 0,
    }
});