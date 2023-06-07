import React from "react";
import { Text, View, Image, FlatList, StyleSheet } from "react-native";

const Hourly = (props) => {
   
    return(
        <FlatList style  ={styles.main}
            horizontal data={props.hour.slice(0,24)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(hourl) => {
                try{
                    const weather = hourl.item.weather[0];
                    const dt = new Date(hourl.item.dt * 1000);
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

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginLeft: 40,
        marginRight: 40,
        alignContent: 'space-around',
        height: 80,
    },

    item: {
        marginRight: 15,
        width: 100,
        height: 80,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        border: 1,
        borderRadius: 20 / 2,
        borderWidth: 3,
        borderColor: '#000'

    },

    inner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    image: {
        width: 25,
        height: 25,
        opacity: 0.5,
        marginLeft: 8,
        marginTop: 6
    },

    time:{
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '600',
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
        
    },

    temperature: {
        fontWeight: '600',
        fontSize: 23,
        textAlign: 'right',
        paddingRight: 10
    }
});