import React from "react";
import { Text } from "react-native";

const DateTime = () => {
    let currentdate = new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["january","February","March","Aplir","May","June","July", "August", "September", "October", "November", "December"];
    var datetime = `${weekday[currentdate.getDay()]}, ${currentdate.getUTCDate()} ${months[currentdate.getMonth()]}`;
    
    return(
        <Text>
            {datetime}
        </Text>
    )
}

export default DateTime;