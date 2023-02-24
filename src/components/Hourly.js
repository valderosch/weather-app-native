import React from "react";
import { Text, View, Image, FlatList, StyleSheet } from "react-native";

const Hourly = (props) => {
   
    return(
        <FlatList style  ={styles.main}
            horizontal data={props.hour.slice(0,24)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(hourl) => {
                const weather = hourl.item.weather[0];
                const dt = new Date(hourl.item.dt * 1000);
                const path = `../../assets/weather/${weather.icon}.png`
                console.warn(path)
                
                return(
                    <View style={styles.item}>
                        <View style={styles.inner}>
                            <Image style={styles.image} source={require(`../../assets/weather/10n.png`)}/>
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
        alignItems: 'flex-start',
        fontWeight: '500',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 1
    },

    temperature: {
        fontWeight: '600',
        fontSize: 23,
        textAlign: 'right',
        paddingRight: 10
    }
});