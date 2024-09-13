import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Change to your preferred icon set

const BottomNavBar = () => {
  const navigation = useNavigation();
  const currentRouteName = useNavigationState((state) => {

    const mainStack = state.routes[state.index]?.state;
    return mainStack?.routes[mainStack.index]?.name; 
    
  });

  const getColor = (routeNameToCheck) => {
    return currentRouteName === routeNameToCheck ? '#002667' : '#b0b0b0';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
      >
        <Icon
          name="home"
          size={24}
          color={getColor('Home')}
        />
        <Text style={[styles.navText, { color: getColor('Home') }]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Job')}
        style={styles.button}
      >
        <Icon
          name="work"
          size={24}
          color={getColor('Job')}
        />
        <Text style={[styles.navText, { color: getColor('Job') }]}>Job</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('History')}
        style={styles.button}
      >
        <Icon
          name="history"
          size={24}
          color={getColor('History')}
        />
        <Text style={[styles.navText, { color: getColor('History') }]}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Report')}
        style={styles.button}
      >
        <Icon
          name="report"
          size={24}
          color={getColor('Report')}
        />
        <Text style={[styles.navText, { color: getColor('Report') }]}>Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomNavBar;
