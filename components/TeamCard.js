import React from 'react';
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window')

const TeamCard = (props) => {
    return (
        <View style={styles.container}>
            {/* <ImageBackground blurRadius={20} source={props.data.image} style={{width:'100%', flex: 1}}> */}
                <View style={{flex:1  }}>
                    {props.data.image ? (
                        <Image source={props.data.image} style={{ flex: 1, width: null, height: null, resizeMode: 'contain', alignSelf: "stretch" }} />
                    ) : null}

                </View>
                <View style={{ backgroundColor: 'black', padding: 8 }}>
                    <Text style={{ textAlign: 'center', fontFamily: 'Raleway-Bold', fontSize: 17, color: '#fff' }}>{props.data.name}</Text>
                    {/* {props.data.desn ? (<Text style={{ textAlign: 'center', fontFamily: 'Raleway-Bold', fontSize: 12, color: '#ff5555' }}>{props.data.desn}</Text>) : null} */}

                </View>
            {/* </ImageBackground> */}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:'#3a3225',
        height: width / 2 + 85,
        // borderWidth: 0.5,
        borderColor: '#bbb',
        // borderBottomLeftRadius: 40,
        // borderBottomRightRadius: 40,
        borderRadius:10,
        elevation: 5,
        flex:1,
        margin: 5,
        overflow:'hidden'
    }
});

export default TeamCard;