import React from 'react'
import { Text, View, Slider, StyleSheet, Platform } from 'react-native'
import { gray } from '../utils/colors'

export default UdaSlider = ({max, unit, step, value, onChange}) => {
  return (
    <View style={styles.row}>
      <Slider 
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
        style={styles.slider}
      />
      <View style={styles.metricCounter}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slider: {
    flex: 1
  }
})