import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, findNodeHandle, InteractionManager } from 'react-native'
// import SearchBar from '../components/SearchBar'
import EventCard from '../components/EventCard'
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import { ThemeContext } from "../context/dark";
import originaldata from '../assets/data/eventsdat'
import images from '../assets/data/eventsreq'

//--------BACKGROUND COLOR-----------
const lightbackground = '#fef3d3';
const darkbackground = '#222';


const eventRef = database().ref('/events');


const Ace = (props) => {
    // const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const [eventsList, setEventsList] = useState();
    // const [exp, setExp] = useState(false);
    const flatListRef = useRef();
    const [theme, setTheme] = useContext(ThemeContext);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            asyncGet();
        });

        return (() => { eventRef.off() });
    }, []);


    const asyncGet = async () => {
        try {
            const offlineData = await AsyncStorage.getItem(props.route.name.toUpperCase());
            if (offlineData !== null) {
                setEventsList(JSON.parse(offlineData));
            }
            else {
                setEventsList(originaldata[`${props.route.name.toUpperCase()}`]);
            }
        }
        catch (e) {

        }

        try {
            eventRef.orderByChild('type').equalTo(props.route.name.toUpperCase()).on('value',
                (snapshot) => {
                    setEventsList(snapshot.val());
                    AsyncStorage.setItem(props.route.name.toUpperCase(), JSON.stringify(snapshot.val()));
                });
        }
        catch (e) {

        }



    }


    // const searchTranslate = Animated.diffClamp(scrollY, 0, 80).interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, -1],
    // });


    const scrollToItem = (itemRef) => {
        requestAnimationFrame(() => {
            if (itemRef.current && flatListRef.current) {
                itemRef.current.measureLayout(
                    findNodeHandle(flatListRef.current), (x, y) => {
                        flatListRef.current.scrollToOffset({ offset: y - 5, animated: true });
                    });
            }
        });
    }


    const onItemClick = (itemRef, expand) => {

        scrollToItem(itemRef);
        if (expand) {
            flatListRef.current.setNativeProps({ scrollEnabled: false });
        }
        else {
            flatListRef.current.setNativeProps({ scrollEnabled: true });
        }
        // setTimeout(() => { setExp(expand) }, 50);
        // setExp(expand)
    }



    return (
        <View style={{
            ...styles.Container,
            backgroundColor: theme ? darkbackground : lightbackground
        }}>

            {eventsList ? (
                <FlatList
                    ref={flatListRef}
                    overScrollMode={'never'}
                    // onScroll={Animated.event(
                    //     [{ nativeEvent: { contentOffset: { y: scrollY } } }]
                    // )}
                    contentContainerStyle={{ padding: 9, paddingTop: 10 }}
                    data={Object.keys(eventsList)}
                    keyExtractor={(item) => item}
                    renderItem={({ item, index, separators }) => (
                        <EventCard itemClick={onItemClick} data={{ ...eventsList[item] }}
                            image={images[eventsList[item].name.toLowerCase().replace(/\s/g, '')]} />
                    )}
                />) : null}

        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    }
});

export default React.memo(Ace);