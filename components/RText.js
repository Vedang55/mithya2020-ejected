import React from 'react'
import { Text } from 'react-native'

export default (props) => {
    return (
        <Text style={{...props.style, fontFamily: 'Raleway-Medium' }}>
            {props.children}
        </Text>
    );
}