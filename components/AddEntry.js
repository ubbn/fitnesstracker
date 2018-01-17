import React, {Component} from 'react'
import { View, Text, Button } from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }

  componentDidMount() {
    console.log("Hello world, babe")
    debugger
  }

  render () {
    return (
      <View>
        <Text>
          {getMetricMetaInfo('bike').displayName}
        </Text>
        <Text>
          Another Text by ME, right CORNERR
        </Text>
        <Button title="HiM" onPress={() => alert('Me')} />
      </View>
    )
  }
}

export default AddEntry