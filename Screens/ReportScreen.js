// Screens/HomeScreen.js

import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ReportScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Your main content goes here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
    // Your content styles here
  },
});
