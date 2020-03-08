import React, { useEffect, useRef, useState, useContext } from 'react';
import { StyleSheet, View, Animated, Dimensions, Text, ActivityIndicator } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Svg, { Path } from 'react-native-svg';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import { ThemeContext } from "../context/dark";
import deptcolors from '../assets/data/deptcolors'


// let scorec = 100, scoree = 123, scorem = 200, scorei = 150;

let screnWidth = Dimensions.get('window').width - 60;
let screnHeight = Dimensions.get('window').height;

const AnimPath = new Animated.createAnimatedComponent(Path);


export default function App() {
  const data = useRef(new Animated.Value(0));
  const accAvail = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [reload, setReload] = useState(false);
  const [theme, setTheme] = useContext(ThemeContext);


  const scorec = useRef();
  const scoree = useRef();
  const scorem = useRef();
  const scorei = useRef();
  const initialRender = useRef(true);

  useEffect(() => {
    isAccelerometerAvailable();
  }, []);


  useEffect(() => {
    return () => {
      if (accAvail.current) {
        _unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    // console.log('bar chart mount');
    let firestore_unsubscribe = firestore().collection("scores").onSnapshot(() => {
      if (!initialRender.current) {
        updateScore();
      }
    });

    initialRender.current = false;
    updateScore();

    return (() => {
      firestore_unsubscribe();
      issubs = false;
    });
  }, []);



  let issubs = true;

  const setData = (data) => {
    scorec.current = data.comp;
    scorem.current = data.mech;
    scorei.current = data.it;
    scoree.current = data.etc;

    if (issubs) {
      setLoaded(true);
      setReload((state) => {
        return !state;
      });
    }
  }

  const updateScore = () => {
    //first get offline data, then fetch from server

    AsyncStorage.getItem('scores').then((scores) => {
      // console.log('scores read offline', scores);
      if (scores !== null) {
        setData(JSON.parse(scores));
      }
    }).finally(() => {
      firestore().collection('scores').doc('EY0IyJetTl5wc1B51Vid').get({ source: 'server' }).then(result => {
        // console.log("score update server");
        const data = result.data();
        setData(data);

        AsyncStorage.setItem('scores', JSON.stringify(data));   //store data offline

      })
        .catch((e) => {
          // console.log('server fetch error', e);
        })

    })
  }


  const isAccelerometerAvailable = async () => {
    try {
      let isAvailable = await Accelerometer.isAvailableAsync()
      _toggle();
      _fast();
      accAvail.current = true
    }
    catch (rejectedValue) {
    }
  }


  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(
      Animated.event(
        [{ x: data.current }])
    );
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  const h = screnHeight / 3.6; //bar chart box height
  const w = screnWidth / 4; //bar chart box width
  if (Math.max(scorec.current, scoree.current, scorei.current, scorem.current) === 0) {
    scorec.current = 100;
    scoree.current = 100;
    scorem.current = 100;
    scorei.current = 100;
  }
  const maxScore = Math.max(scorec.current, scoree.current, scorei.current, scorem.current, 1);
  const basisVal = maxScore + 100;

  const getPathStrings = (score, n) => {
    let paths = [];
    paths[0] = `M${n * (w)} ${(h) - (score / basisVal * h) + 10} V${h} H${(n + 1) * (w)} V${(h) - (score / basisVal * h) - 10}`;
    paths[1] = `M${n * (w)} ${(h) - (score / basisVal * h) - 10} V${h} H${(n + 1) * (w)} V${(h) - (score / basisVal * h) + 10}`;
    return paths;
  }

  const [ck1, ck2] = getPathStrings(scorec.current, 0);

  const pathc = data.current.interpolate({
    inputRange: [-1, 1],
    outputRange: [ck1, ck2],
  });

  const [ek1, ek2] = getPathStrings(scoree.current, 1);

  const pathe = data.current.interpolate({
    inputRange: [-1, 1],
    outputRange: [ek1, ek2],
  });

  const [mk1, mk2] = getPathStrings(scorem.current, 2);

  const pathm = data.current.interpolate({
    inputRange: [-1, 1],
    outputRange: [mk1, mk2],
  });

  const [ik1, ik2] = getPathStrings(scorei.current, 3);

  const pathi = data.current.interpolate({
    inputRange: [-1, 1],
    outputRange: [ik1, ik2],
  });




  if (loaded) {
    return (
      <View style={styles.sensor}>
        <Svg height={h} width={screnWidth}>
          <AnimPath fill={deptcolors.comp} strokeWidth='1' d={pathc} />
          <AnimPath fill={deptcolors.etc} strokeWidth='2' d={pathe} />
          <AnimPath fill={deptcolors.mech} strokeWidth='2' d={pathm} />
          <AnimPath fill={deptcolors.it} strokeWidth='1' d={pathi} />
        </Svg>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={{ ...styles.barText, color: theme ? 'white' : '#3a3225' }}>
            COMP
        </Text >
          <Text style={{ ...styles.barText, color: theme ? 'white' : '#3a3225' }}>
            ETC
        </Text>
          <Text style={{ ...styles.barText, color: theme ? 'white' : '#3a3225' }}>
            MECH
        </Text>
          <Text style={{ ...styles.barText, color: theme ? 'white' : '#3a3225' }}>
            IT
        </Text>
        </View>
      </View>
    );
  }
  else {
    return (
      <View style={styles.emptyView}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>);
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({


  sensor: {
    paddingHorizontal: 0,
    alignSelf: "center",
    paddingTop: 10
  },

  emptyView: {
    height: screnHeight / 3.6,
    justifyContent: 'center',
    alignItems: 'center'
  },

  barText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Raleway-Bold',
    fontSize: 15
  }

});
