import React from "react";
import { View, Text, Alert, StyleSheet } from 'react-native';

const Forecast = (props) => {   
   return(
    <View>
        <Text>{props.descr}</Text>
        <Text>{Math.round(props.temp)} °</Text>
        <Text>{props.hum}</Text>
    </View>
   )
}

export default Forecast;