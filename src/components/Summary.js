import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Summary = (props) => {
    const likeSign = (props.like > 0 ? '+' : '');
    const realSign = (props.temp > 0 ? '+' : '');
    return(
        <View style={styles.main}>
            <Text style={styles.title}>Daily Summary</Text>
            <Text style={styles.content}>
                Now it feels like {likeSign} {props.like} {'\n'}
                Actual temperature is {realSign} {props.temp}
            </Text>
        </View>
    )
}

export default Summary;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'flex-start'
    },

    title: {
        fontWeight: '700',
        fontSize: 18,
        textAlign: 'left',
        letterSpacing: 1
    },

    content: {
        fontWeight: '500',
        fontSize: 13,
        textAlign: 'left',
        paddingTop: 4,
        marginBottom: 0,
    }
});