import React, { useState, useRef, useContext } from 'react';
import {
    StyleSheet, RefreshControl, ScrollView, Text, View, Animated,
    StatusBar, findNodeHandle, Image
} from 'react-native';
import ScoresContainer from '../containers/ScoresContainer';
import { YellowBox } from 'react-native'

import { ThemeContext } from "../context/dark";



YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

//--------BACKGROUND COLOR-----------
const background = '#fef3d3';

export default function App(props) {
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const [loaded, setLoaded] = useState('loading');
    const [refreshing, setRefreshing] = useState(false);
    const scrollView = useRef();
    const [theme, setTheme] = useContext(ThemeContext);


    const headerTranslate = Animated.diffClamp(scrollY, 0, 80).interpolate({
        inputRange: [0, 1],
        outputRange: [0, -1],

    });


    const scrollToItem = (itemRef) => {
        requestAnimationFrame(() => {
            if (itemRef.current && scrollView.current) {
                itemRef.current.measureLayout(
                    findNodeHandle(scrollView.current), (x, y) => {
                        scrollView.current.scrollTo({ x: 0, y: y - StatusBar.currentHeight, animated: true });
                    });
            }
        });
    }


    const onItemClick = (itemRef, expand) => {

        if (expand) {
            scrollToItem(itemRef);
            scrollView.current.setNativeProps({ scrollEnabled: false });
            // scrollY.setValue(-40);
        }
        else {
            scrollView.current.setNativeProps({ scrollEnabled: true });
            // scrollY.setValue(100);
        }
    }

    const onRefresh = React.useCallback(() => {
        setLoaded('loading');
        setRefreshing(state => {
            return !state;
        });
    }, []);


    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme ? 'rgba(50,50,50,1)' : background,
        }}>
            <Animated.View style={{ ...styles.scoresHeaderCont, transform: [{ translateY: headerTranslate }] }}>
                <Text style={styles.scoresHeaderText}>SCORES</Text>


                <View style={{
                    position: 'absolute',
                    top: 37,
                    right: 10,
                    width:50,
                    height:25
                }}>
                    <Image
                        style={{flex:1, width: null, height: null}}
                        source={
                            loaded === 'online' ?require('../assets/images/online.png') :
                            require('../assets/images/offline.png')} />
                </View>

            </Animated.View>



            <ScrollView ref={scrollView} scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }]
                )}
                nestedScrollEnabled={false}
                scrollEnabled={true}
                overScrollMode={'never'}
                refreshControl={
                    <RefreshControl refreshing={loaded === 'loading'} onRefresh={onRefresh} />
                }
                contentContainerStyle={{ paddingTop: 80 }}
            >
                <Text style={{
                    alignSelf: 'center',
                    fontFamily: 'Raleway-Bold',
                    paddingTop: 5,
                    display: loaded === 'cache' ? 'flex' : "none",
                    textAlign: 'center'
                }}>connection to the internet failed {'\n'}pull to try again</Text>
                <ScoresContainer refreshing={refreshing} loadedFromServer={(status) => { setLoaded(status) }} itemClick={onItemClick} />

            </ScrollView>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: 'flex-start',
    },

    scoresHeaderCont: {
        position: "absolute",
        top: 0,
        width: '100%',
        height: 80,
        justifyContent: 'center',
        zIndex: 0,
        backgroundColor: '#3a3225',
        paddingTop:StatusBar.currentHeight
    },

    scoresHeaderText: {
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: "white",
        fontFamily: 'Raleway-Bold',
        padding: 5,
        paddingHorizontal: 60,
        borderWidth: 0,


    }
});