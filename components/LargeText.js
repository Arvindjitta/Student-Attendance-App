import React from 'react'
import { View, Text, Image } from 'react-native'
// import Icon from 'react-native-vector-icons/dist/MaterialIcons';


const LargeText = ({ text }) => {
    return (
        <View>
            <Text style={{ fontSize: 16, fontFamily: "WorkSans-Medium", }}>{text}</Text>
        </View>
    )
}

export default LargeText