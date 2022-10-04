import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { splash2 } from '../../assets/images/index';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Splash extends React.Component {
  componentDidMount = async () => {
    await AsyncStorage.getItem('userData').then(data => {
      let { access_token } = JSON.parse(data) || ''
      if (access_token) {
        setTimeout(() => {
          this.props.navigation.dispatch(StackActions.replace('logged'));
        }, 3000);
      } else {
        setTimeout(() => {
          this.props.navigation.dispatch(StackActions.replace('Login'));
        }, 3000);
      }
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={splash2} resizeMode="cover" style={styles.backgrou}>
        </ImageBackground>
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: win.height,
    backgroundColor: 'orange',
  },
  backgrou: {
    height: win.height,
    padding: 20,
    paddingTop: 350,
  },
});

export default Splash;