import React from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const HomeScreen = () => {

  const {top}=useSafeAreaInsets()

// render
  return (
    <View>
      <Text style={{color:'blue',marginTop:top}} >HomeScreen</Text>
    </View>
  )
}
