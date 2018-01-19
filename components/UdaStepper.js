import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'


const UdaStepper = ({max, step, unit, value, onIncrement, onDecrement}) => {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={onDecrement}>
          <FontAwesome name="minus" size={30} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onIncrement}>
          <FontAwesome name="plus" size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>
  )
}

export default UdaStepper