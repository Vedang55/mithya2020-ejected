import React, { useState, useRef, useEffect } from 'react'
import { View, Image, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('window');

const EventCard = (props) => {
    const [expand, setExpand] = useState(false);
    const cardRef = useRef();

    const toggleCard = () => {
        setExpand((state) => {
            // if (expand)
            //     arrayholder.current = Data;
            return !state;
        });
    }

    const useDidUpdate = (callback, deps) => {
        const hasMount = useRef(false)

        useEffect(() => {
            if (hasMount.current) {
                callback()
            } else {
                hasMount.current = true
            }
        }, [expand])
    }

    useDidUpdate(() => {
        props.itemClick(cardRef, expand);
    });

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={toggleCard}>

            <View ref={cardRef} style={{ ...styles.Container, marginBottom: expand ? 50 : 0 }}>
                <ImageBackground blurRadius={20} resizeMode='cover'
                    source={props.image}
                    style={{ width: width - 18 }}>
                    <View style={styles.headerView}>
                        <Text style={styles.TitleText}>{props.data.name}</Text>
                        {expand ? (<Icon color='white' name={"times"} size={23} />) : null}
                    </View>

                    <View onStartShouldSetResponder={expand ? () => true : undefined}>

                        <ScrollView
                            style={{
                                height: expand ? height - 205 : undefined,
                                backgroundColor: expand ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)'
                            }}
                            persistentScrollbar={true}
                            contentContainerStyle={{
                                paddingHorizontal: expand ? 10 : 0,
                            }}>



                            <Image
                                resizeMode='contain'
                                source={props.image}
                                style={{
                                    display: expand ? 'none' : 'flex',
                                    flex: 1,
                                    width: width - 18, height: 250
                                }} />


                            <View style={{ paddingHorizontal: 6, display: expand ? 'flex' : "none" }}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: 20,
                                    fontFamily: 'Raleway-Bold',
                                    borderBottomWidth: 3,
                                    borderBottomColor: 'white',
                                    padding: 10
                                }}>Rules</Text>
                                {props.data.rules.split('\n').map((item) => {
                                    return (
                                        <Text key={Math.random().toString()} style={styles.RuleText}>{item}</Text>
                                    );
                                })}
                            </View>

                        </ScrollView>


                    </View>

                    <View
                        style={{
                            ...styles.arrowContainer,
                            ...{
                                backgroundColor: '#3a3225',
                                display: expand ? 'flex' : "none"
                            }
                        }}
                    >
                        <Icon style={styles.arrow} name={expand ? "angle-up" : "angle-down"} size={28} />

                    </View>
                </ImageBackground>
            </View>

        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    Container: {
        borderRadius: 20,
        elevation: 5,
        marginTop: 20,
        overflow: 'hidden',
        minHeight: 70,
        backgroundColor: 'white'

    },
    headerView: {
        width: '100%',
        backgroundColor: '#3a3225',
        padding: 6,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    TitleText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Raleway-Bold',
        textAlign: 'center'
    },
    arrow: {
        color: 'white',
        alignSelf: "center",
    },
    arrowContainer: {
        bottom: 0,
        width: '100%',
    },

    RuleText: {
        fontFamily: 'Raleway-Bold',
        color: 'white',
        fontSize: 18,
        paddingVertical: 10,
        borderColor: 'white',
        lineHeight: 25,
        textAlign: 'center'
    }

});

export default React.memo(EventCard);