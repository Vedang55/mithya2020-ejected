import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Navigation from './navigation/Navigation';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import OneSignal from 'react-native-onesignal';

import { ThemeProvider } from "./context/dark";


export default class App extends React.Component {

  constructor(properties) {
    super(properties);
    OneSignal.init("0ec66387-6e4a-4510-ba71-83b1837e23c1", { kOSSettingsKeyAutoPrompt: true });// set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }


  render() {
    enableScreens();
    return (
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar
            barStyle={'light-content'}
            translucent={true}
            backgroundColor={'#3a3225'}
          />
          <Navigation />
        </NavigationContainer>
      </ThemeProvider>
    );
  }
}


