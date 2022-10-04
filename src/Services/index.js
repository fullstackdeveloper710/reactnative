import { url } from './Api/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetch_api } from './fetch-api';
// user login

const _user_login = async (uid, password) => {
    const data = {
        uid: uid,
        pwd: password
    }
    var requestUrl = url + `CustomerApp/LoginUser`;
    var options = {
        method: 'POST',
        headers: {
            'client-code': 'customerapp',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    return await fetch(requestUrl, options).then((response) => response);
}

// register user
const _register_user = async (r_email, r_pwd, r_cpwd, r_fname, r_lname, r_mobno, r_provider, r_ps_no, r_chs_no, r_acc_type) => {
    const data = {
        "r_email": r_email,
        "r_pwd": r_pwd,
        "r_cpwd": r_cpwd,
        "r_fname": r_fname,
        "r_lname": r_lname,
        "r_mobno": r_mobno,
        "r_provider": r_provider,
        "r_ps_no": r_ps_no,
        "r_chs_no": r_chs_no,
        "r_acc_type": r_acc_type
    }
    var requestUrl = url + `CustomerApp/RegisterUser`;
    console.log('Register_Data>>>>>>>>>>>>>>', data);

    var options = {
        method: 'POST',
        headers: {
            'client-code': 'customerapp',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    return await fetch(requestUrl, options).then((response) => response);
}


const _forgot = async (email_id, token) => {
    const data = {
        "email_id": email_id,
    }
    var requestUrl = url + `CustomerApp/ForgotPassword`;
    console.log('Forgot_Data>>>>>>>>>>>>>>', data);

    var options = {
        method: 'POST',
        headers: {
            'client-code': 'customerapp',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    return await fetch(requestUrl, options).then((response) => response);
}

// add new account
const _add_new_account = async (r_provider, r_ps_no, r_chs_no, r_acc_type, user_system_id) => {
    const data = {
        "r_provider": r_provider,
        "r_ps_no": r_ps_no,
        "r_chs_no": r_chs_no,
        "r_acc_type": r_acc_type,
        "r_user_sys_id": user_system_id
    }
    console.log('ACC_Data>>>>>>>>>>>>>>', data);

    var requestUrl = url + `CustomerApp/AddNewAccount`;
    return await fetch_api(requestUrl, "POST", data).then((response) => response);
}

// check email
const _check_email = async (uid) => {
    var requestUrl = url + `CustomerApp/CheckEmailTaken?uid=${uid}`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

// refresh token
const _refresh_token = async (uid, token) => {
    var requestUrl = url + `CustomerApp/RefreshAccessToken`;
    var options = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
        },
        body: { uid: uid }
    };
    return await fetch(requestUrl, options).then((response) => response);
}

// get my vehicle
const _get_my_vehicle = async (cust_id) => {
    var requestUrl = url + `CustomerApp/GetMyVehicles?cust_id=${cust_id}`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

// get my vehicle
const _get_my_services = async (cust_id) => {
    var requestUrl = url + `CustomerApp/GetMyServices?cust_id=${cust_id}`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

// get models
const _get_models = async (mk_code) => {
    var requestUrl = url + `CustomerApp/GetModels?mk_code=${mk_code}`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

// get makes
const _get_makes = async () => {
    var requestUrl = url + `CustomerApp/GetMakes`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

// get Check App UpdateYN
const _get_app_update_yn = async () => {
    var requestUrl = url + `CustomerApp/CheckAppUpdateYN?ver=1&os=IOS`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

// get profile info
const _get_profile_info = async (cust_id) => {
    var requestUrl = url + `CustomerApp/GetProfileInfo?strUId=${cust_id}`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

// update passsword
const _get_update_password = async (cust_id, oldpass, pass) => {
    const data = {
        "strUId": cust_id,
        "strPwd": pass,
        "strOldPwd": oldpass
    }
    console.log('Resserv >>>>>>>>>>>>>>>>>>>', data);
    var requestUrl = url + `CustomerApp/UpdatePassword`;
    return await fetch_api(requestUrl, "POST", data).then((response) => response);
}



// update profile information
const _update_profile = async (data) => {
    var requestUrl = url + `CustomerApp/UpdateProfile`;
    return await fetch_api(requestUrl, "POST", data).then((response) => response);
}

// update profile picture
const _update_profile_picture = async (data) => {
    var requestUrl = url + `CustomerApp/SaveProfilePicture`;
    return await fetch_api(requestUrl, "POST", data).then((response) => response);
}

//get active vehicle
const _get_active_vehicle = async (cust_id) => {
    var requestUrl = url + `CustomerApp/GetActiveVehicles?cust_id=${cust_id}`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

// get trip sheet
const _get_trip_sheet = async (cust_id) => {
    var requestUrl = url + `CustomerApp/GetActiveVehicles?cust_id=${cust_id}`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

//get homepage service 
const _get_open_service = async (cust_id) => {
    var requestUrl = url + `CustomerApp/GetOpenServices?strUId=${cust_id}`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

//get service detail db
const _get_service_detail_db = async (cust_id) => {
    var requestUrl = url + `CustomerApp/GetServiceDetailsDB?srv_id=${cust_id}`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

// get service detail
const _get_service_detail = async (cust_id) => {
    var requestUrl = url + `CustomerApp/GetServiceDetailsDB?srv_id=${cust_id}`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

// get service timeline
const _get_service_timeline = async (cust_id) => {
    var requestUrl = url + `CustomerApp/GetServiceTimeLine?srv_id=${cust_id}`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

// user profile picture
const pro_pic = (user_system_id) => url + `Images/Users/${user_system_id}.jpg`

// logout
const Logout = async (props) => {
    await AsyncStorage.setItem('userData', '')
    props.navigation.navigate('unlogged')
}

// get airport
const _get_airport = async () => {
    var requestUrl = url + `CustomerApp/GetAirports`
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

const _get_airport_terminal = async (country, apt) => {
    var requestUrl = url + `CustomerApp/GetAirportTerminals?strCouCode=${country}&strApt=${apt}`
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

const _add_new_vehicle = async (cust_id, plate_number, chs_number, mk_code, mdl_code, user_sys_id, token) => {
    const data = {
        "plate_number": plate_number,
        "chs_number": chs_number,
        "mk_code": mk_code,
        "mdl_code": mdl_code,
        "user_sys_id": user_sys_id,
        "user_id": cust_id
    }
    console.log('Resserv >>>>>>>>>>>>>>>>>>>', data);
    var requestUrl = url + `CustomerApp/AddNewVehicle`;
    return await fetch_api(requestUrl, "POST", data).then((response) => response);
}

const _get_contact_info = async () => {
    var requestUrl = url + `CustomerApp/GetContactInfo`
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

const _get_service_db = async (id) => {
    var requestUrl = url + `CustomerApp/GetServiceDetailsDB?srv_id=${id}`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

const _get_cancel_service = async (id, cust_id) => {
    var requestUrl = url + `CustomerApp/CancelService?intTSRSysId=${id}&strUserId=${cust_id}`;
    return await fetch_api(requestUrl, "GET").then((response) => response);
}

export const _webservies = {
    _user_login,
    _register_user,
    _add_new_account,
    _check_email,
    _refresh_token,
    _get_my_vehicle,
    _get_my_services,
    _get_models,
    _get_makes,
    _get_app_update_yn,
    _forgot,
    _get_profile_info,
    _get_update_password,
    Logout,
    _update_profile,
    _update_profile_picture,
    _get_active_vehicle,
    pro_pic,
    _get_open_service,
    _get_service_detail_db,
    _get_service_detail,
    _get_service_timeline,
    _get_trip_sheet,
    _get_airport,
    _get_airport_terminal,
    _add_new_vehicle,
    _get_contact_info,
    _get_service_db,
    _get_cancel_service
}