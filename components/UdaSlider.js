import React from 'react'
import { Text, View, Slider } from 'react-native'

const UdaSlider = ({max, unit, step, value, onChange}) => {
  return (
    <View>
      <Slider 
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  )
}

export default UdaSlider