import React from "react";
import { Text, View, Image, FlatList, StyleSheet, Dimensions } from "react-native";
import { COLOR } from "../../constants";

const Hourly = (props) => {
    return(
        <FlatList style  ={styles.main}
            horizontal data={props.hour.slice(0,24)}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={(hourl) => {
                try{
                    const weather = hourl.item.weather[0];
                    const dt = new Date(hourl.item.dt * 1000);
                    console.log("icon", weather.icon);
                    return(
                        <View style={styles.item}>
                            <View style={styles.inner}>
                                <Image style={styles.image} source={{ uri: `../../assets/weather/${weather.icon}.png` }}/>
                                <Text style={styles.temperature}>
                                    {Math.round(hourl.item.temp)} °
                                </Text>
                            </View>
                            <Text style={styles.time}>
                                {dt.toLocaleTimeString([], {timeStyle: 'short'}).slice(0,5)}
                            </Text>
                            <Text style={styles.description}>{weather.description}</Text>
                        </View>
                    ) 
                } catch (error){
                    console.warn(`Error to load immage: ${weather.icon}`, error)
                }
            }}
        />
    )
}

export default Hourly;

const screenw = Dimensions.get('screen').width;
const screenh = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginLeft: 40,
        marginRight: 40,
        alignContent: 'space-around',
        height: screenw * 0.25,
    },

    item: {
        marginRight: screenw * 0.02,
        width: screenw * 0.25,
        height: screenw * 0.22,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        border: 1,
        borderRadius: 20 / 2,
        borderWidth: 3,
        borderColor: COLOR.halfblacked,
    },

    inner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    image: {
        width: screenw * 0.08,
        height: screenw * 0.08,
        opacity: 0.5,
        marginLeft: 8,
        marginTop: 6,
    },

    time:{
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '600',
        color: COLOR.black
    },

    description: {
        flex: 2,
        alignItems: 'flex-start',
        fontWeight: '500',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 1,
        flexWrap: 'nowrap',
        overflow: 'hidden',
        color: COLOR.black
    },

    temperature: {
        fontWeight: '600',
        fontSize: 23,
        textAlign: 'right',
        paddingRight: 10,
        color: COLOR.black
    }
});