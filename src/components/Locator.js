import React from "react";

const Locator = (props) => {
    //Reverse geolocation by longitude & latitude
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + props.myLat + ',' + props.myLon + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
            console.warn('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
})

}

export default Locator;