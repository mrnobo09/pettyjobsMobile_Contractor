import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Store from './State/Store.js';
import HomeScreen from './Screens/HomeScreen';
import Login from './Screens/auth/Login.js';
import JobScreen from './Screens/JobScreen.js';
import HistoryScreen from './Screens/HistoryScreen.js';
import ReportScreen from './Screens/ReportScreen.js';
import BottomNavBar from './Components/BottomNavbar';
import ViewJobScreen from './Screens/job/ViewJobScreen';
import {name as appName} from './app.json'
import RatingScreen from './Screens/job/RatingScreen.js';

const Stack = createStackNavigator();
const RootStack = createStackNavigator(); 

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        gestureEnabled: false,
        //...getCustomAnimation(route, navigation),
      })}
      initialRouteName='History'
    >
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerLeft: null }} name="Home" component={HomeScreen} />
      <Stack.Screen options={{ headerLeft: null }} name="Job" component={JobScreen} />
      <Stack.Screen options={{ headerLeft: null }} name="History" component={HistoryScreen} />
      <Stack.Screen options={{ headerLeft: null }} name="Report" component={ReportScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName='MainStack'>
          <RootStack.Screen options={{ headerShown: false }} name="MainStack" component={MainStackWithBottomNav} />
          <RootStack.Screen options={{ headerShown: true }} name="View Job" component={ViewJobScreen} />
          <RootStack.Screen options={{headerShown:true}} name="Rating" component={RatingScreen}/>
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function MainStackWithBottomNav() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MainStack />
      </View>
      <BottomNavBar />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
});

export default App;
