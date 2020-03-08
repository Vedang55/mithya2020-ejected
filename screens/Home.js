import React, { useState, useContext, useEffect } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions, StatusBar, Switch, AppState,
    Linking, TouchableOpacity, FlatList
} from 'react-native';
import BarChart from '../components/BarChart';
import { useIsFocused } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SocialIcon } from 'react-native-elements'
import { ThemeContext } from "../context/dark";

// import Scroll from '../components/Scroll';

const { height, width } = Dimensions.get('window')


const Drawer = createDrawerNavigator();

const openURL = () => {
    Linking.openURL('https://instagram.com/mithya_2k20?igshid=1x9cbeq8dn9o1').
        catch((err) => console.error('An error occurred', err));
}


const CustomDrawerContent = (props) => {
    const [theme, setTheme] = useContext(ThemeContext);

    const toggleSwitch = (newval) => {
        requestAnimationFrame(() => {
            setTheme(newval);
        });
    }

    return (
        // <DrawerContentScrollView {...props} style={{ backgroundColor: theme ? '#222' : 'white' }} >
        //     <View style={{
        //         flexDirection: 'row',
        //         padding: 10,
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //         flex: 1,
        //         marginBottom:20
        //     }}>
        //         <Text style={{
        //             fontSize: 20,
        //             fontFamily: 'Raleway-Medium',
        //             color: theme ? 'white' : 'black'
        //         }} >Dark Mode</Text>
        //         <Switch  value={theme} onValueChange={(newval) => { toggleSwitch(newval) }} />

        //     </View>

        //     <View style={{alignItems:'center'}}>
        //         <Text style={{fontSize:20, color: theme ? 'white' : 'black',  fontFamily: 'Raleway-Medium',}}>
        //             #teamalphacodegoa
        //         </Text>
        //         <Text style={{fontSize:20, color: theme ? 'white' : 'black'}}>
        //             www.alphacode.co.in
        //         </Text>
        //     </View>
        // </DrawerContentScrollView>

        <View style={{
            backgroundColor: theme ? '#222' : 'white', flex: 1,
            paddingTop: StatusBar.currentHeight,
            justifyContent: 'center'
        }}>


            <View style={{
                flexDirection: 'row',
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'Raleway-Medium',
                    color: theme ? 'white' : 'black'
                }} >Dark Mode</Text>
                <Switch value={theme} onValueChange={(newval) => { toggleSwitch(newval) }} />

            </View>

            <TouchableOpacity
                onPress={openURL}
                style={{
                    alignSelf: 'center', alignItems: 'center',
                    flexDirection: 'row', justifyContent: 'center'
                }} >
                <SocialIcon
                    type='instagram'
                />
                <Text style={{ fontSize: 20, fontFamily: 'Raleway-Medium', color: theme ? 'white' : 'black' }}>
                    #mithya2020
                </Text>
            </TouchableOpacity>

            <View style={{ alignItems: 'center', position: 'absolute', bottom: 30, width: '100%' }}>
                <Text style={{
                    fontSize: 20, color: theme ? 'white' : 'black',
                    fontFamily: 'Raleway-Medium',
                    textAlign: 'center',
                    lineHeight: 30
                }}>
                    © Copyright 2020 {"\n"}
                    Designed by{"\n"}
                    <Text style={{ fontFamily: 'Raleway-Bold' }}>ALPHACODE</Text>

                </Text>
            </View>

        </View>
    );
}

const HomeDrawer = () => {


    return (
        <Drawer.Navigator drawerContent={() => <CustomDrawerContent />} >
            <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
    );
}



const Sponsor = (props) => {
    return (
        <View style={{ width: 170 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
                <Image resizeMode='contain' source={props.src}
                    style={{ flex: 1, width: null, height: null }}
                />
            </View>
        </View>
    );
}





const Home = (props) => {
    const [theme, setTheme] = useContext(ThemeContext);
    const isFocused = useIsFocused();
    const [appState, setAppState] = useState(AppState.currentState);
    const [barvisi, setbarVisi] = useState(true);


    // useFocusEffect(
    //     React.useCallback(() => {
    //         StatusBar.setBarStyle('light-content');
    //         Platform.OS === 'android' && StatusBar.setBackgroundColor('#3a3225');
    //     }, [theme])
    // );

    useEffect(() => {
        AppState.addEventListener('change', _handleAppStateChange);

        return (
            () => {
                AppState.removeEventListener('change', _handleAppStateChange);
            }
        );
    })

    const _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            setbarVisi(true);
        }
        else {
            setbarVisi(false);
        }
        setAppState(nextAppState);
    };

    return (
        <View style={{ ...styles.container, backgroundColor: theme ? '#111' : '#fef3d3' }}>

            <View style={{ flexDirection: 'row', height: height / 3.4 }}>

                <View style={{
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                    width: width / 2,
                    marginBottom: 10
                }}>
                    <Icon onPress={() => {
                        requestAnimationFrame(() => {
                            props.navigation.toggleDrawer();
                        })

                    }} name="bars" size={36} color={theme ? 'white' : 'black'}
                        style={{
                            alignSelf: 'flex-start',
                            marginLeft: 10,
                            paddingBottom: 30,
                            marginTop: 4
                        }} />
                    <Image resizeMode='contain' source={require("../assets/logopcce.webp")}
                        style={{
                            width: '100%',
                            flex: 1
                        }} />
                    <Text style={{
                        flexWrap: "wrap",
                        color: theme ? 'white' : '#341e1d',
                        fontFamily: 'Raleway-Bold',
                        fontSize: 16,
                        padding: 5,
                        textAlign: 'center'

                    }}>
                        Padre Conceicao College of Engineering
                    </Text>

                    {/* <View >
                        <Text style={{ color: 'green', textAlign: 'center', fontFamily: 'Raleway-Medium', fontSize: 17 }}>PRESENTS</Text>
                    </View> */}
                </View>


                <View style={{ ...styles.mithyaLogoContainer, width: width / 2 }}>
                    <Image resizeMode='contain'
                        source={theme ? require("../assets/darklogo.png") : require("../assets/logo.webp")}
                        style={{
                            alignSelf: 'stretch',
                            flex: 1,
                            width: undefined,
                            height: undefined
                        }} />
                </View>
            </View>
            {(isFocused && barvisi) ? <BarChart /> : <View style={height / 3.8}></View>}


            <FlatList
                style={{ flex: 1, paddingTop: 8 }}
                data={[
                    require('../assets/images/sponsors/1.webp'),
                    require('../assets/images/sponsors/2.jpeg'),
                    require('../assets/images/sponsors/3.webp'),
                    require('../assets/images/sponsors/4.webp'),
                    require('../assets/images/sponsors/5.webp'),
                    require('../assets/images/sponsors/6.webp'),
                    require('../assets/images/sponsors/7.webp'),
                    require('../assets/images/sponsors/8.jpeg'),
                    require('../assets/images/sponsors/9.jpeg'),
                    require('../assets/images/sponsors/12.webp'),
                    require('../assets/images/sponsors/11.png')
                ]}
                contentContainerStyle={{ flexDirection: "row", alignItems: "stretch" }}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index, separators }) => {
                    return (<Sponsor src={item} />);
                }} />
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flex: 1,
        paddingTop: StatusBar.currentHeight + 3
    },
    mithyaLogoContainer: { alignItems: 'stretch' }
});

export default HomeDrawer;