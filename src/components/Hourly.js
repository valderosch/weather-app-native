import React from "react";
import { Text, View, Image, FlatList, StyleSheet } from "react-native";

const Hourly = (props) => {
    return(
        <FlatList 
            horizontal data={props.hour.slice(0,24)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(hourl) => {
                const weather = hourl.item.weather[0];
                const dt = new Date(hourl.item.dt * 1000);
                return(
                    <View>
                        <Text>
                            {dt.toLocaleTimeString().replace(/:\d+ /, ' ')}
                        </Text>
                        <Image source={{uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`}}/>
                        <Text>
                            {Math.round(hourl.item.temp)} °
                        </Text>
                        <Text>{weather.description}</Text>
                    </View>
                ) 
            }}
        />
    )
}

export default Hourly;