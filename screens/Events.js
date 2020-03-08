import React from 'react';
import { StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ace from '../containers/Ace'

const Tab = createMaterialTopTabNavigator();
const navProps = {
    routes: {
        'Ace': {
            navigationOptions: {
            }
        },
        'King': {
            navigationOptions: {
            }
        },
        'Queen': {
            navigationOptions: {
            }
        },

        'Jack': {
            navigationOptions: {
            }
        },

    },

    options: {

        tabBarOptions: {
            showIcon: true,
            showLabel: true,
            style: {
                paddingTop: StatusBar.currentHeight,
                backgroundColor: "#3a3225"
            },
            activeTintColor: 'orange',
            inactiveTintColor: 'white',

            indicatorStyle: {
                backgroundColor: 'orange',
                height: 4,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,

            },
            labelStyle: {
                letterSpacing: 1.2,
                fontFamily: 'Raleway-Bold',
                fontSize: 12

            },
        },

    }
}




const Events = (props) => {

    return (
        <React.Fragment>
            <Tab.Navigator lazy={true} lazyPreloadDistance={1} tabBarOptions={navProps.options.tabBarOptions}>
                <Tab.Screen name="Ace" component={Ace}
                    options={navProps.routes.Ace.navigationOptions} />
                <Tab.Screen name="King" component={Ace}
                    options={navProps.routes.King.navigationOptions} />
                <Tab.Screen name="Queen" component={Ace}
                    options={navProps.routes.Queen.navigationOptions} />
                <Tab.Screen name="Jack" component={Ace}
                    options={navProps.routes.Jack.navigationOptions} />
            </Tab.Navigator>
        </React.Fragment>


    );
}



export default React.memo(Events);