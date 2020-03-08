import React, { useContext } from 'react';
import { StyleSheet, View, Dimensions, StatusBar, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TeamCard from '../components/TeamCard'
// import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import teamMithyaData from '../assets/data/teamreq'
import { ThemeContext } from "../context/dark";

//--------BACKGROUND COLOR-----------
const lightbackground = '#fef3d3';
const darkbackground = '#222';


const { height, width } = Dimensions.get('window')


const devsData = [{ name: "VEDANG DUBALE", image: require('../assets/images/team/vedang.webp') },
{ name: "ANUBHAV SINGH", image: require('../assets/images/team/anubhav.webp') },
{ name: "ARIC PEREIRA", image: require('../assets/images/team/aric.webp') },
{ name: "KENNY GONSALVES", image: require('../assets/images/team/kenny.webp') },
{ name: "KIEFER DIAS", image: require('../assets/images/team/kiefer.webp') },
{ name: "TYRONE SALDANHA", image: require('../assets/images/team/tyrone.webp') }];


const Developers = () => {
    const [theme, setTheme] = useContext(ThemeContext);

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme ? darkbackground : lightbackground
        }}>
            {/* <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, marginTop: 40 }}>#Team Mithya</Text> */}
            <FlatList
                data={devsData}
                renderItem={({ item }) => (
                    <TeamCard data={item} />
                )}
                keyExtractor={(item, i) => i}
                numColumns='2'
            />
        </View>
    );
}



const TeamMithya = () => {
    const [theme, setTheme] = useContext(ThemeContext);
    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme ? darkbackground : lightbackground
        }}>
            {/* <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, marginTop: 40 }}>#Team Mithya</Text> */}
            <FlatList
                data={teamMithyaData}
                renderItem={({ item }) => {
                    if (item.header) {
                        return (
                            <View style={{
                                width: width,
                            }}>
                                {item.title ? <Text style={{
                                    color: theme ? 'white' : 'black',
                                    fontSize: 30, fontFamily: 'Raleway-Bold',
                                    textAlign: 'center',
                                    paddingTop: 10
                                }}>{item.title}</Text> : null}

                            </View>
                        );
                    }
                    else if (item.filler) {
                        return (
                            <View style={{
                                flex: 1,
                            }}>
                            </View>
                        );
                    }

                    return (<TeamCard data={item} />);
                }}
                keyExtractor={(item, i) => i}
                numColumns='2'
            />




        </View>
    );
}




const Tab = createMaterialTopTabNavigator();

const navProps = {
    routes: {
        'Developers': {
            screen: Developers,
            navigationOptions: {
                tabBarIcon: (compProps) => {
                    return <Icon name="code" color={compProps.color} size={20} />
                }

            }

        },
        'TeamMithya': {
            screen: TeamMithya,
            navigationOptions: {
                tabBarIcon: (compProps) => {
                    return <Icon name="users" color={compProps.color} size={20} />
                }

            }
        }
    },

    options: {
        tabBarOptions: {
            showIcon: true,
            showLabel: true,
            style: {
                paddingTop: StatusBar.currentHeight,
                backgroundColor: "#3a3225"
            },
            indicatorStyle: {
                height: 5,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: 'orange'
            },
            activeTintColor: 'orange',
            inactiveTintColor: 'white'
        },

        defaultNavigationOptions: {

        }
    }
}

const Team = (props) => {

    // useFocusEffect(
    //     React.useCallback(() => {
    //         StatusBar.setBarStyle('light-content');
    //         Platform.OS === 'android' && StatusBar.setBackgroundColor('#3a3225');
    //     }, [])
    // );

    return (
        <Tab.Navigator lazy={true} tabBarOptions={navProps.options.tabBarOptions}>
            <Tab.Screen name="Developers" component={Developers}
                options={navProps.routes.Developers.navigationOptions} />
            <Tab.Screen name="Team Mithya" component={TeamMithya}
                options={navProps.routes.TeamMithya.navigationOptions} />
        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fef3d3',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
});




export default Team;