const SET_FORECAST = "SET_FORECAST";


const initialState = {
    forecast: null,
}

export default function utilsReducer(state = initialState, action) {
    switch (action.type){
        case SET_FORECAST:
            return {...state, forecast: action.payload}
        default:
            return state;
    }
}

export const setForecastData = (data) => ({
    type: SET_FORECAST,
    payload: data
})

