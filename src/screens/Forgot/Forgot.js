import React from 'react';
import { View, Text, TextInput,  StyleSheet, Dimensions, TouchableOpacity, Modal, Image } from 'react-native';
import { star, phone,car, logo } from '../../assets/images/index';
import Menu from 'react-native-vector-icons/MaterialIcons'
import Circle from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _webservies } from '../../Services';

var swipeoutBtns = [
    {
      text: 'Button',
      text: 'Button2',
      backgroundColor: '#b6bec0',
      color: '#ffffff'
    }
  ]

class Forgot extends React.Component {  

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        check_email: false,
        modalVisible: false,
        usermodalVisible: false,
        title: '',
    };
  }

  formValidation = async () => {
    const { email } = this.state;
    if (!email) {
      this.setState({ check_email: true })
      this.setState({ title: 'Enter Email Id' })
      this.setState({ usermodalVisible: true })
    } else {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            this.setState({ check_email: true })
            this.setState({ title: 'User Info Not Found' })
            this.setState({ usermodalVisible: true })
            //this.setState({ usermodalVisible: true })
            //alert('Email is Not Correct');
            return false;
          }
          else {
            this.setState({ check_email: false })
            //this.setState({ modalVisible: true })
            //this.props.navigation.navigate('Login')
            this._onForgot()
          }
    }
  }

  finalsubmit = () => {
    this.setState({ modalVisible: false })
    this.props.navigation.navigate('Login')
  }

  _onForgot = async () => {
    await AsyncStorage.getItem('userData')
      .then(data => {
        let { access_token, user_login_id, user_system_id } = JSON.parse(data) || '';
        console.log('userData >>>>>>>>>>>>>>>>>>>',JSON.parse(data));
        this.Forgot_pass(user_system_id, user_login_id, access_token)
      })
  }

  Forgot_pass = async (user_system_id, user_login_id, access_token) => {
      //this.props.navigation.navigate('logged')
      const { email } = this.state

      let response = await _webservies._forgot(email,access_token)
      let responseJson = await response.json()

      console.log(responseJson);

      if (responseJson.IsSuccess === true) {
        /*await AsyncStorage.setItem('userData', JSON.stringify(responseJson.ResponseData))*/
          //this.props.navigation.navigate('Login')
          //alert('success');
          this.setState({ modalVisible: true })
      } else {
          this.setState({ title: responseJson.ErrMsg })
          //this.setState({ usermodalVisible: true })
          this.setState({ check_email: true })
      }
  }

  render()
    {
      const { check_email, modalVisible, usermodalVisible, title } = this.state;
      return (
        <View style={styles.container}>
             <View style={styles.logocontainer}>
                <Image style={styles.tinyLogo} source={logo} />
            </View>

            <Modal
                    transparent={true}
                    visible={usermodalVisible}
                >
                    <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', flex: 1 }}>
                        <View style={{ backgroundColor: '#23222a', marginTop: 150, marginLeft: 50, marginRight: 50 }}>
                          <Text style={{ color: '#ffffff', margin: 20, fontFamily: 'Jura-Bold' }}>Alert !!</Text>
                          <Text style={{ color: '#ffffff', marginLeft: 20, marginBottom: 20, fontFamily: 'Jura-Bold' }}>{title}</Text>
                            
                            <View style={{ backgroundColor: '#f2831d', flexDirection: 'row', justifyContent: 'flex-end', height: 50 }}>
                                <TouchableOpacity style={{ backgroundColor: '#f2831d' }} 
                                onPress={() => this.setState({ usermodalVisible: false })}
                                >
                                    <Text style={{ color: '#ffffff', marginRight: 20, marginTop: 12, fontSize: 18, fontFamily: 'Jura-Bold' }}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
            </Modal>

            <Modal
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', flex: 1 }}>
                        <View style={{ backgroundColor: '#23222a', marginTop: 150, marginLeft: 50, marginRight: 50 }}>
                          <Text style={{ color: '#ffffff', margin: 20, fontFamily: 'Jura-Bold' }}>Alert !!</Text>
                          <Text style={{ color: '#ffffff', marginLeft: 20, fontFamily: 'Jura-Bold' }}>We have sent an email to</Text>
                          <Text style={{ color: '#ffffff', marginLeft: 20, fontFamily: 'Jura-Bold' }}>you. Please follow the</Text>
                          <Text style={{ color: '#ffffff', marginLeft: 20, fontFamily: 'Jura-Bold' }}>instructions in the email to reset</Text>
                            <Text style={{ color: '#ffffff', marginLeft: 20,marginBottom: 20, fontFamily: 'Jura-Bold' }}>your password.</Text>
                            
                            <View style={{ backgroundColor: '#f2831d', flexDirection: 'row', justifyContent: 'flex-end', height: 50 }}>
                                <TouchableOpacity style={{ backgroundColor: '#f2831d' }} 
                                onPress={() => this.finalsubmit()}
                                >
                                    <Text style={{ color: '#ffffff', marginRight: 20, marginTop: 12, fontSize: 18, fontFamily: 'Jura-Bold' }}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
            </Modal>


            <View style={styles.PagetitleContainer}>
                <Text style={styles.Pagetitle}>Forgot Password</Text>
            </View>   
            <Text style={{ color: '#ffffff', marginBottom: 20 }}>Enter your email address and we'll send you a link to reset the password.</Text>
            <View style={styles.textfieldWrapper}>
                <Text style={styles.textfieldtitle}>Email</Text>
                <TextInput 
                onChangeText={(text)=>{this.setState({email:text})}}
                style={{ color: '#ffffff' }}
                />
                {check_email && <TouchableOpacity style={{ position: 'absolute', right: 0, top: Platform.OS === 'ios' ? -5 : 15 }} onPress={() => this.handleToggle()} disabled={true}>
                                <Circle name='minuscircle' size={20} color={'#f44336'} />
                            </TouchableOpacity>}
            </View>
            <View style={styles.Topupinfo}>
                <TouchableOpacity style={styles.loginScreenButton} onPress={() => this.formValidation()}>
                    <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginScreenButton} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Back</Text>
                </TouchableOpacity>
            </View> 


            
        </View>
      );
    }
  }

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: win.height,
    backgroundColor: '#23222a',
    padding: 10
  },
  PagetitleContainer: {
      height: 50,
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 10
  },
  Pagetitle: {
    color: '#f58020',
    textAlign: 'center',
    fontSize: 24,
  },

  logocontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
},
textfieldWrapper: {
    marginBottom: 20,
    backgroundColor: '#32303b',
    paddingLeft: 20,
    paddingTop: 10,
    borderRadius: 10,
    height: 60
},
textfieldtitle: {
    color: '#f58020',
    marginBottom: Platform.OS === 'ios' ? 0 : -10,
},
loginScreenButton: {
    backgroundColor: '#f2831d',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20
  },
  loginText: {
    color: '#ffffff',
    fontSize: 20,
  },
  
});

  export default Forgot;