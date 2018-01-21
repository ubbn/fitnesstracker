import React, {Component} from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import { submitEntry, removeEntry } from '../utils/api'
import DateHeader from './DateHeader'
import UdaStepper from './UdaStepper'
import UdaSlider from './UdaSlider'
import TextButton from './TextButton'

function SubmitBtn({ onPress }){
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState(state => {
      const count = state[metric] + step
      return {
        ...state,
        [metric]: Math.min(count, max)
      }
    })
  }

  decrement = (metric) => {
    this.setState(state => {
      const count = state[metric] + getMetricMetaInfo(metric).step
      return {
        ...state,
        [metric]: Math.max(0, count)
      }
    })
  }

  slide = (metric, value) => {
    this.setState({
      [metric]: value
    })
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    // Redux
    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0      
    })

    // Navigate

    submitEntry({key, entry})

    // Clean local notifications

  }

  reset = () => {
    const key = timeToString()

    // Update redux

    // Route to HOME

    removeEntry(key)
  }

  render () {
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons 
            name="ios-happy-outline"
            size={100}
          />
          <Text>You alread logged your information to today</Text>
          <TextButton onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }

    return (
      <View>
        <DateHeader date={(new Date().toLocaleDateString())} />
        <Text>{JSON.stringify(this.state)}</Text>
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider'
                ? <UdaSlider 
                    value={value}
                    onChange={(value) => this.slide(key, value)}
                    {...rest}
                  />
                : <UdaStepper
                    value={value}
                    onIncrement={() => this.increment(key)}
                    onDecrement={() => this.decrement(key)}
                    {...rest}
                  />
              }
            </View>
          )
        })}
        <SubmitBtn onPress={this.submit}/>
      </View>
    )
  }
}

export default AddEntry