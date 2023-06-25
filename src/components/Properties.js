import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const Proreties = (props) => {
    const visibility = (props.visbl / 1000);
    return(
        <View style={styles.main}>
            <View style={styles.block}>
                <Image source={require('../../assets/icons/wind.png')} alt="wind" style={styles.image}/>
                <Text style={styles.text}>{Math.round(props.wind)} km/h</Text>
                <Text style={styles.subtext}>wind</Text>
            </View>
            <View style={styles.block}>
                <Image source={require('../../assets/icons/humidity.png')} alt="humidity" style={styles.image}/>
                <Text style={styles.text}>{props.humm}%</Text>
                <Text style={styles.subtext}>humidity</Text>
            </View>
            <View style={styles.block}>
                <Image source={require('../../assets/icons/visibility.png')} alt="visibility" style={styles.image}/>
                <Text style={styles.text}>{visibility.toFixed(1)} km</Text>
                <Text style={styles.subtext}>visibility</Text>
            </View>
        </View>
    )
}

export default Proreties;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'flex-start',
        backgroundColor: '#000',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 20,
        paddingTop: 20,
        marginTop: 15,
        marginBottom: 20,
        borderRadius: 25 / 2
    },

    wind: {
        width: '33%',
        height: 130,
        justifyContent: 'center',
        alignContent: 'center',
    },

    image: {
        width: 40,
        height: 40,
        alignSelf: "center",
        tintColor: '#FFE142',
        marginBottom: 5
        
    },

    text: {
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center',
        paddingTop: 4,
        color: '#FFE142'
    },

    subtext: {
        fontSize: 12,
        textAlign: 'center',
        color: '#FFE142'
    }
});