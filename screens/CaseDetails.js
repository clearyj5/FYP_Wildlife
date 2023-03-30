import { View, Text } from 'react-native'
import React from 'react'

const CaseDetails = ({route}) => {
    
    const id = route.params.paramKey
    
    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}

export default CaseDetails;