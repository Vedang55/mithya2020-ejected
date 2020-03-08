import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, InteractionManager } from 'react-native';
import ScoreCard from '../components/ScoreCard';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
// import NetInfo from "@react-native-community/netinfo";


const ScoresContainer = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [reload, setReload] = useState(false);
    const deptScores = useRef([]);
    const initialRender = useRef(true);

    let issubs = true;

    //for refreshing
    useEffect(() => {
        updateScore();
    }, [props.refreshing]);


    useEffect(() => {
        let firestore_unsubscribe = firestore().collection("scores").onSnapshot(() => {
            if (!initialRender.current) {
                updateScore();
            }
        });

        InteractionManager.runAfterInteractions(() => {
            initialRender.current = false;
            updateScore();
        });


        return (() => {
            firestore_unsubscribe();
            issubs = false;
        });
    }, []);

    const setData = (data) => {
        const compScores = [];
        const etcScores = [];
        const itScores = [];
        const mechScores = [];
        deptScores.current = [];

        data[1].events.forEach(element => {
            compScores.push({ name: element.name, score: element.comp });
            etcScores.push({ name: element.name, score: element.etc });
            mechScores.push({ name: element.name, score: element.mech });
            itScores.push({ name: element.name, score: element.it });
        });

        deptScores.current.push({ name: 'COMP', eventScores: compScores, total: data[0].comp });
        deptScores.current.push({ name: 'IT', eventScores: itScores, total: data[0].it });
        deptScores.current.push({ name: 'ETC', eventScores: etcScores, total: data[0].etc });
        deptScores.current.push({ name: 'MECH', eventScores: mechScores, total: data[0].mech });

        deptScores.current.sort(function (a, b) {
            return -a.total + b.total;
        });



        if (issubs) {
            setLoaded(true);
            setReload((state) => {
                return !state;
            });
        }
    }


    const updateScore = () => {
        //first get offline data, then fetch from server

        AsyncStorage.getItem('allscores').then((allscores) => {
            if (allscores !== null) {
                setData(JSON.parse(allscores));
            }
        }).finally(() => {
            firestore().collection('scores').get({ source: 'server' }).then(result => {
                // console.log("allscores update server");
                const data = [result.docs[0].data(), result.docs[1].data()];
                AsyncStorage.setItem('allscores', JSON.stringify(data));   //store data offline
                setData(data);
                props.loadedFromServer('online');

            })
                .catch((e) => {
                    // console.log('server fetch error', e);
                    props.loadedFromServer('cache');
                })

        })
    }


    return (
        <View style={styles.container}>

            {
                deptScores.current.map((item, index) => {
                    return (
                        <ScoreCard key={Math.random()}
                            eventScores={item.eventScores}
                            dept={item.name}
                            pts={item.total}
                            pos={index + 1}
                            itemClick={props.itemClick}
                            diff={{
                                ahead: item.total - (deptScores.current[index + 1] !== undefined ? deptScores.current[index + 1].total : 0),
                                behind: deptScores.current[0].total - item.total
                            }} />
                    )
                })
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        paddingHorizontal: 10
    }
});


export default React.memo(ScoresContainer);