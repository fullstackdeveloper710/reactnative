import React from 'react'
import { View, TouchableOpacity, Text, Dimensions } from 'react-native'
export const Modal = (props) => {
    const { height } = Dimensions.get('window')
    return (
        props.show ?
            <View style={{ position: 'absolute', height: height, width: '100%', top: 0 }}>
                <View style={{ position: 'absolute', backgroundColor: '#fff', height: '100%', width: '100%', top: 0, opacity: 0.5 }}></View>
                <View style={{ position: 'absolute', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', top: 0, zIndex: 1000 }}>
                    <View style={{ height: 150, width: 250, backgroundColor: '#32303b', marginTop: -100, borderRadius: 4, zIndex: 10000000 }}>
                        <Text style={{ color: '#eee', paddingTop: 20, paddingLeft: 20, fontFamily: 'Jura-Bold', }}>{props.title}</Text>
                        <Text style={{ color: '#eee', paddingTop: 10, paddingLeft: 20, fontFamily: 'Jura-Bold', marginBottom: 35 }}>{props.message}</Text>
                        <TouchableOpacity style={{ position: 'relative', bottom: 0, height: 50, width: '100%', backgroundColor: '#f2831d', alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => { props.setShow(false), console.log('hello') }}>
                            <Text style={{ fontFamily: 'Jura-Bold', color: '#fff', marginRight: 30 }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> : null
    )
}

export default Modal