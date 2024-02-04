import React from 'react';
import SplashScreen from 'react-native-splash-screen'
import { StyleSheet, View } from 'react-native';
import Weather from './src';
import { useEffect } from 'react';
import {createStore} from "redux/src/createStore";
import {Provider} from "react-redux";
import {store} from "./src/reducers";

export default function App() {

  useEffect(()=> {
    SplashScreen.hide();
  }, [])
  return (
    <View style={styles.container}>
      <Provider store={store}>
          <Weather/>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
