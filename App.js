import React from 'react';
import SplashScreen from 'react-native-splash-screen'
import { Platform, StyleSheet, View } from 'react-native';
import Weather from './src';
import { useEffect } from 'react';

export default function App() {
  useEffect(()=> {
    SplashScreen.hide();
  }, [])
  return (
    <View style={styles.container}>
      <Weather/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
