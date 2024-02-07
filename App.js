import React from 'react';
import { StyleSheet, View } from 'react-native';
import Weather from './src/components';
import {Provider} from "react-redux";
import {store} from "./src/reducers";

export default function App() {
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
