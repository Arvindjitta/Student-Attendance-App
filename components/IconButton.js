import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';



const IconButton = ({ text, iconName, menuColor, iconSideLeft }) => {

    return (

        <View >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                {iconSideLeft ? (<View>
                    <Icon name={iconName} size={23} color={menuColor} />
                </View>) : null}
                <Text style={{ fontSize: 15, fontFamily: "WorkSans-SemiBold", color: "#7519FB" }}>{text}</Text>
                {iconSideLeft ? null : (<View>
                    <Icon name={iconName} size={23} color={menuColor} />
                </View>)}

            </View>
        </View>
    )
}

export default IconButton
