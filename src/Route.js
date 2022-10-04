import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { _webservies } from './Services';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/Login/Login';
import Dashboard from './screens/Dashboard/Dashboard';
import OpenServiceClick from './screens/Dashboard/OpenServiceClick';

import Splash from './screens/Splash/Splash1';
import Splash2 from './screens/Splash/Splash2';
import Signup from './screens/Signup/Signup';
import Forgot from './screens/Forgot/Forgot';

import Myvehicles from './screens/MyVehicles/Myvehicles';
import AddNewVehicle from './screens/MyVehicles/AddNewVehicle';
import GuestAddVechicle from './screens/MyVehicles/GuestAddVechicle';

import Myservices from './screens/Myservices/Myservices';

import DrawerContent from './DrawerContent/DrwaerContent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getHeaderTitle } from '@react-navigation/elements';
import MyHeader from './Components/MyHeader';
import { header } from './assets/images/index'

import NewService from './screens/Myservices/Newservice';
import ServiceType from './screens/Myservices/ServiceType';
import Roadside from './screens/Services/Roadside';
import Concierge from './screens/Services/Concierge';
import Rent from './screens/Services/Rent';

import RoadsideServices from './screens/Services/Towing/RoadsideServices';
import ParkedLocation from './screens/Services/Towing/ParkedLocation';
import Disclaimer from './screens/Services/Towing/Disclaimer';
import Mappage from './screens/Services/Towing/Mappage';
import Detailsform from './screens/Services/Towing/Detailsform';
import Breakdown from './screens/Services/Towing/Breakdown';

import BatteryMappage from './screens/Services/BatteryBoosting/Mappage';
import BatteryDetailsform from './screens/Services/BatteryBoosting/Detailsform';

import Tools from './screens/Services/FlatTyre/Tools';
import FlatTyreMappage from './screens/Services/FlatTyre/Mappage';
import FlatTyreDetailsform from './screens/Services/FlatTyre/Detailsform';

import FuelDeliveryMappage from './screens/Services/FuelDelivery/Mappage';
import FuelDeliveryDetailsform from './screens/Services/FuelDelivery/Detailsform';

import Pullout from './screens/Services/PullOut/Pullout';
import PulloutParkedLocation from './screens/Services/PullOut/ParkedLocation';
import PulloutDisclaimer from './screens/Services/PullOut/Disclaimer';
import PulloutMappage from './screens/Services/PullOut/Mappage';
import PulloutDetailsform from './screens/Services/PullOut/Detailsform';
import PulloutBreakdown from './screens/Services/PullOut/Breakdown';

import Offroad from './screens/Services/OffRoad/Offroad';
import OffRoadParkedLocation from './screens/Services/OffRoad/ParkedLocation';
import OffRoadDisclaimer from './screens/Services/OffRoad/Disclaimer';
import OffRoadMappage from './screens/Services/OffRoad/Mappage';
import OffRoadDetailsform from './screens/Services/OffRoad/Detailsform';
import OffRoadBreakdown from './screens/Services/OffRoad/Breakdown';

import LockoutDisclaimer from './screens/Services/Lockout/Disclaimer';
import LockoutMappage from './screens/Services/Lockout/Mappage';
import LockoutDetailsform from './screens/Services/Lockout/Detailsform';

import Registration from './screens/Services/Registration';
import Menu from 'react-native-vector-icons/MaterialIcons';
import AirportPick from './screens/Concrige.services/AirportPick';
import CameraPermission from './screens/Concrige.services/CameraPermission';
import MeetAssist from './screens/Concrige.services/MeetAssist';
import RentCar from './screens/Rent/RentCar';
import Desclaimer from './screens/Rent/Desclaimer';
import RentForm from './screens/Rent/RentForm';
import RegistrationRenewal from './screens/Registration.renewal/RegRenewal';
import DocumentReq from './screens/Registration.renewal/DocumentReq';
import RegDesclaimer from './screens/Registration.renewal/Desclaimer';
import ContactUs from './screens/ContactUs/ContactUs';
import Profile from './screens/Profile/Profile';
import ChangePassword from './screens/ChangePassword/ChangePassword';
import CancelService from './screens/Myservices/CancelService';
import Map from './screens/Map/map';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TransferType from './screens/Concrige.services/TransferType';
import Airport from './screens/Concrige.services/Airport';
import AirportForm from './screens/Concrige.services/AirportForm';
import MeetAssistForm from './screens/Concrige.services/MeetAssistForm';
import Social from './screens/Socialmedia/Socialmedia';

const Stack = createNativeStackNavigator();

function LogoTitle() {
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            <Image source={header} style={{ height: 45, width: '100%', marginLeft: -40 }} resizeMode='contain' />
            <TouchableOpacity style={{ marginLeft: -20 }} onPress={() => navigation.navigate('Dashboard')}>
                <Menu name='home' size={25} color={'#f57f17'} />
            </TouchableOpacity>
        </View>
    );
}
const Unlogged = createNativeStackNavigator();
const UnLoggedScreens = () => {
    return (
        <Unlogged.Navigator >
            <Unlogged.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Unlogged.Screen name="Splash2" component={Splash2} options={{ headerShown: false }} />
            <Unlogged.Screen name="Login" component={HomeScreen} options={{ headerShown: false }} />
            <Unlogged.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Unlogged.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
        </Unlogged.Navigator>
    )
}

const logged = createNativeStackNavigator();
const LoggedScreens = () => {
    return (
        <logged.Navigator initialRouteName="Dashboard">
            <logged.Screen name="Dashboard" component={DawerNavigation} options={{ headerShown: false }} />
            <logged.Screen name="OpenServiceClick" component={OpenServiceClick} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Contact" component={ContactUs} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Social" component={Social} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />


            <logged.Screen name="Myvehicles" component={Myvehicles} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="AddNewVehicle" component={AddNewVehicle} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="GuestAddVechicle" component={GuestAddVechicle} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Myservices" component={Myservices} options={{ headerShown: false }} />
            <logged.Screen name="NewService" component={NewService} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="ServiceType" component={ServiceType} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Roadside" component={Roadside} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Concierge" component={Concierge} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Rent" component={Rent} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Registration" component={Registration} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="RoadsideServices" component={RoadsideServices} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="ParkedLocation" component={ParkedLocation} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Breakdown" component={Breakdown} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Disclaimer" component={Disclaimer} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />

            <logged.Screen name="RegRenewal" component={RegistrationRenewal} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />


            <logged.Screen name="RegDocument" component={DocumentReq} options={{

                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />

            <logged.Screen name="BatteryDetailsform" component={BatteryDetailsform} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="BatteryMappage" component={BatteryMappage} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Tools" component={Tools} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="FlatTyreMappage" component={FlatTyreMappage} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="FlatTyreDetailsform" component={FlatTyreDetailsform} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Detailsform" component={Detailsform} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Mappage" component={Mappage} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="FuelDeliveryMappage" component={FuelDeliveryMappage} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="FuelDeliveryDetailsform" component={FuelDeliveryDetailsform} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Pullout" component={Pullout} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="PulloutParkedLocation" component={PulloutParkedLocation} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="PulloutDisclaimer" component={PulloutDisclaimer} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="PulloutMappage" component={PulloutMappage} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="PulloutDetailsform" component={PulloutDetailsform} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="PulloutBreakdown" component={PulloutBreakdown} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
            <logged.Screen name="Offroad" component={Offroad} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="OffRoadParkedLocation" component={OffRoadParkedLocation} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="OffRoadDisclaimer" component={OffRoadDisclaimer} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="OffRoadMappage" component={OffRoadMappage} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="OffRoadDetailsform" component={OffRoadDetailsform} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="OffRoadBreakdown" component={OffRoadBreakdown} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="LockoutDisclaimer" component={LockoutDisclaimer} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="LockoutMappage" component={LockoutMappage} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="LockoutDetailsform" component={LockoutDetailsform} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Air_pick" component={AirportPick} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="RegDesclaimer" component={RegDesclaimer} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="CameraPermission" component={CameraPermission} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Meet_assist" component={MeetAssist} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Rent_car" component={RentCar} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="rent_desclaimer" component={Desclaimer} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="RentForm" component={RentForm} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="CancelService" component={CancelService} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Map" component={Map} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="TransferType" component={TransferType} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="Airport" component={Airport} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="AirportForm" component={AirportForm} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
            <logged.Screen name="MeetForm" component={MeetAssistForm} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor: '#23222a',
                },
                headerTintColor: '#f2831d',
            }} />
        </logged.Navigator>
    )
}



const App = () => {
    // const { } = useNavigation()

    // const refreshToken = async (user_system_id, access_token) => {
    //     try {
    //         let response = await _webservies._refresh_token(user_system_id, access_token)
    //         let responseJson = await response.json()
    //         console.log(responseJson)
    //         if (responseJson.IsSuccess === true) {
    //             console.log(responseJson?.ResponseData)
    //         } else {
    //             // _webservies.Logout(props)
    //         }
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    useEffect(async () => {
        await AsyncStorage.getItem('userData')
            .then(data => {
                let { access_token, user_login_id } = JSON.parse(data) || '';
                // refreshToken(user_login_id, access_token)
            })
    }, [])
    return (
        <Stack.Navigator initialRouteName="unlogged" screenOptions={{ headerShown: false }}>
            <Stack.Screen name='unlogged' component={UnLoggedScreens} />
            <Stack.Screen name='logged' component={LoggedScreens} />
        </Stack.Navigator>
    );
}
const Drawer = createDrawerNavigator();
const DawerNavigation = (props) => {
    const { navigation } = props
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('drawerItemPress', (e) => {
            // Prevent default behavior
            e.preventDefault();

            // Do something manually
            // ...
        });

        return unsubscribe;
    }, [navigation]);
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} screenOptions={{
            header: ({ navigation, route, options }) => {
                const title = getHeaderTitle(options, route.name);
                return <MyHeader title={title} style={options.headerStyle} />;
            }
        }} >
            <Drawer.Screen name="Profile" component={Dashboard} />
            <Drawer.Screen name="About_us" component={Dashboard} />
            <Drawer.Screen name="Blog" component={Dashboard} />
            <Drawer.Screen name="Social_media" component={Dashboard} />
            <Drawer.Screen name="Logout" component={HomeScreen} />
            <Drawer.Screen name="UserProfile" component={Profile} />
        </Drawer.Navigator>
    )
}
//export default App;
export default App;