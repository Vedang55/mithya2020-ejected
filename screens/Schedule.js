import React, { useState, useEffect, useRef, useContext } from 'react';
import { StatusBar } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  InteractionManager
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import AutoHeightImage from 'react-native-auto-height-image';
// import { useFocusEffect } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import database from '@react-native-firebase/database';
import images from '../assets/data/eventsreq'
import { ThemeContext } from "../context/dark";
import AsyncStorage from '@react-native-community/async-storage';
import SchOffline from '../assets/data/sch'

//--------BACKGROUND COLOR-----------
const lightbackground = '#fef3d3';
const darkbackground = '#222';



function reverseObject(object) {
  var newObject = {};
  var keys = [];

  for (var key in object) {
    keys.push(key);
  }

  for (var i = keys.length - 1; i >= 0; i--) {
    var value = object[keys[i]];
    newObject[keys[i]] = value;
  }

  return newObject;
}

const RenderDetail = (props) => {
  let title = <Text style={[styles.title]}>{props.rowData.name}</Text>
  var desc = null
  if (images[props.rowData.name.toLowerCase().replace(/\s/g, '')])
    desc = (
      <View style={styles.descriptionContainer}>
        <AutoHeightImage
          width={width * 1.9 / 4.7}
          source={images[props.rowData.name.toLowerCase().replace(/\s/g, '')]}
          style={{ borderRadius: 10 }}
        />
      </View>
    )

  return (
    <View>
      {title}
      {desc}
    </View>
  )
}


const RenderTime = (props) => {
  return (
    <View style={{ width: width / 2.6, height: 'auto' }}>
      <View style={{
        backgroundColor: '#3a3225',
        padding: 7,
        borderRadius: 10,
        borderWidth: 0
      }}>
        <Text style={{
          color: 'white',
          lineHeight: 25,
          fontFamily: 'Raleway-Medium',
          fontSize: 17
        }}>
          <Text>{props.rowData.time}{"\n"}</Text>
          <Text>{props.rowData.venue}</Text>
        </Text>
      </View>
    </View>
  );
}



const Tab = createMaterialTopTabNavigator();
const navProps = {
  routes: {
    'Day 1': {
      navigationOptions: {
        title: 'Day 1'
      }
    },
    'Day 2': {
      navigationOptions: {
        title: 'Day 2'
      }

    },
    'Day 3': {
      navigationOptions: {
        title: 'Day 3'
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
        fontSize: 14

      },
    },

  }
}

const TabComp = (props) => {
  return (
    <Tab.Navigator lazy={true} lazyPreloadDistance={1} tabBarOptions={navProps.options.tabBarOptions}>
      <Tab.Screen name="1" component={DayScreen}
        options={navProps.routes['Day 1'].navigationOptions} />
      <Tab.Screen name="2" component={DayScreen}
        options={navProps.routes['Day 2'].navigationOptions} />
      <Tab.Screen name="3" component={DayScreen}
        options={navProps.routes['Day 3'].navigationOptions} />
    </Tab.Navigator>
  );
}



const { width, height } = Dimensions.get('window');


const DayScreen = (props) => {

  const [sechList, setSechList] = useState();
  const sechRef = useRef(database().ref('schedule/' + props.route.name + '/'));
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    InteractionManager.runAfterInteractions(()=>{
      asyncget();
    });
    
    return (() => { sechRef.current.off() });
  }, []);



  // useFocusEffect(
  //   React.useCallback(() => {
  //     StatusBar.setBarStyle('light-content');
  //     Platform.OS === 'android' && StatusBar.setBackgroundColor('#3a3225');
  //   }, [])
  // );

  const asyncget = async () => {
    try {
      const offlineData = await AsyncStorage.getItem(props.route.name.toUpperCase());
      if (offlineData !== null) {
        setSechList(JSON.parse(offlineData));
      }
      else{
        setSechList(SchOffline[`day${props.route.name}`]);
      }
    }
    catch (e) {

    }
    try {
      sechRef.current.orderByChild('time').on('value',
        (snapshot) => {
          setSechList(reverseObject(snapshot.val()));
          AsyncStorage.setItem(props.route.name.toUpperCase(), JSON.stringify(reverseObject(snapshot.val())));
        });
    }
    catch (e) {

    }


  }

  return (
    sechList ?
      <View style={styles.container}>
        <Timeline

          style={styles.list}
          data={Object.values(sechList)}
          circleSize={25}
          circleColor='orange'
          lineColor='rgb(45,156,219)'
          options={{
            style: { paddingTop: 0 }
          }}
          innerCircle={'dot'}
          renderDetail={(rowData) => <RenderDetail rowData={rowData} />}
          renderTime={(rowData) => <RenderTime rowData={rowData} />}
          separator={false}
          detailContainerStyle={{
            marginBottom: 20,
            paddingHorizontal: 5,
            backgroundColor: "#e44e2f",
            borderRadius: 5,
            borderWidth: 0,
            elevation: 0.1,
          }}
          columnFormat='single-column-right'
          listViewContainerStyle={{ padding: 15, backgroundColor: theme ? darkbackground : lightbackground }}
        />
      </View>
      : null
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  list: {
    flex: 1,
    marginTop: 0,
  },
  title: {
    fontSize: 19,
    fontFamily: 'Raleway-Bold',
    paddingBottom: 1,
    textAlign: 'center',
    color: 'white'

  },
  descriptionContainer: {
    overflow: 'hidden'
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray'
  },
});



export default TabComp;