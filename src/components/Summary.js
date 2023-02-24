import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Summary = (props) => {
    const likeSign = (props.like > 0 ? '+' : '');
    const realSign = (props.temp > 0 ? '+' : '');
    return(
        <View>
            <Text>Daily Summary</Text>
            <Text>
                Now it feels like {likeSign} {props.like} {'\n'}
                Actual temperature is {realSign} {props.temp}
            </Text>
        </View>
    )
}

export default Summary;