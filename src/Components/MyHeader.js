import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions,SafeAreaView } from 'react-native'
import { header } from '../assets/images/index'
import Menu from 'react-native-vector-icons/MaterialIcons'
function MyHeader() {
    const { width } = Dimensions.get('window');
    const navigation = useNavigation()

    return (

        <SafeAreaView style={{ flex:0, backgroundColor: '#23222a' }}>
        <View style={style.container}>
            <TouchableOpacity style={{ marginLeft: 10, marginRight: 20}} onPress={() => navigation.toggleDrawer()}>
                <Menu name='menu' size={25} color={'#f57f17'} />
            </TouchableOpacity>
            <View style={style.imgcontainer}>
                <Image source={header} style={{ height: 60, width: '100%' }} resizeMode='contain' />
            </View>
          </View>  
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        height: 65,
        backgroundColor: '#23222a',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 40,
    },
    imgcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20,

    }
})
export default MyHeader