import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Modal, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,  Platform, Button } from 'react-native';
import { background, img34, splash2, login_logo } from '../../assets/images/index';
import Menu from 'react-native-vector-icons/MaterialIcons'
import Circle from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _webservies } from '../../Services';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      isActive: true,
      show: false,
      u_id: false,
      pass: false,
      v_icon: true
    }
  }

  handleToggle = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  submit = () => {
    const token = true
    const { name, password, u_id, pass } = this.state
    if (!name) {
      this.setState({ u_id: true })
    }
    else if (!password) {
      this.setState({ pass: true, v_icon: false })
    }
    else {
      this.setState({ pass: false, u_id: false, v_icon: true })
      this._onLogin()
    }
  }

  _onLogin = async () => {
    //this.props.navigation.navigate('logged')
    try {
      const { name, password } = this.state
      let response = await _webservies._user_login(name, password)
      let responseJson = await response.json()

      if (responseJson.IsSuccess === true) {
        await AsyncStorage.setItem('userData', JSON.stringify(responseJson.ResponseData))
        this.props.navigation.navigate('logged')
      } else {
        this.setState({ show: true })
      }
    } catch (err) {
      console.log(err)
    }

  }

  render() {
    const { isActive, show, u_id, pass, v_icon } = this.state;
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.image}
    >
      <ImageBackground source={splash2} resizeMode="cover" style={{width: '100%', height: '100%'}}>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
          <View style={{
                  flexDirection: 'row', 
                  justifyContent: 'center',
                  marginBottom: 200
                  }}>
                <Image
                  source={login_logo}
                />
              </View>

              <View style={styles.headerWrapper}>
                <TextInput
                  placeholder='Enter your username'
                  placeholderTextColor="#ffffff"
                  onChangeText={(text) => { this.setState({ name: text }) }}
                  style={{ color: '#ffffff', fontFamily: "Jura-Bold", paddingBottom: Platform.OS === 'ios' ? 10 : 0 }}
                />
                {u_id && <TouchableOpacity style={{ position: 'absolute', right: 0, top: Platform.OS === 'ios' ? -5 : 15 }} onPress={() => this.handleToggle()}>
                  <Circle name='minuscircle' size={20} color={'#f44336'} />
                </TouchableOpacity>}
              </View>

              <View style={styles.headerWrapper}>
                <TextInput
                  placeholder='Enter your password'
                  placeholderTextColor="#ffffff"
                  secureTextEntry={isActive}
                  onChangeText={(text) => { this.setState({ password: text }) }}
                  style={{ color: '#ffffff', fontFamily: "Jura-Bold", paddingBottom: Platform.OS === 'ios' ? 10 : 5 }}
                />

                <TouchableOpacity style={{ position: 'absolute', right: v_icon ? 0 : 30, top: Platform.OS === 'ios' ? -5 : 15 }} onPress={() => this.handleToggle()}>
                  <Menu name='visibility' size={25} color={'#f57f17'} />
                </TouchableOpacity>

                {pass && <TouchableOpacity style={{ position: 'absolute', right: 0, top: Platform.OS === 'ios' ? -5 : 15 }} onPress={() => this.handleToggle()}>
                  <Circle name='minuscircle' size={20} color={'#f44336'} />
                </TouchableOpacity>}
              </View>

              <TouchableOpacity style={{/* marginBottom: 20 */}} onPress={() => this.props.navigation.navigate('Forgot')}>
                <Text style={{ alignSelf: 'flex-end', color: '#ffffff', fontFamily: "Jura-Bold", marginRight: 20 }}>Forgot Password?</Text>
              </TouchableOpacity>

              <View style={styles.Topupinfo}>
                <TouchableOpacity style={styles.loginScreenButton} onPress={() => this.props.navigation.navigate('Signup')}>
                  <Text style={styles.loginText}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginScreenButton} onPress={() => this.submit()}>
                  <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
              </View>

          </View>
        </TouchableWithoutFeedback>
          

      </ImageBackground>
    </KeyboardAvoidingView>
    );
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  },

  backgrou: {
   // flex: 1,
    //justifyContent: "center"
    height: win.height,
  },

  backgrou: {
    height: win.height,
    padding: 20,
    paddingTop: 40,
  },
  headerWrapper: {
    borderBottomColor: '#ffffff',
    borderBottomWidth: 0.7,
    marginBottom: 0,
  },
  loginScreenButton: {
    backgroundColor: '#f2831d',
    width: '49.5%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loginText: {
    color: '#ffffff',
    fontFamily: "Jura-Bold",
    fontSize: 16
  },
  Topupinfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
});

export default HomeScreen;