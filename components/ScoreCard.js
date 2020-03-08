import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import SearchBar from './SearchBar'
// import Display from 'react-native-display';
import deptcolors from '../assets/data/deptcolors'

const { width, height } = Dimensions.get('window');

const ScoreCard = (props) => {

    const [expand, setExpand] = useState(false);
    const [value, setValue] = useState();
    const [arrayholder, setarrayholder] = useState([...props.eventScores]);

    const cardRef = useRef();
    const Data = useRef([]);
    const diffText = useRef('');

    useEffect(() => {
        Data.current = [...props.eventScores];

        if (props.diff.behind === 0) {
            diffText.current = `Leading by ${props.diff.ahead} points`;
        }
        else {
            diffText.current = `Trailing by ${props.diff.behind} points`;
        }

        setarrayholder([...Data.current]);


    }, [props.eventScores]);

    useEffect(() => {
        // console.log('scores card rerender', props.eventScores);
    });

    useEffect(() => {
        // console.log('scores card mount');
    }, []);


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



    const searchFilterFunction = text => {
        setValue(text);
        const newData = Data.current.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setarrayholder(newData);
    };


    const toggleCard = () => {
        setExpand((state) => {
            if (expand)
                setarrayholder(Data.current);
            return !state;
        });
    }

    let icon = undefined;
    let color = "";

    switch (props.dept) {
        case "COMP":
            icon = <Icon name="laptop-code" color='#fff' size={35} />;
            color = deptcolors.comp;
            break;

        case "IT":
            icon = <Icon name="server" color='#fff' size={35} />;
            color = deptcolors.it;
            break;

        case "ETC":
            icon = <Octicons name="circuit-board" color='#fff' size={35} />;
            color = deptcolors.etc;
            break;

        case "MECH":
            icon = <Icon name="cogs" color='#fff' size={35} />;
            color = deptcolors.mech;
            break;
    }


    return (
        <TouchableOpacity onPress={toggleCard} activeOpacity={0.5}>
            <View style={{
                ...styles.container,
                height: expand ? height - 85 : "auto",
                backgroundColor: color,
                marginBottom: expand ? 50 : 0
            }} ref={cardRef}>
                <View style={styles.head}>

                    {icon}
                    <Text style={{ fontSize: 20, fontFamily: 'Raleway-Bold', color: '#fff', textAlign: "center", textAlignVertical: "top" }}>
                        {props.dept} {"\n"}{props.pts} pts</Text>
                    <Text style={{ fontSize: 25, fontFamily: 'Raleway-Medium', color: '#fff' }}>#{props.pos}</Text>
                </View>


                <View style={{ ...styles.bottomContent, display : expand ? 'flex' : 'none' }} >
                    <Text style={{ color: '#fff', fontFamily: 'Raleway-Bold', fontSize: 20, textAlign: "center", marginBottom: 10 }}>{diffText.current}</Text>

                    <SearchBar searchFilterFunction={searchFilterFunction}
                        containerStyle={{
                            backgroundColor: color,
                            borderWidth: 1,
                            // shadowColor: 'white',
                            borderColor: 'white',
                            borderTopColor: 'white'
                        }} />

                    <View style={{ flex: 1 }} onStartShouldSetResponder={() => true}>

                        <FlatList style={{ borderWidth: 1, borderTopWidth: 0, borderColor: 'white' }}
                            contentContainerStyle={{ paddingHorizontal: 20 }}
                            data={arrayholder}
                            renderItem={({ item }) => (
                                <View style={styles.standing}>
                                    <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Raleway-Medium' }}>{item.name}</Text>
                                    <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'Raleway-Medium' }}>{item.score}</Text>
                                </View>
                            )}
                            keyExtractor={item => Math.random().toString()}
                            nestedScrollEnabled={false}
                            persistentScrollbar={true}
                            indicatorStyle="white"
                            ListEmptyComponent={<View>
                                <Text style={{color:'white',
                                 fontSize:20,
                                 alignSelf:'center'}}>
                                    No events
                                </Text>
                            </View>}
                        />
                    </View>
                </View>
                <Icon style={styles.arrow} name={expand ? "angle-up" : "angle-down"} size={35} />
            </View>
        </TouchableOpacity>



    );
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: 20,
        paddingBottom: 0,
        color: '#fff',
        marginTop: 10,
        alignItems: "stretch",

    },

    head: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10

    },
    bottomContent: {
        alignItems: "stretch",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#fff',
        flex: 1

    },
    arrow: {
        color: '#fff',
        alignSelf: "center",
    },

    standing: {
        flexDirection: "row",
        marginVertical: 20,
        justifyContent: 'space-between',
    }
});

export default React.memo(ScoreCard);