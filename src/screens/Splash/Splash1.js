import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { splash1 } from '../../assets/images/index';
import { StackActions } from '@react-navigation/native';


class Splash extends React.Component {  
  componentDidMount = () => {
    setTimeout(() => {
          this.props.navigation.dispatch(StackActions.replace('Splash2'));
    }, 3000);
  };

  render()
    {
      return (
        <View style={styles.container}>
            <ImageBackground source={splash1} resizeMode="cover" style={styles.backgrou}>

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