import React from 'react'
import { SafeAreaView, Text, View, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { logo } from '../../assets/images'
import Menu from 'react-native-vector-icons/MaterialIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { _webservies } from '../../Services';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ChangePassword extends React.Component {
    constructor() {
        super();
        this.state = {
          password: '',
          npassword: '',
          cpassword: '',
         
        }
      }

      user_data = async () => {
        await AsyncStorage.getItem('userData')
          .then(data => {
            let { access_token, user_login_id } = JSON.parse(data) || '';
            console.log('userData >>>>>>>>>>>>>>>>>>>',JSON.parse(data));
            this._onchangepass(user_login_id, access_token)
          })
      }

      _onchangepass = async (user_system_id, access_token) => {
        //this.props.navigation.navigate('logged')
        console.log('user_system_id >>>>>>>>>>>>>>>>>>>',user_system_id);
        console.log('access_token >>>>>>>>>>>>>>>>>>>',access_token);
        
        try {
          const { password, npassword } = this.state
          let response = await _webservies._get_update_password( user_system_id, password, npassword, access_token )
          let responseJson = await response.json()
          let dt = JSON.stringify(responseJson)
          console.log('_onchangepass >>>>>>>>>>>>>>>>>>>',dt);
          if (responseJson.IsSuccess === true) {
            //await AsyncStorage.setItem('userData', JSON.stringify(responseJson.ResponseData))
            //this.props.navigation.navigate('logged')
          } else {
            //this.setState({ show: true })
          }
        } catch (err) {
          console.log(err)
        }
        
      }

      componentDidMount() {
        this.user_data()
      }

      render() {
    return (
        <SafeAreaView style={style.contianer}>
            <KeyboardAwareScrollView>
                <Image source={logo} style={style.logo} resizeMode={'contain'} />
                <Text style={style.contact_us_text}>Change Password</Text>
                <View style={{ flex: 1 }}>
                    <View style={style.textfieldWrapper}>
                        <Text style={style.textfieldtitle}>Old Password</Text>
                        <TextInput
                            onChangeText={(text) => { this.setState({ password: text }) }}
                            style={{ color: '#ffffff', fontFamily: "Jura-Bold", }}
                            secureTextEntry
                        />
                        <TouchableOpacity style={{ position: 'absolute', right: 10, top: Platform.OS === 'ios' ? 15 : 15 }} onPress={() => this.handleToggle('pass')}>
                            <Menu name='visibility' size={25} color={'#f57f17'} />
                        </TouchableOpacity>
                    </View>
                    <View style={style.textfieldWrapper}>
                        <Text style={style.textfieldtitle}>New Password</Text>
                        <TextInput
                            onChangeText={(text) => { this.setState({ npassword: text }) }}
                            style={{ color: '#ffffff', fontFamily: "Jura-Bold", }}
                            secureTextEntry
                        />
                        <TouchableOpacity style={{ position: 'absolute', right: 10, top: Platform.OS === 'ios' ? 15 : 15 }} onPress={() => this.handleToggle('pass')}>
                            <Menu name='visibility' size={25} color={'#f57f17'} />
                        </TouchableOpacity>
                    </View>
                    <View style={style.textfieldWrapper}>
                        <Text style={style.textfieldtitle}>Confirm Password</Text>
                        <TextInput
                            onChangeText={(text) => { this.setState({ cpassword: text }) }}
                            style={{ color: '#ffffff', fontFamily: "Jura-Bold", }}
                            secureTextEntry
                        />
                        <TouchableOpacity style={{ position: 'absolute', right: 10, top: Platform.OS === 'ios' ? 15 : 15 }} onPress={() => this.handleToggle('pass')}>
                            <Menu name='visibility' size={25} color={'#f57f17'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>


            <TouchableOpacity style={style.button_prop} onPress={() => this.user_data()} >
                <Text style={{ fontFamily: 'Jura-Bold', color: '#fff', fontSize: 20 }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.button_prop} onPress={() => this.props.navigation.goBack()} >
                <Text style={{ fontFamily: 'Jura-Bold', color: '#fff', fontSize: 20 }}>Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
       
    )
      }
}

const win = Dimensions.get('window')
const style = StyleSheet.create({
    contianer: {
        flex: 1,
        backgroundColor: '#23222a',
        padding: 10
    },
    logo: {
        //height: 200,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    contact_us_text: {
        fontFamily: 'Jura-Bold',
        fontSize: 25,
        color: '#f58020',
        alignSelf: 'center'
    },
    textfieldWrapper: {
        backgroundColor: '#32303b',
        paddingLeft: 20,
        paddingTop: 10,
        borderRadius: 10,
        height: 60,
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10
    },
    textfieldtitle: {
        color: '#f58020',
        marginBottom: Platform.OS === 'ios' ? 0 : -10,
        fontFamily: "Jura-Bold",
        fontSize: 12
    },
    button_prop: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
        backgroundColor: '#f2831d',
        width: win.width * 0.92,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    }

})
export default ChangePassword