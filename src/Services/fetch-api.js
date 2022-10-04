import AsyncStorage from '@react-native-async-storage/async-storage';
import { url as API_HOST } from './Api/api';
// refresh token

const refreshToken = async (uid, token) => {
    console.log("REFRESH", token)
    var requestUrl = API_HOST + `CustomerApp/RefreshAccessToken`;
    var options = {
        method: 'POST',
        headers: {
            Authorization: token,
            'client-code': 'customerapp',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid })
    };
    const result = await fetch(requestUrl, options).then((response) => {
        const data = response.json();
        AsyncStorage.setItem('userData', JSON.stringify(data))
        return result
    });
    return result
}


export async function fetch_api(url, method, data = null, retry = false) {
    const storageData = await AsyncStorage.getItem('userData');
    const { refresh_token: token, user_login_id: uid } = JSON.parse(storageData);
    const config = {
        method: method,
        headers: {
            'Authorization': token,
            'client-code': 'customerapp',
            'Content-Type': 'application/json'
        },
    }
    if (method === "POST") {
        config.body = data ? JSON.stringify(data) : ''
    }
    return new Promise(function (resolve, reject) {
        fetch(url, config)
            .then(async (response) => {
                console.log(url, response);
                if (response.status === 500 && !retry) {
                    await refreshToken(uid, token);
                    return fetch_api(url, method, null, true);
                } else if (response.status === 500 && retry) {
                    reject({ error: 'Error to RefreshToken' });
                }
                else {
                    if (response.status === 201) resolve();
                    else return response
                }
            })
            .then(res => resolve(res))
            .catch(err => {
                console.log("ERRO", err)
                reject(err)
            })
            .catch(error => console.log("OUTER", error))
    })
}
