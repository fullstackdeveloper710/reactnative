import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Modal, Image, TextInput, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { RadioButton } from 'react-native-paper';
import { avtar } from '../../assets/images';
// import { TouchableOpacity } from 'react-native-gesture-handler'
// import Modal from '../../Components/Alert'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { _webservies } from '../../Services';

export const Profile = (props) => {
    const [show, setShow] = useState(false)
    const [service, setService] = useState('AbuDhabi')
    const [user, setUser] = useState([])
    const [img, setImg] = useState(avtar)
    const [localData, setLocalData] = useState({} || '')
    const [firstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')

    const ImagePicker = async () => {
        const option = {
            // mediaType: 'photo',
            // for camera
            storageOption: {
                path: 'image',
                mediaType: 'Photo'
            },
            includeBase64: true
        }
        const result = await launchCamera(option);
        console.log(result.assets[0].uri)
        setImg(result.assets[0].uri)
        if (result.assets) {
            UpdateProfilePic(result.assets)
        }
        // if (result.didCancel === true) {
        //     UpdateProfilePic(result.assets)
        // }
    }

    const UpdateProfilePic = async (img_1) => {
        const data = {
            "img_data": img_1[0].base64,
            "user_sys_id": localData.user_login_id,
        }
        try {
            let response = await _webservies._update_profile_picture(data, localData.access_token)
            let responseJson = await response.json()
            console.log(responseJson)
            if (responseJson.IsSuccess === true) {
                alert('profile picture updated successfully')
                setImg(_webservies.pro_pic(localData.user_login_id))
                // profile_info(localData.user_login_id, localData.access_token)
            }
            //  else {

            // }
        }
        catch (err) {
            console.log(err)
        }
    }

    const UpdateDoc = async () => {
        const data = {
            "strUId": localData.user_login_id,
            "strFName": firstName,
            "strLName": LastName,
            "strMobNo": mobile,
            "strEmail": email
        }
        try {
            let response = await _webservies._update_profile(data, localData.access_token)
            let responseJson = await response.json()
            if (responseJson.IsSuccess === true) {
                alert('profile updated successfully')
                profile_info(localData.user_login_id, localData.access_token)
            } else {
                _webservies.Logout(props)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const profile_info = async (user_system_id, access_token) => {
        try {
            let response = await _webservies._get_profile_info(user_system_id, access_token)
            let responseJson = await response.json()
            if (responseJson.IsSuccess === true) {
                console.log(responseJson?.ResponseData)
                let { CU_FIRST_NAME, CU_LAST_NAME, CU_MOB_NO, CU_LOGIN_ID, CU_EMAIL_ID } = responseJson?.ResponseData
                // setUser(responseJson.ResponseData)
                setFirstName(CU_FIRST_NAME)
                setLastName(CU_LAST_NAME)
                setMobile(CU_MOB_NO)
                setEmail(CU_EMAIL_ID)
            } else {
                // _webservies.Logout(props)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(async () => {
        await AsyncStorage.getItem('userData')
            .then(data => {
                let { access_token, user_login_id } = JSON.parse(data) || '';
                setLocalData({ access_token, user_login_id })
                profile_info(user_login_id, access_token)
                setImg(_webservies.pro_pic(user_login_id))
            })
    },
    props.navigation.addListener('focus', () => {
        //UpdateDoc();
    }), []);

    return (
        <SafeAreaView>
            <KeyboardAwareScrollView bounces={false}>
                <ScrollView bounces={false}>
                    <View style={style.contanier}>
                        {console.log(img)}
                        <Image source={{ uri: `${img}` }} style={{ borderRadius: 100, height: 200, width: 200, alignSelf: 'center', marginTop: 20 }} resizeMode={'cover'} />
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                            <TouchableOpacity style={style.loginScreenButton} onPress={ImagePicker}>
                                <Text style={style.loginText}>Change Picture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.loginScreenButton} onPress={() => props.navigation.navigate('ChangePassword')}>
                                <Text style={style.loginText}>Change Password</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={style.textfieldWrapper}>
                            <Text style={style.textfieldtitle}>First Name</Text>
                            <TextInput
                                onChangeText={(text) => setFirstName(text)}
                                style={{ color: '#ffffff', fontFamily: "Jura-Bold", }}
                                value={firstName}
                            />
                        </View>
                        <View style={style.textfieldWrapper}>
                            <Text style={style.textfieldtitle}>Last Name</Text>
                            <TextInput
                                onChangeText={(text) => setLastName(text)}
                                style={{ color: '#ffffff', fontFamily: "Jura-Bold", }}
                                value={LastName}
                            />
                        </View>
                        <View style={style.textfieldWrapper}>
                            <Text style={style.textfieldtitle}>Mobile number</Text>
                            <TextInput
                                onChangeText={(text) => setMobile(text)}
                                style={{ color: '#ffffff', fontFamily: "Jura-Bold", }}
                                value={mobile}
                            />
                        </View>
                        <View style={style.textfieldWrapper}>
                            <Text style={style.textfieldtitle}>Email</Text>
                            <TextInput
                                onChangeText={(text) => setEmail(text)}
                                style={{ color: '#ffffff', fontFamily: "Jura-Bold", }}
                                value={email}
                            />
                        </View>
                        <View style={style.doc}>
                            <TouchableOpacity style={style.loginScreenButton2} onPress={() => props.navigation.goBack()}>
                                <Text style={style.loginText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.loginScreenButton2} onPress={() => UpdateDoc()}>
                                <Text style={style.loginText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>

            <Modal
                transparent={true}
                visible={show}
            >
                <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', flex: 1 }}>
                    <View style={{ backgroundColor: '#23222a', marginTop: 150, marginLeft: 40, marginRight: 40 }}>
                        <Text style={{ color: '#ffffff', margin: 20, fontFamily: 'Jura-Bold' }}>Delivery City</Text>
                        <View
                            style={{
                                borderBottomColor: '#ffffff',
                                borderBottomWidth: 2,
                            }}
                        />
                        <View style={style.ServiceRadiowrapper}>
                            <RadioButton
                                value="AbuDhabi"
                                status={service === 'AbuDhabi' ? 'checked' : 'unchecked'}
                                onPress={() => { setService('AbuDhabi') }}
                                color='#f2831d'
                                uncheckedColor='#ffffff'
                            />
                            <View style={style.Serviceradiotitlecontainer}>
                                <Text style={style.Serviceradiofieldtitle}>Insurance Company</Text>
                            </View>
                        </View>

                        <View style={style.ServiceRadiowrapper}>
                            <RadioButton
                                value="Alain"
                                status={service === 'Alain' ? 'checked' : 'unchecked'}
                                onPress={() => { setService('Alain') }}
                                color='#f2831d'
                                uncheckedColor='#ffffff'
                            />
                            <View style={style.Serviceradiotitlecontainer}>
                                <Text style={style.Serviceradiofieldtitle}>Bank</Text>
                            </View>
                        </View>

                        <View style={style.ServiceRadiowrapper}>
                            <RadioButton
                                value="Western Region"
                                status={service === 'Western Region' ? 'checked' : 'unchecked'}
                                onPress={() => { setService('Western Region') }}
                                color='#f2831d'
                                uncheckedColor='#ffffff'
                            />
                            <View style={style.Serviceradiotitlecontainer}>
                                <Text style={style.Serviceradiofieldtitle}>Others</Text>
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#f2831d', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: 50 }}>
                            <TouchableOpacity onPressIn={(e) => { setShow(false) }} onPress={() => { alert('working'); setShow(false) }} style={{ backgroundColor: '#f2831d' }} >
                                <Text style={{ color: '#ffffff', marginRight: 20, fontSize: 18 }}>CANCEL</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setShow(false)} style={{ backgroundColor: '#f2831d' }} >
                                <Text style={{ color: '#ffffff', marginRight: 20, fontSize: 18 }}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>

    )
}

const win = Dimensions.get('window')
const style = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#23222a',
        height: win.height,
    },
    ButtonProp: {
        backgroundColor: '#23222a',

    },
    doc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 0,
        marginTop: 20,
    },
    loginScreenButton: {
        backgroundColor: '#f2831d',
        width: '49%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10
    },
    loginScreenButton2: {
        backgroundColor: '#f2831d',
        width: '49%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10
    },
    loginText: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: "Jura-Bold",
    },
    head: {
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Jura-Bold',
        color: '#f2831d',
        letterSpacing: 1.5,
        paddingTop: 20,
        paddingLeft: 10
    },
    desc: {
        color: '#bdbdbd',
        fontSize: 15,
        paddingTop: 8,
        paddingLeft: 20,
        fontFamily: 'Jura-Bold',
        letterSpacing: 1.2
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
    radiofieldtitle: {
        color: '#f58020',
        marginBottom: 0
    },
    textfieldtitle: {
        color: '#f58020',
        marginBottom: Platform.OS === 'ios' ? 0 : -10,
        fontFamily: "Jura-Bold",
        fontSize: 12
    },
    RadioButtonwrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: '#32303b',
        paddingLeft: 20,
        paddingRight: 50,
        paddingTop: 10,
        borderRadius: 10,
        height: 100,
    },
    radiotitlecontainer: {
        marginLeft: 20
    },
    radiofieldtitle: {
        color: '#f58020',
        marginBottom: 0
    },
    ServiceRadiowrapper: {
        flexDirection: 'row',
        padding: 10,
    },
    Serviceradiofieldtitle: {
        color: '#ffffff',
        marginTop: 5,
        marginLeft: 20,
        fontSize: 18
    }
})
export default Profile;