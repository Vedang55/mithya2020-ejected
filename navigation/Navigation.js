import Home from '../screens/Home'
import Scores from '../screens/Scores'
import Events from '../screens/Events'
import Team from '../screens/Team'
import Schedule from '../screens/Schedule'
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native'
import { Overlay } from 'react-native-elements';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();

const barProps = {
    routes: {
        Home: {
            navigationOptions: {
                tabBarLabel: 'HOME',
                tabBarIcon: (compProps) => (
                    <Icon name="home" color={compProps.color} size={24} />
                ),
                tabBarColor: '#111'
            }
        },
        Scores: {
            navigationOptions: {
                tabBarLabel: 'SCORES',
                tabBarIcon: (compProps) => (
                    <Icon name="chart-bar" color={compProps.color} size={24} />
                ),
                tabBarColor: '#4000BF',
                // unmountOnBlur : true
            }
        },
        Events: {
            navigationOptions: {
                tabBarLabel: 'EVENTS',
                tabBarIcon: (compProps) => (
                    <MIcon name="event" color={compProps.color} size={24} />
                ),
                tabBarColor: 'green',
            }
        },
        Schedule: {
            navigationOptions: {
                tabBarLabel: 'SCHEDULE',
                tabBarIcon: (compProps) => (
                    <MIcon name="schedule" color={compProps.color} size={24} />
                ),
                tabBarColor: 'purple'

            }
        },
        Team: {
            navigationOptions: {
                tabBarLabel: 'TEAM',
                tabBarIcon: (compProps) => (
                    <Icon name="users" color={compProps.color} size={24} />
                ),
                tabBarColor: '#cc0066',
                unmountOnBlur: false
            }
        },
    },



};

const tabBarOptions = {
    style: {
        height: 58,
        backgroundColor: '#3a3225',

    },
    labelStyle: {
        fontFamily: 'Raleway-Medium',
        marginBottom: 5,
    },
    inactiveTintColor: 'white',
    activeTintColor: 'orange',

}


const HOC = React.memo((props) => {
    return (props.children);
})


const AppNavigator = (props) => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 300)
    });


    return (

        <React.Fragment>
            <Overlay isVisible={loading}
                width={Dimensions.get('window').width}
                height={Dimensions.get('window').height}
                overlayStyle={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </Overlay>
            <HOC>
                <Tab.Navigator tabBarOptions={tabBarOptions} lazy={true} >
                    <Tab.Screen name="Home" component={Home}
                        options={{ ...barProps.routes.Home.navigationOptions }} />
                    <Tab.Screen name="Scores" component={Scores}
                        options={{ ...barProps.routes.Scores.navigationOptions }} />
                    <Tab.Screen name="Events" component={Events}
                        options={{ ...barProps.routes.Events.navigationOptions }} />
                    <Tab.Screen name="Schedule" component={Schedule}
                        options={{ ...barProps.routes.Schedule.navigationOptions }} />
                    <Tab.Screen name="Team" component={Team}
                        options={{ ...barProps.routes.Team.navigationOptions }} />
                </Tab.Navigator>
            </HOC>
        </React.Fragment>
    );
}


export default AppNavigator;