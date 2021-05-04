import React from 'react'
import { View, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons';



const Header = ({ imageLink, menuColor }) => {
    return (
        <View style={{
            height: 70, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30,
            alignItems: 'flex-end',
        }}>
            {/* Aspect Ratio 32 : 11 */}
            <Image
                style={{ width: 106, height: 36 }}
                source={require('../assets/KALLEKT.png')}
            />

            <Icon name="menu" size={30} color={menuColor} />
        </View>
    )
}

export default Header
