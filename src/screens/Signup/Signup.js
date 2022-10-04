import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Platform } from 'react-native';
import { logo } from '../../assets/images/index';
import { RadioButton, Button } from 'react-native-paper';
import Menu from 'react-native-vector-icons/MaterialIcons'
import Circle from 'react-native-vector-icons/AntDesign'
import { _webservies } from '../../Services';
// import DocumentPicker from 'react-native-document-picker'
/* import RNPickerSelect from 'react-native-picker-select'; */
import { DateTimePicker } from '@react-native-community/datetimepicker';

class Splash extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showHideDemo1: true,
            showHideDemo2: false,
            showHideDemo3: false,
            showHideDemo4: false,
            checked: 'MEMBER',
            service: 'Select',
            guest: false,
            modalshow: false,
            insurance: false,
            bank: false,
            others: false,
            alertBox: false,
            email: '',
            password: '',
            cpassword: '',
            fname: '',
            lname: '',
            mobile: '',
            r_provider: '',
            r_ps_no: '',
            insc_chs_no: '',
            card_chs_no: '',
            othr_chs_no: '',
            r_chs_no: '',
            date: "2016-05-15",
            check_email: false,
            check_pass: false,
            check_cpass: false,
            check_fname: false,
            check_lname: false,
            check_mobile: false,
            check_service: false,
            check_r_ps_no: false,
            check_insc_chs_no: false,
            check_card_chs_no: false,
            modalVisible: false,
            title: 'Email',
            isActive: true,
            isActivec: true,
            Doc: []
        };
    }

    handleToggle = (val) => {
        if (val == 'pass') {
            this.setState({ isActive: !this.state.isActive });
        } else {
            this.setState({ isActivec: !this.state.isActivec });
        }
    };

    formValidation = async (value) => {
        const { title, email, password, cpassword, fname, lname, mobile, service, insc_chs_no, r_ps_no, r_provider, card_chs_no, othr_chs_no } = this.state

        if (value == "showHideDemo1") {
            if (!email) {
                this.setState({ check_email: true })
            } else {
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                if (reg.test(email) === false) {
                    this.setState({ check_email: true })
                    this.setState({ title: 'Please enter a valid email address.' })
                    this.setState({ modalVisible: true })
                    return false;
                }
                else {
                    this.setState({ check_email: false })
                }
            }
            if (!password) {
                this.setState({ check_pass: true })
            } else {
                this.setState({ check_pass: false })
            }
            if (!cpassword) {
                this.setState({ check_cpass: true })
            } else {
                this.setState({ check_cpass: false })
            }

            if (password !== cpassword) {
                this.setState({ check_pass: true })
                this.setState({ check_cpass: true })
                this.setState({ title: 'Passwoad Missmatch' })
                this.setState({ modalVisible: true })
            } else {
                if (email && password && cpassword) {
                    this.setState({ check_pass: false })
                    this.setState({ check_cpass: false })
                    this.hideComponent(value);
                    //break;
                }
            }

            if (!email) {
                this.setState({ title: 'Enter Email' })
                this.setState({ modalVisible: true })
            }
            else if (!password) {
                this.setState({ title: 'Enter Password' })
                this.setState({ modalVisible: true })
            }
            else if (!cpassword) {
                this.setState({ title: 'Enter Confirm Password' })
                this.setState({ modalVisible: true })
            }
        }

        if (value == "showHideDemo3") {
            if (!fname) {
                this.setState({ check_fname: true })
            } else {
                this.setState({ check_fname: false })
            }
            if (!lname) {
                this.setState({ check_lname: true })
            } else {
                this.setState({ check_lname: false })
            }
            if (!mobile) {
                this.setState({ check_mobile: true })
            } else {
                const reg = /^[0]?[789]\d{9}$/;
                if (reg.test(mobile) === false) {
                    this.setState({ check_mobile: true })
                    this.setState({ title: 'Mobile Number should be minimum 10 number' })
                    this.setState({ modalVisible: true })
                    return false;
                } else {
                    this.setState({ check_mobile: false })
                }
            }
            if (fname && lname && mobile) {
                this.hideComponent(value);
                //break;
            }

            if (!fname) {
                this.setState({ title: 'Enter First Name' })
                this.setState({ modalVisible: true })
            }
            else if (!lname) {
                this.setState({ title: 'Enter Last Name' })
                this.setState({ modalVisible: true })
            }
            else if (!mobile) {
                this.setState({ title: 'Enter Mobile Number' })
                this.setState({ modalVisible: true })
            }
        }

        if (value == "finish") {
            if (service == 'Select') {
                this.setState({ check_service: true })
                this.setState({ title: 'Select Service Provider' })
                this.setState({ modalVisible: true })
            }

            if (r_provider == "INSC") {
                if (!r_ps_no) {
                    this.setState({ check_r_ps_no: true })
                } else {
                    this.setState({ check_r_ps_no: false })
                }
                if (!insc_chs_no) {
                    this.setState({ check_insc_chs_no: true })
                } else {
                    this.setState({ check_insc_chs_no: false })
                }
                if (r_ps_no && insc_chs_no) {
                    this.setState({ alertBox: true })
                }

                if (!r_ps_no) {
                    this.setState({ title: 'Select Policy Number' })
                    this.setState({ modalVisible: true })
                }
                else if (!insc_chs_no) {
                    this.setState({ title: 'Enter Chassis Number' })
                    this.setState({ modalVisible: true })
                }
            }

            if (r_provider == "BANK") {
                if (!card_chs_no) {
                    this.setState({ check_card_chs_no: true })
                    this.setState({ title: 'Enter Card Number' })
                    this.setState({ modalVisible: true })
                } else {
                    this.setState({ check_card_chs_no: false })
                    this.setState({ alertBox: true })
                }
            }

            if (r_provider == "OTHR") {
                if (!othr_chs_no) {
                    this.setState({ check_othr_chs_no: true })
                    this.setState({ title: 'Enter Chassis Number' })
                    this.setState({ modalVisible: true })
                } else {
                    this.setState({ check_othr_chs_no: false })
                    this.setState({ alertBox: true })
                }
            }
        }
    }



    hideComponent(name) {
        console.log(name);
        const { email, password, cpassword, check_email, check_pass, check_cpass } = this.state

        switch (name) {

            case "showHideDemo1":
                this.setState({ showHideDemo1: false });
                this.setState({ showHideDemo2: true });
                break;

            case "showHideDemo2":
                this.setState({ showHideDemo2: false });
                this.setState({ showHideDemo3: true });
                break;

            case "showHideDemo3":
                this.setState({ showHideDemo2: false });
                this.setState({ showHideDemo3: true });
                break;

            case "hide3show2":
                this.setState({ showHideDemo3: false });
                this.setState({ showHideDemo2: true });
                break;

            case "hide2show1":
                this.setState({ showHideDemo2: false });
                this.setState({ showHideDemo1: true });
                break;


            case "showHideDemo4":
                this.setState({ showHideDemo3: false });
                this.setState({ showHideDemo4: true });
                break;

            case "hide4show3":
                this.setState({ showHideDemo4: false });
                this.setState({ showHideDemo3: true });
                break;

            default:
                null;
        }
    }

    setChecked(val) {
        console.log(val);

        switch (val) {
            case "MEMBER":
                this.setState({ checked: 'MEMBER' });
                this.setState({ guest: false });
                break;

            case "GUEST":
                this.setState({ checked: 'GUEST' });
                this.setState({ guest: true });
                break;

            default:
                null;
        }
    }

    ServiceProvider(val) {
        console.log(val);
        const { insc_chs_no, card_chs_no, othr_chs_no, check_service } = this.state
        this.setState({ check_service: false })
        switch (val) {
            case "Insurance Company":
                this.setState({ modalshow: false });
                this.setState({ insurance: true });
                this.setState({ bank: false });
                this.setState({ others: false });
                this.setState({ r_provider: "INSC" });
                this.setState({ r_chs_no: insc_chs_no });
                break;

            case "Bank":
                this.setState({ modalshow: false });
                this.setState({ insurance: false });
                this.setState({ bank: true });
                this.setState({ others: false });
                this.setState({ r_provider: "BANK" });
                this.setState({ r_chs_no: card_chs_no });
                break;

            case "Others":
                this.setState({ modalshow: false });
                this.setState({ insurance: false });
                this.setState({ bank: false });
                this.setState({ others: true });
                this.setState({ r_provider: "OTHR" });
                this.setState({ r_chs_no: othr_chs_no });
                break;

            default:
                null;
        }
    }

    submit = () => {
        const { r_provider, insc_chs_no, card_chs_no, othr_chs_no, checked } = this.state

        this.setState({ alertBox: false });

        if (checked == 'MEMBER') {
            if (r_provider == "INSC") {
                this._onSignup(insc_chs_no)
            }
            if (r_provider == "BANK") {
                this._onSignup(card_chs_no)
            }
            if (r_provider == "OTHR") {
                this._onSignup(othr_chs_no)
            }
        } else {
            this._onSignup()
        }

    }

    _onSignup = async (val) => {
        //this.props.navigation.navigate('logged')
        const { email, password, cpassword, fname, lname, mobile, r_provider, r_ps_no, r_chs_no, checked, insc_chs_no, card_chs_no, othr_chs_no } = this.state

        let response = await _webservies._register_user(email, password, cpassword, fname, lname, mobile, r_provider, r_ps_no, val, checked)
        let responseJson = await response.json()

        console.log(responseJson);

        if (responseJson.IsSuccess === true) {
            /*await AsyncStorage.setItem('userData', JSON.stringify(responseJson.ResponseData))*/
            this.props.navigation.navigate('Login')
        } else {
            this.setState({ title: responseJson.ErrMsg })
            this.setState({ modalVisible: true })
        }
    }


    render() {

        const { isActive, isActivec, title, modalVisible, showHideDemo1, showHideDemo2, showHideDemo3, checked, showHideDemo4, service, alertBox, check_cpass, check_pass, check_email, email, check_fname, check_lname, check_mobile, fname, lname, mobile, check_service, check_insc_chs_no, check_r_ps_no, check_card_chs_no, check_othr_chs_no, r_ps_no, card_chs_no, othr_chs_no, insc_chs_no } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.logocontainer}>
                    <Image
                        style={styles.tinyLogo}
                        source={logo}
                    />
                </View>

                <Modal
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', flex: 1 }}>
                        <View style={{ backgroundColor: '#23222a', marginTop: 150, marginLeft: 50, marginRight: 50 }}>
                            <Text style={{ color: '#ffffff', margin: 20, fontFamily: 'Jura-Bold' }}>Alert !!</Text>
                            <Text style={{ color: '#ffffff', margin: 20, fontFamily: 'Jura-Bold' }}>{title}</Text>

                            <View style={{ backgroundColor: '#f2831d', flexDirection: 'row', justifyContent: 'flex-end', height: 50 }}>
                                <TouchableOpacity style={{ backgroundColor: '#f2831d' }}
                                    onPress={() => this.setState({ modalVisible: false })}>
                                    <Text style={{ color: '#ffffff', marginRight: 20, marginTop: 12, fontSize: 18, fontFamily: 'Jura-Bold' }}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={styles.PagetitleContainer}>
                    <Text style={styles.Pagetitle}>Sign Up</Text>
                </View>

                {showHideDemo1 &&
                    <View>
                        <View style={styles.textfieldWrapper}>
                            <Text style={styles.textfieldtitle}>Email</Text>
                            <TextInput
                                onChangeText={(text) => { this.setState({ email: text }) }}
                                /* onChangeText={(text) => this.validate(text)} */
                                style={{ color: '#ffffff', fontFamily: "Jura-Bold", }}
                                value={email}
                            />
                            {check_email && <TouchableOpacity style={{ position: 'absolute', right: 0, top: Platform.OS === 'ios' ? -5 : 15 }} onPress={() => this.handleToggle()} disabled={true}>
                                <Circle name='minuscircle' size={20} color={'#f44336'} />
                            </TouchableOpacity>}
                        </View>
                        <View style={styles.textfieldWrapper}>
                            <Text style={styles.textfieldtitle}>Password</Text>
                            <TextInput
                                secureTextEntry={isActive}
                                onChangeText={(text) => { this.setState({ password: text }) }}
                                style={{ color: '#ffffff', fontFamily: "Jura-Bold", }}

                            />
                            <TouchableOpacity style={{ position: 'absolute', right: 30, top: Platform.OS === 'ios' ? 15 : 15 }} onPress={() => this.handleToggle('pass')}>
                                <Menu name='visibility' size={25} color={'#f57f17'} />
                            </TouchableOpacity>

                            {check_pass && <TouchableOpacity style={{ position: 'absolute', right: 0, top: Platform.OS === 'ios' ? -5 : 17 }} onPress={() => this.handleToggle()} disabled={true}>
                                <Circle name='minuscircle' size={20} color={'#f44336'} />
                            </TouchableOpacity>}

                        </View>

                        <View style={styles.textfieldWrapper}>
                            <Text style={styles.textfieldtitle}>Confirm Password</Text>
                            <TextInput
                                secureTextEntry={isActivec}
                                onChangeText={(text) => { this.setState({ cpassword: text }) }}
                                style={{ color: '#ffffff', fontFamily: "Jura-Bold", }}
                            />
                            <TouchableOpacity style={{ position: 'absolute', right: 30, top: Platform.OS === 'ios' ? 15 : 15 }} onPress={() => this.handleToggle()}>
                                <Menu name='visibility' size={25} color={'#f57f17'} />
                            </TouchableOpacity>

                            {check_cpass && <TouchableOpacity style={{ position: 'absolute', right: 0, top: Platform.OS === 'ios' ? -5 : 17 }} onPress={() => this.handleToggle()} disabled={true}>
                                <Circle name='minuscircle' size={20} color={'#f44336'} />
                            </TouchableOpacity>}
                        </View>
                        {/* <Button style={{ marginBottom: 20 }} mode={'contained'} onPress={() => this.handleDoc()}>Press</Button> */}

                        <TouchableOpacity style={styles.loginScreenButton} onPress={() => this.formValidation("showHideDemo1")}>
                            <Text style={styles.loginText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                }

                {showHideDemo2 &&
                    <View>
                        <View style={styles.textfieldWrapper}>
                            <Text style={styles.textfieldtitle}>First Name</Text>
                            <TextInput
                                onChangeText={(text) => { this.setState({ fname: text }) }}
                                style={{ color: '#ffffff' }}
                                value={fname}
                            />
                            {check_fname && <TouchableOpacity style={{ position: 'absolute', right: 0, top: Platform.OS === 'ios' ? -5 : 15 }} onPress={() => this.handleToggle()} disabled={true}>
                                <Circle name='minuscircle' size={20} color={'#f44336'} />
                            </TouchableOpacity>}
                        </View>
                        <View style={styles.textfieldWrapper}>
                            <Text style={styles.textfieldtitle}>Last Name</Text>
                            <TextInput
                                onChangeText={(text) => { this.setState({ lname: text }) }}
                                style={{ color: '#ffffff' }}
                                value={lname}
                            />
                            {check_lname && <TouchableOpacity style={{ position: 'absolute', right: 0, top: Platform.OS === 'ios' ? -5 : 15 }} onPress={() => this.handleToggle()} disabled={true}>
                                <Circle name='minuscircle' size={20} color={'#f44336'} />
                            </TouchableOpacity>}
                        </View>
                        <View style={styles.textfieldWrapper}>
                            <Text style={styles.textfieldtitle}>Mobile No.</Text>
                            <TextInput
                                onChangeText={(text) => { this.setState({ mobile: text }) }}
                                style={{ color: '#ffffff' }}
                                value={mobile}
                                keyboardType="numeric"
                            />
                            {check_mobile && <TouchableOpacity style={{ position: 'absolute', right: 0, top: Platform.OS === 'ios' ? -5 : 15 }} onPress={() => this.handleToggle()} disabled={true}>
                                <Circle name='minuscircle' size={20} color={'#f44336'} />
                            </TouchableOpacity>}
                        </View>

                        <View style={styles.Topupinfo}>
                            <TouchableOpacity style={styles.loginScreenButton} onPress={() => this.hideComponent("hide2show1")}>
                                <Text style={styles.loginText}>Previous</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.loginScreenButton} onPress={() => this.formValidation("showHideDemo3")}>
                                <Text style={styles.loginText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                {showHideDemo3 &&
                    <View>
                        <View style={styles.RadioButtonwrapper}>
                            <RadioButton.Android
                                value="MEMBER"
                                status={checked === 'MEMBER' ? 'checked' : 'unchecked'}
                                onPress={() => this.setChecked('MEMBER')}
                                color='#f2831d'
                                uncheckedColor='#ffffff'
                            />
                            <View style={styles.radiotitlecontainer}>
                                <Text style={styles.radiofieldtitle}>IMC Member Account</Text>
                                <Text style={styles.radiofieldtext}>Choose this if you have a valid motor insurance policy or bank card.</Text>
                            </View>
                        </View>

                        <View style={styles.RadioButtonwrapper}>
                            <RadioButton.Android
                                value="GUEST"
                                status={checked === 'GUEST' ? 'checked' : 'unchecked'}
                                onPress={() => this.setChecked('GUEST')}
                                color='#f2831d'
                                uncheckedColor='#ffffff'
                            />
                            <View style={styles.radiotitlecontainer}>
                                <Text style={styles.radiofieldtitle}>Guest Account</Text>
                                <Text style={styles.radiofieldtext}>Choose this to continue as guest.</Text>
                                <Text style={styles.radiofieldtext}>You will be charged for each service.</Text>
                            </View>
                        </View>

                        <View style={styles.Topupinfo}>
                            <TouchableOpacity style={styles.loginScreenButton} onPress={() => this.hideComponent("hide3show2")}>
                                <Text style={styles.loginText}>Previous</Text>
                            </TouchableOpacity>

                            {this.state.guest ?
                                <TouchableOpacity style={styles.loginScreenButton} onPress={() => this.setState({ alertBox: true })}>
                                    <Text style={styles.loginText}>Finish</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.loginScreenButton} onPress={() => this.hideComponent("showHideDemo4")}>
                                    <Text style={styles.loginText}>Next</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                }

                {showHideDemo4 &&
                    <View>
                        <View style={styles.textfieldWrapper}>
                            <Text style={styles.radiofieldtitle}>Service Provider</Text>
                            <TouchableOpacity onPress={() => this.setState({ modalshow: true })}>
                                <Text style={{ color: '#76757b' }}>{this.state.service}</Text>
                            </TouchableOpacity>
                            {check_service && <TouchableOpacity style={{ position: 'absolute', right: 0, top: Platform.OS === 'ios' ? -5 : 15 }} onPress={() => this.handleToggle()} disabled={true}>
                                <Circle name='minuscircle' size={20} color={'#f44336'} />
                            </TouchableOpacity>}
                        </View>

                        {this.state.insurance &&
                            <View>
                                <View style={styles.textfieldWrapper}>
                                    <Text style={styles.textfieldtitle}>Policy Number</Text>
                                    <TextInput
                                        onChangeText={(text) => { this.setState({ r_ps_no: text }) }}
                                        style={{ color: '#ffffff' }}
                                        value={r_ps_no}
                                    />
                                    {check_r_ps_no && <TouchableOpacity style={{ position: 'absolute', right: 0, top: Platform.OS === 'ios' ? -5 : 15 }} onPress={() => this.handleToggle()} disabled={true}>
                                        <Circle name='minuscircle' size={20} color={'#f44336'} />
                                    </TouchableOpacity>}
                                </View>
                                <View style={styles.textfieldWrapper}>
                                    <Text style={styles.textfieldtitle}>Full Chassis Number (17 characters)</Text>
                                    <TextInput
                                        onChangeText={(text) => { this.setState({ insc_chs_no: text }) }}
                                        style={{ color: '#ffffff' }}
                                        value={insc_chs_no}
                                    />
                                    {check_insc_chs_no && <TouchableOpacity style={{ position: 'absolute', right: 0, top: Platform.OS === 'ios' ? -5 : 15 }} onPress={() => this.handleToggle()} disabled={true}>
                                        <Circle name='minuscircle' size={20} color={'#f44336'} />
                                    </TouchableOpacity>}
                                </View>
                            </View>
                        }

                        {this.state.bank &&
                            <View style={styles.textfieldWrapper}>
                                <Text style={styles.textfieldtitle}>Card Numer</Text>
                                <TextInput
                                    onChangeText={(text) => { this.setState({ card_chs_no: text }) }}
                                    style={{ color: '#ffffff' }}
                                    value={card_chs_no}
                                />
                                {check_card_chs_no && <TouchableOpacity style={{ position: 'absolute', right: 0, top: Platform.OS === 'ios' ? -5 : 15 }} onPress={() => this.handleToggle()} disabled={true}>
                                    <Circle name='minuscircle' size={20} color={'#f44336'} />
                                </TouchableOpacity>}
                            </View>
                        }

                        {this.state.others &&
                            <View style={styles.textfieldWrapper}>
                                <Text style={styles.textfieldtitle}>Full Chassis Number (17 characters)</Text>
                                <TextInput
                                    onChangeText={(text) => { this.setState({ othr_chs_no: text }) }}
                                    style={{ color: '#ffffff' }}
                                    value={othr_chs_no}
                                />
                                {check_othr_chs_no && <TouchableOpacity style={{ position: 'absolute', right: 0, top: Platform.OS === 'ios' ? -5 : 15 }} onPress={() => this.handleToggle()} disabled={true}>
                                    <Circle name='minuscircle' size={20} color={'#f44336'} />
                                </TouchableOpacity>}
                            </View>
                        }

                        <Modal
                            transparent={true}
                            visible={this.state.modalshow}
                        >
                            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', flex: 1 }}>
                                <View style={{ backgroundColor: '#23222a', marginTop: 150, marginLeft: 40, marginRight: 40 }}>
                                    <Text style={{ color: '#ffffff', margin: 20 }}>Service Provider</Text>
                                    <View
                                        style={{
                                            borderBottomColor: '#ffffff',
                                            borderBottomWidth: 2,
                                        }}
                                    />
                                    <View style={styles.ServiceRadiowrapper}>
                                        <RadioButton.Android
                                            value="Insurance Company"
                                            status={service === 'Insurance Company' ? 'checked' : 'unchecked'}
                                            onPress={() => this.setState({ service: 'Insurance Company' })}
                                            color='#f2831d'
                                            uncheckedColor='#ffffff'
                                        />
                                        <View style={styles.Serviceradiotitlecontainer}>
                                            <Text style={styles.Serviceradiofieldtitle}>Insurance Company</Text>
                                        </View>
                                    </View>

                                    <View style={styles.ServiceRadiowrapper}>
                                        <RadioButton.Android
                                            value="Bank"
                                            status={service === 'Bank' ? 'checked' : 'unchecked'}
                                            onPress={() => this.setState({ service: 'Bank' })}
                                            color='#f2831d'
                                            uncheckedColor='#ffffff'
                                        />
                                        <View style={styles.Serviceradiotitlecontainer}>
                                            <Text style={styles.Serviceradiofieldtitle}>Bank</Text>
                                        </View>
                                    </View>

                                    <View style={styles.ServiceRadiowrapper}>
                                        <RadioButton.Android
                                            value="Others"
                                            status={service === 'Others' ? 'checked' : 'unchecked'}
                                            onPress={() => this.setState({ service: 'Others' })}
                                            color='#f2831d'
                                            uncheckedColor='#ffffff'
                                        />
                                        <View style={styles.Serviceradiotitlecontainer}>
                                            <Text style={styles.Serviceradiofieldtitle}>Others</Text>
                                        </View>
                                    </View>

                                    <View style={{ backgroundColor: '#f2831d', flexDirection: 'row', justifyContent: 'flex-end', height: 50 }}>
                                        <TouchableOpacity style={{ backgroundColor: '#f2831d' }} onPress={() => this.setState({ modalshow: false })}>
                                            <Text style={{ color: '#ffffff', marginRight: 20, marginTop: 12, fontSize: 18 }}>CANCEL</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ backgroundColor: '#f2831d' }} onPress={() => this.ServiceProvider(this.state.service)}>
                                            <Text style={{ color: '#ffffff', marginRight: 20, marginTop: 12, fontSize: 18 }}>OK</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>


                        <View style={styles.Topupinfo}>
                            <TouchableOpacity style={styles.loginScreenButton} onPress={() => this.hideComponent("hide4show3")}>
                                <Text style={styles.loginText}>Previous</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.loginScreenButton} onPress={() => this.formValidation("finish")}>
                                <Text style={styles.loginText}>Finish</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                }

                <Modal
                    transparent={true}
                    visible={alertBox}
                //visible={true}
                >
                    <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', flex: 1 }}>
                        <View style={{ backgroundColor: '#23222a', marginTop: 150, marginLeft: 50, marginRight: 50 }}>
                            <Text style={{ color: '#ffffff', margin: 20, fontFamily: 'Jura-Bold' }}>Info</Text>
                            <View
                                style={{
                                    borderBottomColor: '#ffffff',
                                    borderBottomWidth: 2,
                                }}
                            />
                            <View style={{
                                margin: 20,
                            }} >
                                <Text style={{ color: '#ffffff', fontFamily: 'Jura-Bold' }}>Thankyou for registering</Text>
                                <Text style={{ color: '#ffffff', marginTop: 15, fontFamily: 'Jura-Bold' }}>A verification link has been sent</Text>
                                <Text style={{ color: '#ffffff', fontFamily: 'Jura-Bold' }}>to your email account </Text>
                                <Text style={{ color: '#ffffff', fontFamily: 'Jura-Bold' }}>Please click the link to complete</Text>
                                <Text style={{ color: '#ffffff', fontFamily: 'Jura-Bold' }}>the registration process.</Text>

                                <Text style={{ color: '#ffffff', marginTop: 15, fontFamily: 'Jura-Bold' }}>You will be eligible for availing</Text>
                                <Text style={{ color: '#ffffff', fontFamily: 'Jura-Bold' }}>IMC services after account</Text>
                                <Text style={{ color: '#ffffff', fontFamily: 'Jura-Bold' }}>verfication</Text>
                            </View>


                            <View style={{ backgroundColor: '#f2831d', flexDirection: 'row', justifyContent: 'flex-end', height: 50 }}>
                                <TouchableOpacity style={{ backgroundColor: '#f2831d' }}
                                    onPress={() => this.submit()}>
                                    <Text style={{ color: '#ffffff', marginRight: 20, marginTop: 12, fontSize: 18, fontFamily: 'Jura-Bold' }}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


                <View style={styles.LoginContainer}>
                    <Text style={styles.logintitle}>Already have an account?
                        <TouchableOpacity style={styles.wordButton} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.loginword}>Login</Text>
                        </TouchableOpacity>
                    </Text>
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
        padding: 20
    },
    logocontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    PagetitleContainer: {
        height: 50,
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    Pagetitle: {
        color: '#f58020',
        textAlign: 'center',
        fontSize: 24,
        fontFamily: "Jura-Bold",
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
        fontFamily: "Jura-Bold",
        fontSize: 12
    },
    loginScreenButton: {
        backgroundColor: '#f2831d',
        width: '49.5%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'flex-end'
    },
    loginText: {
        color: '#ffffff',
        fontSize: 20,
        fontFamily: "Jura-Bold",
    },
    LoginContainer: {
        justifyContent: 'center',
        marginTop: 20,
    },
    logintitle: {
        color: '#ffffff',
        fontFamily: "Jura-Bold",
        textAlign: 'center',
    },
    wordButton: {
        paddingTop: 20,
        height: 35,
    },
    loginword: {
        color: '#f2831d',
        marginLeft: 5,
        height: 20
    },
    Topupinfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        height: 80,
    },
    radiotitlecontainer: {
        marginLeft: 20
    },
    radiofieldtitle: {
        color: '#f58020',
        fontFamily: "Jura-Bold",
        marginBottom: 0
    },
    radiofieldtext: {
        fontFamily: "Jura-Bold", color: '#ffffff', fontSize: 12
    },
    ServiceRadiowrapper: {
        flexDirection: 'row',
        padding: 20,
    },
    Serviceradiofieldtitle: {
        color: '#ffffff',
        marginTop: 5,
        marginLeft: 20,
        fontFamily: "Jura-Bold",
        fontSize: 18
    }
});

export default Splash;