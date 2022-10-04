import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import { View, Image, Text, Dimensions, Linking  } from 'react-native'
import { avtar, logo } from '../assets/images/index'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerContent = (props) => {
    const [userData, setUserData] = React.useState([])
    const { user_name } = userData || {}

    const data = async () => {
        try {
            await AsyncStorage.getItem('userData')
                .then(data => {
                    setUserData(JSON.parse(data))
                })
        } catch (err) {
            console.log(err)
        }
    }

    const Logout = async () => {
        await AsyncStorage.setItem('userData', '')
        props.navigation.navigate('unlogged')
    }

    React.useEffect(async () => {
        data()
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: '#23222a', height: Dimensions.get('window').height }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#23222a' }}>
                <View style={{ backgroundColor: '#32303b', marginBottom: 5, alignItems: 'center' }}>
                    <Image source={avtar} style={{ borderRadius: 100, height: 200, width: 200, alignSelf: 'center', marginTop: 20 }} resizeMode={'cover'} />
                    <Text style={{ color: '#fff', paddingBottom: 10 }}>{user_name}</Text>
                </View>
                <DrawerItem
                    icon={({ color, size }) => (
                        <FontAwesome5 name="user-alt" size={18} color={'#f57f17'} />
                    )}
                    label={({ focused, color }) => <Text style={{ color: focused ? '#aaa' : '#fff' }}>Profile</Text>}
                    onPress={() => { props.navigation.navigate('UserProfile') }}
                    inactiveBackgroundColor="#32303b"
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <FontAwesome5 name="user-friends" size={18} color={'#f57f17'} />
                    )}
                    label={({ focused, color }) => <Text style={{ color: focused ? '#aaa' : '#fff' }}>About Us</Text>}
                    onPress={ ()=>{ Linking.openURL('http://motoringclub.com/about.php')}}
                    inactiveBackgroundColor="#32303b"
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Feather name="book-open" size={18} color={'#f57f17'} />
                    )}
                    label={({ focused, color }) => <Text style={{ color: focused ? '#aaa' : '#fff' }}>Blog</Text>}
                    onPress={ ()=>{ Linking.openURL('http://motoringclub.com/blog.php')}}
                    inactiveBackgroundColor="#32303b"
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <FontAwesome5 name="share-alt" size={18} color={'#f57f17'} />
                    )}
                    label={({ focused, color }) => <Text style={{ color: focused ? '#aaa' : '#fff' }}>Social Media</Text>}
                    onPress={() => { props.navigation.navigate('Social') }}
                    inactiveBackgroundColor="#32303b"
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons name="login-variant" size={18} color={'#f57f17'} />
                    )}
                    label={({ focused, color }) => <Text style={{ color: focused ? '#aaa' : '#fff' }}>Logout</Text>}
                    onPress={Logout}
                    inactiveBackgroundColor="#32303b"
                />
            </DrawerContentScrollView>
        </View>
    )
}

export default DrawerContent