const SET_GEOLOCATION = "SET_GEOLOCATION";
const SET_INTERNET_STATUS = "SET_INTERNET_STATUS";

const initialState = {
    geoPermission: false,
    internetAvailability: true,
}

export default function utilsReducer(state = initialState, action) {
    switch (action.type){
        case SET_GEOLOCATION:
            return {...state, geoPermission: action.payload}
        case SET_INTERNET_STATUS:
            return {...state, internetAvailability: action.payload}
        default:
            return state;
    }
}

export const setGeolocationPermission = (value) => ({
    type: SET_GEOLOCATION,
    payload: value
})

export const setInternetStatus = (value) => ({
    type: SET_INTERNET_STATUS,
    payload: value
})
