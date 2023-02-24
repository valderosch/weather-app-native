import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const Proreties = (props) => {
    const visibility = (props.visbl / 1000);
    return(
        <View>
            <View>
                <Image alt="wind"/>
                <Text>{Math.round(props.wind)}km/h</Text>
            </View>
            <View>
                <Image alt="humidity"/>
                <Text>{props.humm}%</Text>
            </View>
            <View>
                <Image alt="visibility"/>
                <Text>{visibility.toFixed(1)}km</Text>
            </View>
        </View>
    )
}


export default Proreties;