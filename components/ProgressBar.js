import React from 'react'
import { View, Text, Image } from 'react-native'
import * as Progress from 'react-native-progress';

// import Icon from 'react-native-vector-icons/dist/MaterialIcons';


const ProgressBar = ({ barcolor, total }) => {
    return (
        <View>
            <Progress.Bar progress={total} width={null} height={20}
                indeterminateAnimationDuration={2000} color={barcolor}
                borderWidth={1}
            />
        </View>
    )
}

export default ProgressBar