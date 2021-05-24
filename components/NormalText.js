import React from 'react'
import { View, Text, Image } from 'react-native'
// import Icon from 'react-native-vector-icons/dist/MaterialIcons';


const NormalText = ({ text }) => {
    return (
        <View>
            <Text style={{ fontSize: 12, fontFamily: "WorkSans-Regular", }}>{text}</Text>
        </View>
    )
}

export default NormalText