import React from 'react'
import { View, Text } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper';

export const FullScreenLoader = () => {
  const {colors}=useTheme()
// render
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:colors.background}}>
      <ActivityIndicator animating={true}  size={50} />
    </View>
  )
}
