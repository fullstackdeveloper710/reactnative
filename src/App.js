import React from 'react';
import Route from './Route'
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {

  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
}
